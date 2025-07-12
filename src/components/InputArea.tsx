import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end space-x-2">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="请输入您的问题..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            '发送'
          )}
        </button>
      </div>
    </div>
  );
};