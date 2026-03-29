'use client';

import { Editor } from '@tiptap/react';
import { FiBold, FiItalic } from 'react-icons/fi';
import { GoStrikethrough } from 'react-icons/go';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import { LuHighlighter } from 'react-icons/lu';
import {
  CiTextAlignCenter,
  CiTextAlignRight,
  CiTextAlignLeft,
} from 'react-icons/ci';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const options = [
    {
      icon: <LuHeading1 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },

    {
      icon: <LuHeading2 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <LuHeading3 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <FiBold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <FiItalic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <MdFormatListBulleted />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <MdFormatListNumbered />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <GoStrikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: <LuHighlighter />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
    },
    {
      icon: <CiTextAlignLeft />,
      onClick: () => editor.chain().focus().toggleTextAlign('left').run(),
    },
    {
      icon: <CiTextAlignCenter />,
      onClick: () => editor.chain().focus().toggleTextAlign('center').run(),
    },
    {
      icon: <CiTextAlignRight />,
      onClick: () => editor.chain().focus().toggleTextAlign('right').run(),
    },
  ];

  return (
    <div className='flex flex-wrap border-b p-2 items-center gap-4'>
      {options.map((option, index) => (
        <Button
          key={index}
          variant={'ghost'}
          size={'icon-sm'}
          className={cn('hover:bg-orange-50 hover:text-orange-500')}
          onClick={option.onClick}
          type='button'
        >
          {option.icon}
        </Button>
      ))}
    </div>
  );
};

export default MenuBar;
