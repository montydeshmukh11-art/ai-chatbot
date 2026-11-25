"use client"
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import TypingIndicator from "@/component/Loader";
import { ShouldShowLoader, getMessageText } from "@/utils/chat-utils";

export default function Home() {

  const { messages, sendMessage, status, error } = useChat();

  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0

  const showLoader = ShouldShowLoader(messages, status)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const isBusy = status === "submitted" || status === "streaming";

  const handleSend = () => {
    if (!input.trim() || isBusy) return;
    sendMessage({ text: input });
    setInput("");
  };

  const searchBar = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSend()
      }}
      className="w-full max-w-2xl flex gap-2 rounded-full border bg-white px-4 py-2 shadow-md"
    >

      <input
        onChange={(e) => setInput(e.target.value)}
        disabled={isBusy}
        value={input}
        placeholder={isBusy ? 'AI is answering....' : 'Ask about any product....'}
        className="flex-1 outline-none bg-transparent"
      />

      <button
        type="submit"
        disabled={status !== 'ready'}
        className="rounded-full bg-black px-4 py-1 text-white disabled:opacity-50"
      >
        {isBusy ? '...' : 'Send'}
      </button>

    </form>
  )

  if (isEmpty) {
    return (
      <main
        className="flex h-screen flex-col items-center justify-center gap-6 px-4"
      >
        <h1
          className="text-3xl font-semibold"
        >What are you looking for</h1>
        {searchBar}
      </main>
    )
  }

  return (
    <main className="flex h-screen flex-col items-center">
      <div className="w-full max-w-2xl flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";

          return (
            // justify-end = right side (user), justify-start = left side (bot)
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 ${isUser ? "bg-black text-white" : "bg-gray-100 text-black"
                  }`}
              >
                {getMessageText(m)}
              </div>
            </div>
          );
        })}

        {showLoader && <TypingIndicator />}

        {
          error && (
            <div
              className="rounded-lg text-red-700 bg-red-200 px-4 py-2"
            >
              Something went wrong:{error.message}
            </div>
          )
        }

        <div ref={bottomRef} />
      </div>

      {/* Bar ab neeche, kyunki ye flex column ka last child hai */}
      <div className="w-full max-w-2xl px-4 pb-6">{searchBar}</div>
    </main>
  );
}