import { useState } from 'react';

export const Sidebar = () => {
  const [chats] = useState([
    { id: 1, name: '客服助手', lastMsg: '请问有什么可以帮助您？', unread: 0, time: '12:30' },
    { id: 2, name: '技术支持', lastMsg: '您的问题已解决', unread: 0, time: '11:45' },
  ]);

  return (
    <div className="w-80 bg-emerald-50 border-r border-emerald-100 flex flex-col h-full">
      <div className="p-3 bg-emerald-100">
        <input
          type="text"
          placeholder="搜索"
          className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-3 hover:bg-emerald-200 cursor-pointer border-b border-emerald-50"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3">
              {chat.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMsg}</p>
            </div>
            {chat.unread > 0 && (
              <span className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {chat.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};