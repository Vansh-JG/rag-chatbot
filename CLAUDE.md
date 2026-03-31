I am now building the frontend for my RAG chatbot.

Backend:
- FastAPI
- Endpoints:
  - POST /documents/upload
  - POST /chat/query (coming soon)

Frontend stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS

Goals:
- Upload PDFs
- Ask questions
- Display answers with sources

Architecture expectations:
- Use reusable React components
- Keep API calls in a separate layer (e.g. lib/api.ts)
- Keep UI components clean and focused
- Do not put everything in one file

First task:
Create a FileUpload component that:
- lets the user select a PDF file
- sends it to POST /documents/upload
- shows loading state
- shows success or error message

Please:
1. show the file structure
2. show the code
3. keep it clean and production-style
4. integrate properly with the backend