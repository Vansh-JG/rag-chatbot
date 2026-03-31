const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface UploadResponse {
  message: string;
  filename: string;
  file_path: string;
  extracted_text: string;
  chunks: string[];
  chunk_count: number;
}

export interface ChatResponse {
  question: string;
  answer: string;
  sources: string[];
}

export async function uploadDocument(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Upload failed." }));
    throw new Error(error.detail ?? "Upload failed.");
  }

  return res.json();
}

export async function sendChatQuery(question: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Query failed." }));
    throw new Error(error.detail ?? "Query failed.");
  }

  return res.json();
}
