"use client";

import { useState, useEffect, useRef } from "react";
import FileUpload from "@/components/FileUpload";
import ChatBox from "@/components/ChatBox";
import { UploadResponse } from "@/lib/api";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (uploaded) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [uploaded]);

  function handleUploadSuccess(_response: UploadResponse) {
    setUploaded(true);
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">RAG Chatbot</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Upload a PDF, then ask questions about its contents.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        {uploaded && (
          <div ref={chatRef} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <ChatBox />
          </div>
        )}
      </div>
    </main>
  );
}
