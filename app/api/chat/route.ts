import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { AI_SYSTEM_CONFIG } from '@/lib/constants/ai-system';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: await convertToModelMessages(messages),
    system: AI_SYSTEM_CONFIG,
  });

  return result.toUIMessageStreamResponse();
}
