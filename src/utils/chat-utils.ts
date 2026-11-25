import type { ChatStatus, UIMessage } from "ai";

export function getMessageText(messages: UIMessage): string {
    return messages.parts
        .filter((p) => p.type === 'text')
        .map((p) => (p as { text: string }).text)
        .join('')
}

export function ShouldShowLoader(messages: UIMessage[], status: ChatStatus) {

    if (status === 'submitted') return true

    if (status === 'streaming') {
        const last = messages[messages.length - 1]
        return last?.role === 'assistant' && !getMessageText(last)
    }

    return false

}