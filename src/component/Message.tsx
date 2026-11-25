import React from 'react'
import { useChat } from '@ai-sdk/react'

function Message() {

    const { messages } = useChat()

    return (
        <div>
            {
                messages.map((m) => {
                    const isUser = m.role === 'user'
                    const text = m.parts
                        .map((parts) => parts.type === 'text' ? parts.text : '')
                        .join('')

                    if (!text) return null

                    return (
                        <div
                            key={m.id}
                            className={isUser ? 'text-right' : 'text-left'}
                        >
                            <span
                                className={
                                    "inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-left " +
                                    (isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900")
                                }
                            >
                                {text}
                            </span>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Message