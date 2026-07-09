'use client';

import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchConversations,
  selectConversation,
  replyToConversation,
  markConversationAsRead,
  clearError,
  Conversation,
} from '../../../redux/features/contact-messages/contactMessagesSlice';
import { X, Send, Inbox, MessageSquare, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactMessagesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    conversations,
    selectedConversation,
    loading,
    error,
  } = useAppSelector((state) => state.contactMessages);
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleSelectConversation = async (conversation: Conversation) => {
    dispatch(selectConversation(conversation));
    if (!conversation.isRead) {
      await dispatch(markConversationAsRead(conversation.email));
    }
  };

  const handleSendReply = async () => {
    if (!selectedConversation || !replyText.trim()) return;
    await dispatch(replyToConversation({ email: selectedConversation.email, text: replyText }));
    setReplyText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Sidebar - Conversation List */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Inbox className="w-5 h-5" />
            Inbox
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {conversations.filter((c) => !c.isRead).length} unread conversations
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-gray-500 hidden">
              Loading conversations...
            </div>
          )}
          {error && (
            <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
              <span className="text-red-600 text-sm">{error}</span>
              <button onClick={() => dispatch(clearError())}>
                <X size={16} className="text-red-600" />
              </button>
            </div>
          )}
          {!loading && conversations.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No conversations yet
            </div>
          )}
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              className={`w-full px-4 py-1 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-full border-2 border-[#6393f6] p-1 overflow-hidden">
                    <div className='w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold'>
                      {conversation.fullName[0]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <div className='flex items-center justify-between w-full'>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.fullName}
                        </h3>
                        {!conversation.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#6393f6]" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatDate(conversation.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.messages[0]?.subject || 'New message'}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(selectConversation(null))}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {selectedConversation.fullName[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConversation.fullName}</h3>
                  <p className="text-sm text-gray-500">{selectedConversation.email}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
              {selectedConversation.messages.map((message, idx) => (
                <div key={message._id} className="space-y-4">
                  {/* User's main message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {selectedConversation.fullName[0]}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-lg">
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          {message.subject}
                        </div>
                        <p className="text-gray-800">{message.message}</p>
                      </div>
                      <span className="text-xs text-gray-400 ml-1">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Replies to this message */}
                  {message.replies.map((reply, replyIdx) => (
                    <div
                      key={replyIdx}
                      className={`flex gap-3 ${reply.sender === 'admin' ? 'justify-end' : ''}`}
                    >
                      {reply.sender !== 'admin' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {selectedConversation.fullName[0]}
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-sm max-w-lg ${
                            reply.sender === 'admin'
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p>{reply.text}</p>
                        </div>
                        <span
                          className={`text-xs text-gray-400 ${
                            reply.sender === 'admin' ? 'text-right' : 'ml-1'
                          }`}
                        >
                          {formatDate(reply.timestamp)}
                        </span>
                      </div>
                      {reply.sender === 'admin' && (
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          A
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3 items-end">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your reply... (Press Enter to send)"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                  rows={1}
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare className="w-20 h-20 mb-4 opacity-20" />
            <p className="text-lg">Select a conversation to view</p>
          </div>
        )}
      </div>
    </div>
  );
}
