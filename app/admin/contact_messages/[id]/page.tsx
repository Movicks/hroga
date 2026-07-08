'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  fetchConversation,
  selectConversation,
  replyToConversation,
  markConversationAsRead,
  clearError,
  Conversation,
} from '../../../../redux/features/contact-messages/contactMessagesSlice';
import { Send, MessageSquare, ArrowLeft } from 'lucide-react';

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const email = decodeURIComponent(params.id as string);
  
  const { selectedConversation, loading, error } = useAppSelector((state) => state.contactMessages);
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  useEffect(() => {
    if (email) {
      dispatch(fetchConversation(email));
    }
  }, [dispatch, email]);


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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <button
            onClick={() => dispatch(fetchConversation(email))}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-gray-500">
          <MessageSquare className="w-16 h-16 mx-auto opacity-20" />
          <p className="mt-4 text-lg">Conversation not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
        <button
          onClick={() => router.push('/admin/contact_messages')}
          className="p-2 hover:bg-gray-100 rounded-lg"
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
        {selectedConversation.messages.map((message) => (
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
    </div>
  );
}
