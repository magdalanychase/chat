"use client"

import { useChat } from "ai/react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="border-b">
          <div>AI Chat</div>
        </div>
        <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">Start a conversation by typing a message below</div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {status === "streaming" && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted text-foreground">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={status === "streaming"}
            />
            <button type="submit" disabled={status === "streaming" || input.trim() === ""}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

