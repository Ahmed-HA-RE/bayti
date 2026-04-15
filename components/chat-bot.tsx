'use client';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/ui/popover';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { FaChevronDown } from 'react-icons/fa6';
import { TbMessageChatbot } from 'react-icons/tb';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from './ui/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from './ui/ai-elements/message';
import {
  PromptInput,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from './ui/ai-elements/prompt-input';
import { IoChatboxEllipsesOutline, IoClose } from 'react-icons/io5';
import { Suggestion, Suggestions } from './ui/ai-elements/suggestions';
import { QUICK_AI_SUGGESTIONS } from '@/lib/constants';
import { RiChatDeleteFill } from 'react-icons/ri';

const ChatBot = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const [openChat, setOpenChat] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if (message.text.trim()) {
      sendMessage({ text: message.text });
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <Popover open={openChat} onOpenChange={setOpenChat}>
      <PopoverTrigger asChild className='fixed bottom-4 right-4 z-70'>
        <Button
          className='size-13 rounded-full text-white'
          variant={'default'}
          size={'icon'}
        >
          <motion.div
            key={openChat ? 'open' : 'close'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.25 }}
          >
            {openChat ? (
              <FaChevronDown className='size-5' />
            ) : (
              <TbMessageChatbot className='size-6.5' />
            )}
          </motion.div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='sm:min-w-md w-[90vw] sm:w-[420px] mr-6 mb-2.5 gap-0 text-foreground rounded-2xl border-0 shadow-2xl p-0  flex flex-col'>
        <PopoverHeader className='gap-4 flex flex-col px-5 py-2 bg-gradient-to-br from-primary/5 to-primary/10 border-b'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <Image
                src='/svg/logo.svg'
                alt='Logo'
                width={70}
                height={70}
                priority
                className='rounded-full'
              />

              <Button
                variant='ghost'
                className='hover:bg-accent hover:text-white'
                size='icon-sm'
                onClick={() => setOpenChat(false)}
              >
                <IoClose className='size-5' />
              </Button>
            </div>
            <div className='flex flex-col'>
              <span className='text-base text-gray-700 font-medium'>
                {session ? `Hello, ${session.user.name}!` : 'Hello!'} 👋
              </span>
              <h2 className='text-lg font-semibold text-foreground'>
                How can I help?
              </h2>
            </div>
          </div>
        </PopoverHeader>
        {/* Chat Bot */}
        <div className='flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white min-h-0'>
          <Conversation>
            <ConversationContent className='py-4 px-0 min-h-[300px] max-h-[400px]'>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={
                    <IoChatboxEllipsesOutline className='size-14 text-primary' />
                  }
                  title='Start a conversation'
                  description='Ask me anything about properties, bookings, or our services!'
                />
              ) : status === 'error' ? (
                <ConversationEmptyState
                  icon={
                    <RiChatDeleteFill className='size-14 text-destructive' />
                  }
                  title='Error'
                  description='Something went wrong. Please try again later.'
                />
              ) : (
                messages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <MessageContent className='group-[.is-user]:bg-accent group-[.is-user]:text-white'>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text': // we don't use any reasoning or tool calls in this example
                            return (
                              <MessageResponse key={`${message.id}-${i}`}>
                                {part.text}
                              </MessageResponse>
                            );
                          default:
                            return null;
                        }
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <div className='border-t bg-white p-3 flex flex-col gap-4 mt-4'>
            {/* Suggestions here  */}

            <div className='flex flex-wrap gap-4'>
              <Suggestions>
                {QUICK_AI_SUGGESTIONS.map((suggestion) => (
                  <Suggestion
                    key={suggestion}
                    onClick={handleSuggestionClick}
                    suggestion={suggestion}
                  />
                ))}
              </Suggestions>
            </div>

            <PromptInput onSubmit={handleSubmit} className='w-full relative'>
              <PromptInputTextarea
                value={input}
                placeholder='Type your message...'
                onChange={(e) => setInput(e.currentTarget.value)}
                className='pr-12 rounded-xl resize-none text-sm py-2 placeholder:text-gray-800'
              />
              <PromptInputSubmit
                status={status === 'streaming' ? 'streaming' : 'ready'}
                disabled={!input.trim()}
                className='absolute bottom-2 right-2 rounded-lg'
              />
            </PromptInput>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBot;
