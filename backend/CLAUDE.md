# Project: Full-Stack RAG Chatbot

## Overview

This project is a production-style Retrieval-Augmented Generation (RAG) chatbot.

The goal is to build a clean, scalable backend system that:

* processes uploaded documents
* stores semantic representations
* retrieves relevant information
* generates grounded responses using an LLM

This project is intended to be resume-quality and demonstrate strong backend engineering and AI system design.

---

## Primary Goal

Build a full-stack RAG chatbot that allows users to:

1. Upload PDF documents
2. Extract and process document text
3. Chunk text into smaller segments
4. Generate embeddings
5. Store embeddings in a vector database
6. Query documents using natural language
7. Retrieve relevant chunks
8. Generate answers using an LLM
9. Return answers with source citations

---

## Tech Stack

### Backend

* FastAPI (Python)

### Frontend

* React or Next.js

### LLM / Embeddings

* OpenAI API

### Vector Database

* Chroma (development / local)
* Weaviate (production / scalable)

### Storage

* Local storage (initial phase)

---

## System Architecture

### Document Ingestion Flow

PDF → text extraction → chunking → embeddings → vector DB

### Query Flow

query → embedding → similarity search → retrieve top-k chunks → LLM → answer + citations

---

## Key Design Principle

This is a RAG system, not model training.

* Model weights are NOT modified
* Knowledge is stored externally (vector database)
* Retrieval is performed at query time
* The LLM generates responses based on retrieved context

---

## Backend Structure

```text
rag-chatbot/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── health.py
│   │   │       ├── documents.py
│   │   │       └── chat.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── schemas/
│   │   │   ├── document.py
│   │   │   └── chat.py
│   │   ├── services/
│   │   │   ├── document_service.py
│   │   │   ├── pdf_service.py
│   │   │   ├── chunk_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── retrieval_service.py
│   │   │   └── rag_service.py
│   │   ├── db/
│   │   │   ├── vector_store.py
│   │   │   ├── chroma_client.py
│   │   │   └── weaviate_client.py
│   │   └── main.py
│   ├── storage/
│   │   ├── uploads/
│   │   └── chroma/
│   ├── .env
│   ├── requirements.txt
│   └── README.md
└── frontend/
```

---

## Architectural Rules

### Routes

* Define API endpoints
* Handle HTTP request/response
* Validate input
* Call services
* Return structured responses

Routes should NOT contain business logic.

---

### Services

* Contain business logic
* Handle processing and transformations
* Be reusable across routes
* Keep routes thin

---

### Schemas

* Define request/response structures
* Use Pydantic
* Ensure consistent API contracts

---

### DB Layer (Important)

* Encapsulate vector database logic
* Use an abstraction layer (`vector_store.py`)
* Avoid coupling business logic directly to Chroma or Weaviate
* Allow easy migration between vector databases

---

## Vector Database Strategy

### Phase 1 — Chroma

* Local development
* Fast setup
* No infrastructure required

### Phase 2 — Weaviate

* Production-ready deployment
* Scalable architecture
* Hybrid search (semantic + keyword)
* Advanced filtering and metadata support

---

## Current Progress

* FastAPI backend initialized
* Root route implemented
* Health route implemented and modularized
* PDF upload endpoint implemented
* Files saved locally in storage/uploads

---

## Expectations

* Maintain clean, modular architecture
* Follow separation of concerns
* Write readable, maintainable code
* Avoid unnecessary complexity
* Keep the system extensible
* Design components to be easily replaceable (especially vector DB layer)

---

## Future Enhancements

* Document metadata tracking
* Unique document IDs
* Prevent filename collisions
* Multi-document retrieval
* Source-level citations
* Logging and error handling
* Testing
* Deployment
* Chat memory
* UI integration
* Migration from Chroma to Weaviate
