
# # pipenv run python connect_memory_with_llm.py

import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

from huggingface_hub import HfApi
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import (
    ChatHuggingFace,
    HuggingFaceEmbeddings,
    HuggingFaceEndpoint,
)

# Step 1: Setup LLM using ChatHuggingFace wrapper
HF_TOKEN = os.environ.get("HF_TOKEN")

# Small fallback list, in preference order, in case auto-discovery below fails
# or returns nothing usable for your account.
FALLBACK_REPO_IDS = [
    "Qwen/Qwen3-4B-Instruct-2507",
    "deepseek-ai/DeepSeek-V3-0324",
    "meta-llama/Llama-3.2-3B-Instruct",
]


def find_live_chat_model():
    """Ask the Hub API directly which text-generation models currently have
    a live inference provider, instead of hardcoding a name that may go stale."""
    api = HfApi(token=HF_TOKEN)
    try:
        models = api.list_models(
            filter="text-generation",
            sort="trending_score",
            limit=20,
            expand="inferenceProviderMapping",
        )
        for m in models:
            mapping = getattr(m, "inference_provider_mapping", None)
            if mapping:
                provider = list(mapping.keys())[0]
                return m.id, provider
    except Exception as e:
        print(f"[warn] live model discovery failed: {e}")
    return None, None


def load_llm(huggingface_repo_id, provider_name):
    endpoint = HuggingFaceEndpoint(
        repo_id=huggingface_repo_id,
        task="conversational",
        provider=provider_name,
        temperature=0.5,
        huggingfacehub_api_token=HF_TOKEN,
        max_new_tokens=512,
    )
    return ChatHuggingFace(llm=endpoint)


def load_llm_with_fallback():
    repo_id, provider = find_live_chat_model()
    if repo_id:
        print(f"[info] using auto-discovered model: {repo_id} via {provider}")
        try:
            return load_llm(repo_id, provider)
        except Exception as e:
            print(f"[warn] auto-discovered model failed to load: {e}")

    for repo_id in FALLBACK_REPO_IDS:
        try:
            print(f"[info] trying fallback model: {repo_id} via auto")
            return load_llm(repo_id, "auto")
        except Exception as e:
            print(f"[warn] {repo_id} failed: {e}")

    raise RuntimeError(
        "No working chat model found. Check https://huggingface.co/settings/inference-providers "
        "and make sure at least one provider is enabled on your account."
    )


# Step 2: Custom Prompt Template
CUSTOM_PROMPT_TEMPLATE = """Use the pieces of information provided in the context to answer user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Don't provide anything out of the given context.

Context: {context}
Question: {input}

Start the answer directly. No small talk please."""


def set_custom_prompt():
    return ChatPromptTemplate.from_template(CUSTOM_PROMPT_TEMPLATE)


# Step 3: Load FAISS Vector Database
DB_FAISS_PATH = "vectorstore/db_faiss"
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
db = FAISS.load_local(
    DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True
)
retriever = db.as_retriever(search_kwargs={"k": 3})


# Helper function to combine doc contents
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# Step 4: Load Components
llm = load_llm_with_fallback()
prompt = set_custom_prompt()

# Step 5: Execute Query
if __name__ == "__main__":
    user_query = input("Write Query Here: ")

    source_docs = retriever.invoke(user_query)
    context_str = format_docs(source_docs)

    chain = prompt | llm | StrOutputParser()
    response = chain.invoke({"context": context_str, "input": user_query})

    print("\n" + "=" * 30)
    print("RESULT:\n", response)
    print("=" * 30)
    print("\nSOURCE DOCUMENTS:")
    for doc in source_docs:
        print(f"- {doc.metadata}")