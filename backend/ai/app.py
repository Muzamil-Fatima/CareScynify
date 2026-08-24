import os
import tempfile
import shutil
from pathlib import Path

from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import (
    HuggingFaceEmbeddings,
    ChatHuggingFace,
    HuggingFaceEndpoint,
)
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from huggingface_hub import HfApi
# ENVIRONMENT
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    raise RuntimeError(
        "HF_TOKEN is missing from backend/.env"
    )
# FASTAPI
app = FastAPI(
    title="CareScynify MediBot AI",
    version="1.0.0",
)

# VALIDATION EXCEPTION HANDLER

# Prevents the default handler from crashing with
# UnicodeDecodeError when raw/corrupted multipart bytes
# end up inside the validation error details.

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print("==============================================")
    print("[ERROR] Request validation failed")
    print("==============================================")

    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request format or corrupted file upload"},
    )
# PATHS
AI_DIR = Path(__file__).resolve().parent
VECTORSTORE_DIR = AI_DIR / "vectorstore"
VECTORSTORE_DIR.mkdir(
    parents=True,
    exist_ok=True,
)
# EMBEDDING MODEL
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
# HUGGINGFACE MODEL DISCOVERY
FALLBACK_REPO_IDS = [
    "Qwen/Qwen3-4B-Instruct-2507",
    "deepseek-ai/DeepSeek-V3-0324",
    "meta-llama/Llama-3.2-3B-Instruct",
]
def find_live_chat_model():

    api = HfApi(
        token=HF_TOKEN
    )
    try:
        models = api.list_models(
            filter="text-generation",
            sort="trending_score",
            limit=20,
            expand="inferenceProviderMapping",
        )
        for model in models:
            mapping = getattr(
                model,
                "inference_provider_mapping",
                None,
            )
            if mapping:
                provider = list(
                    mapping.keys()
                )[0]
                return (
                    model.id,
                    provider,
                )

    except Exception as error:

        print(
            f"[WARN] Model discovery failed: {error}"
        )

    return None, None


def load_llm(
    repo_id,
    provider,
):

    endpoint = HuggingFaceEndpoint(
        repo_id=repo_id,
        task="conversational",
        provider=provider,
        temperature=0.5,
        huggingfacehub_api_token=HF_TOKEN,
        max_new_tokens=512,
    )

    return ChatHuggingFace(
        llm=endpoint
    )


def load_llm_with_fallback():

    repo_id, provider = (
        find_live_chat_model()
    )

    
    # AUTO DISCOVERED MODEL
    

    if repo_id:

        print(
            f"[INFO] Using model: "
            f"{repo_id} via {provider}"
        )

        try:

            return load_llm(
                repo_id,
                provider,
            )

        except Exception as error:

            print(
                f"[WARN] Auto model failed: "
                f"{error}"
            )

    
    # FALLBACK MODELS
    

    for repo_id in FALLBACK_REPO_IDS:

        try:

            print(
                f"[INFO] Trying fallback model: "
                f"{repo_id}"
            )

            return load_llm(
                repo_id,
                "auto",
            )

        except Exception as error:

            print(
                f"[WARN] {repo_id} failed: "
                f"{error}"
            )

    raise RuntimeError(
        "No working HuggingFace chat model found."
    )



# LOAD LLM


llm = load_llm_with_fallback()



# PROMPT


CUSTOM_PROMPT_TEMPLATE = """
You are MediBot, an AI medical knowledge assistant
for a doctor using CareScynify.

Answer the doctor's question using ONLY the provided
knowledge base context.

If the answer is not available in the context,
say:

"I don't know based on the provided documents."

Do not invent medical information.

Do not make unsupported diagnoses or treatment decisions.

Context:
{context}

Doctor's Question:
{input}

Answer directly and clearly.
"""


prompt = ChatPromptTemplate.from_template(
    CUSTOM_PROMPT_TEMPLATE
)


chain = (
    prompt
    | llm
    | StrOutputParser()
)
# REQUEST MODELS
class ChatRequest(BaseModel):

    doctorId: str
    question: str
# HELPER
def get_doctor_vectorstore_path(
    doctor_id,
):
    return (
        VECTORSTORE_DIR
        / f"doctor_{doctor_id}"
    )
