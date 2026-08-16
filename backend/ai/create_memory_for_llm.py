

# #  pipenv run python create_memory_for_llm.py
import os
import warnings

# NOTE: Ignore warnings MUST come BEFORE importing langchain_community
warnings.filterwarnings("ignore", category=DeprecationWarning, module="langchain_community")

from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

DATA_PATH = "data/"
DB_FAISS_PATH = "vectorstore/db_faiss"

# Step 1: Load raw PDF(s) directly from directory
def load_pdf_files(data):
    loader = PyPDFDirectoryLoader(data)
    documents = loader.load()
    return documents

# Step 2: Create Chunks
def create_chunks(extracted_data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    text_chunks = text_splitter.split_documents(extracted_data)
    return text_chunks

# Step 3: Create vector Embedding model
def get_embedding_model():
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return embedding_model

if __name__ == "__main__":
    print("Loading PDFs...")
    documents = load_pdf_files(data=DATA_PATH)
    print("Length of PDF pages: ", len(documents))

    print("Splitting text into chunks...")
    text_chunks = create_chunks(extracted_data=documents)
    print("Length of Text Chunks: ", len(text_chunks))

    print("Initializing embedding model (downloading files if first run)...")
    embedding_model = get_embedding_model()

    print("Building FAISS vector store...")
    os.makedirs(DB_FAISS_PATH, exist_ok=True)
    db = FAISS.from_documents(text_chunks, embedding_model)
    db.save_local(DB_FAISS_PATH)
    print(f"Vector store successfully saved to {DB_FAISS_PATH}")
    # pipenv run python create_memory_for_llm.py