import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const { messages }: { messages: UIMessage[] } = await req.json()

    const result = streamText({
        onError: (error) => {
            console.error('CHAT ERROR:', error)
            return error instanceof Error ? error.message : 'unkown error'
        },
        model: google('gemini-3.5-flash'),
        system: 'You are a friendly shopping assistant for an online store.' +
            'Help users find products.Keep answers short and clear ',
        messages: await convertToModelMessages(messages)
    })

    return result.toUIMessageStreamResponse()
}