# PROCESS PDF
@app.post("/process-document")
async def process_document(
    doctorId: str = Form(...),
    file: UploadFile = File(...),
):
    temp_pdf = None

    try:
        # LOG REQUEST
        print(
            "=============================================="
        )
        print(
            f"[INFO] Processing PDF for doctor: "
            f"{doctorId}"
        )
        print(
            f"[INFO] Received file: "
            f"{file.filename}"
        )
        print(
            f"[INFO] Content type: "
            f"{file.content_type}"
        )
        print(
            "=============================================="
        )
        # VALIDATE DOCTOR ID
        if not doctorId.strip():
            raise HTTPException(
                status_code=400,
                detail="Doctor ID is required",
            )
        # VALIDATE FILE
        if not file:
            raise HTTPException(
                status_code=400,
                detail="PDF file is required",
            )
        # VALIDATE PDF EXTENSION
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="PDF filename is missing",
            )
        if not file.filename.lower().endswith(
            ".pdf"
        ):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed",
            )
        # CREATE TEMPORARY PDF
        temp_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf",
        )

        temp_pdf = temp_file.name

        
        # SAVE UPLOADED FILE
        

        with open(
            temp_pdf,
            "wb",
        ) as output_file:

            shutil.copyfileobj(
                file.file,
                output_file,
            )

        temp_file.close()

        print(
            f"[INFO] Temporary PDF saved: "
            f"{temp_pdf}"
        )

        
        # READ PDF
        

        print(
            "[INFO] Reading PDF..."
        )

        loader = PyPDFLoader(
            temp_pdf
        )

        documents = loader.load()

        if not documents:

            raise RuntimeError(
                "PDF contains no readable text"
            )

        print(
            f"[INFO] PDF pages loaded: "
            f"{len(documents)}"
        )

        
        # SPLIT TEXT
        

        print(
            "[INFO] Splitting PDF into chunks..."
        )

        splitter = (
            RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50,
            )
        )

        chunks = splitter.split_documents(
            documents
        )

        if not chunks:

            raise RuntimeError(
                "Unable to create text chunks"
            )

        print(
            f"[INFO] Chunks created: "
            f"{len(chunks)}"
        )

        
        # DOCTOR VECTOR STORE PATH
        

        vectorstore_path = (
            get_doctor_vectorstore_path(
                doctorId
            )
        )

        print(
            f"[INFO] Vector store path: "
            f"{vectorstore_path}"
        )

        
        # EXISTING VECTOR STORE
        

        if vectorstore_path.exists():

            print(
                "[INFO] Loading existing "
                "doctor vector store..."
            )

            db = FAISS.load_local(
                str(vectorstore_path),
                embedding_model,
                allow_dangerous_deserialization=True,
            )

            # -----------------------------------------------
            # ADD NEW DOCUMENT
            # -----------------------------------------------

            print(
                "[INFO] Adding new document "
                "to existing vector store..."
            )

            db.add_documents(
                chunks
            )

        
        # NEW VECTOR STORE
        

        else:

            print(
                "[INFO] Creating new "
                "doctor vector store..."
            )

            db = FAISS.from_documents(
                chunks,
                embedding_model,
            )

        
        # SAVE VECTOR STORE
        

        db.save_local(
            str(vectorstore_path)
        )

        print(
            "=============================================="
        )

        print(
            "[SUCCESS] Vector store saved:"
        )

        print(
            vectorstore_path
        )

        print(
            "=============================================="
        )

        
        # RESPONSE
        

        return {
            "success": True,
            "message": (
                "Document processed successfully"
            ),
            "doctorId": doctorId,
            "filename": file.filename,
            "chunks": len(chunks),
        }

    except HTTPException:

        raise

    except Exception as error:

        print(
            "=============================================="
        )

        print(
            "[ERROR] Document processing failed:"
        )

        print(
            str(error)
        )

        print(
            "=============================================="
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    finally:

        
        # DELETE TEMPORARY PDF
        

        if (
            temp_pdf
            and os.path.exists(temp_pdf)
        ):

            try:

                os.remove(
                    temp_pdf
                )

                print(
                    f"[INFO] Temporary PDF deleted: "
                    f"{temp_pdf}"
                )

            except Exception as error:

                print(
                    f"[WARN] Could not delete "
                    f"temporary PDF: {error}"
                )

        
        # CLOSE UPLOAD
        

        try:

            await file.close()

        except Exception:

            pass



# CHAT


@app.post("/chat")
def chat(
    request: ChatRequest,
):

    try:

        
        # VALIDATE QUESTION
        

        question = request.question.strip()

        if not question:

            raise HTTPException(
                status_code=400,
                detail="Question is required",
            )

        
        # VALIDATE DOCTOR ID
        

        if not request.doctorId.strip():

            raise HTTPException(
                status_code=400,
                detail="Doctor ID is required",
            )

        print(
            "=============================================="
        )

        print(
            f"[INFO] Chat request from doctor: "
            f"{request.doctorId}"
        )

        print(
            f"[INFO] Question: {question}"
        )

        print(
            "=============================================="
        )

        
        # DOCTOR VECTOR STORE
        

        vectorstore_path = (
            get_doctor_vectorstore_path(
                request.doctorId
            )
        )

        
        # NO KNOWLEDGE BASE
        

        if not vectorstore_path.exists():

            return {
                "success": False,
                "answer": (
                    "No knowledge documents have "
                    "been uploaded for this doctor yet."
                ),
            }

        
        # LOAD VECTOR STORE
        

        print(
            "[INFO] Loading doctor vector store..."
        )

        db = FAISS.load_local(
            str(vectorstore_path),
            embedding_model,
            allow_dangerous_deserialization=True,
        )

        
        # SEARCH RELEVANT DOCUMENTS
        

        print(
            "[INFO] Searching knowledge base..."
        )

        docs = db.similarity_search(
            question,
            k=3,
        )

        
        # NO RELEVANT DOCUMENTS
        

        if not docs:

            return {
                "success": True,
                "answer": (
                    "I don't know based on "
                    "the provided documents."
                ),
            }

        
        # CREATE CONTEXT
        

        context = "\n\n".join(
            doc.page_content
            for doc in docs
        )

        
        # GENERATE ANSWER
        

        print(
            "[INFO] Generating AI answer..."
        )

        answer = chain.invoke(
            {
                "context": context,
                "input": question,
            }
        )

        print(
            "[SUCCESS] AI answer generated"
        )

        
        # RESPONSE
        

        return {
            "success": True,
            "answer": answer,
        }

    except HTTPException:

        raise

    except Exception as error:

        print(
            "=============================================="
        )

        print(
            "[ERROR] Chat failed:"
        )
        print(str(error))
        print("==============================================")
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
# HEALTH CHECK
@app.get("/")
def health_check():
    return {
        "success": True,
        "service": "CareScynify MediBot AI",
        "status": "running",
    }