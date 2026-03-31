# RAG Chatbot

A full-stack Retrieval-Augmented Generation (RAG) chatbot that lets you upload PDF documents and ask questions about their contents. Answers are strictly grounded in the uploaded documents.

## Tech Stack

**Backend**
- FastAPI (Python)
- OpenAI API — embeddings (`text-embedding-3-small`) and chat (`gpt-4o-mini`)
- Weaviate Cloud — vector database
- PyMuPDF — PDF text extraction

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## How It Works

**Document Ingestion**
```
PDF upload → text extraction → chunking → embeddings → Weaviate
```

**Query Flow**
```
Question → embedding → similarity search → top-k chunks → LLM → answer + sources
```

## Project Structure

```
rag-chatbot/
├── backend/
│   ├── app/
│   │   ├── api/routes/        # health, documents, chat endpoints
│   │   ├── core/              # config, environment variables
│   │   ├── db/                # Weaviate client and vector store abstraction
│   │   ├── schemas/           # Pydantic request/response models
│   │   ├── services/          # business logic (pdf, chunking, embedding, retrieval, rag)
│   │   └── main.py
│   ├── storage/uploads/       # uploaded PDFs (gitignored)
│   ├── .env                   # environment variables (gitignored)
│   └── requirements.txt
└── frontend/
    ├── app/                   # Next.js App Router pages
    ├── components/            # FileUpload, ChatBox
    ├── lib/                   # API client (api.ts)
    └── .env.local             # frontend env variables (gitignored)
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:
```
OPENAI_API_KEY=your-openai-api-key
WEAVIATE_URL=your-cluster.weaviate.cloud
WEAVIATE_API_KEY=your-weaviate-api-key
```

Run the server:
```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/documents/upload` | Upload and index a PDF |
| POST | `/chat` | Ask a question about uploaded documents |
