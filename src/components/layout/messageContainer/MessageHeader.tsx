import React from 'react';

const MessageHeader: React.FC = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          data-slot="avatar"
          className="relative flex w-10 h-10 shrink-0 overflow-hidden rounded-full"
        >
          <img
            data-slot="avatar-image"
            className="aspect-square w-full h-full"
            alt="Bob Smith"
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
          />
        </span>
        <div>
          <h3 className="text-gray-900">Bob Smith</h3>
          <p className="text-sm text-gray-500">online</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          data-slot="button"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:w-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-9 h-9 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ellipsis-vertical w-5 h-5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;
