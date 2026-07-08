'use client'

import { BellDotIcon } from 'lucide-react'
import { useAppSelector } from '../../redux/hooks'
import { useRouter } from 'next/navigation'

export default function Notifications() {
  const router = useRouter()
  const { conversations } = useAppSelector((state) => state.contactMessages)
  const unreadCount = conversations.filter((c) => !c.isRead).length

  return (
    <button 
      onClick={() => router.push('/admin/contact_messages')}
      className='relative flex items-center justify-center bg-black text-white rounded-xl min-w-13 h-12 border border-slate-200 shadow-sm hover:bg-gray-800 transition-colors cursor-pointer'
    >
        <BellDotIcon size={30}/>
        {unreadCount > 0 && (
          <span className='absolute right-0 top-0 min-w-7 h-4 text-xs font-medium bg-red-500 rounded-full flex items-center justify-center'>
            {unreadCount}
          </span>
        )}
    </button>
  )
}
