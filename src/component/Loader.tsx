import { useChat } from '@ai-sdk/react'

function TypingIndicator() {
    return (
        <div
            className='flex justify-start'
        >
            <div
                className='flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-600'
            >
                <span>AI is thinking</span>
                <div className='flex gap-1'>
                    <span className='h-2 w-2 animate-bounce rounded-full bg-gray-500' style={{ animationDelay: '0ms' }}></span>
                    <span className='h-2 w-2 animate-bounce rounded-full bg-gray-500' style={{ animationDelay: '150ms' }}></span>
                    <span className='h-2 w-2 animate-bounce rounded-full bg-gray-500' style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>
        </div>
    )
}

export default TypingIndicator   