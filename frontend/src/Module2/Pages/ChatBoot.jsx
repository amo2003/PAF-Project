import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { askChatBot } from '../api/BookingApi'

function ChatBoot() {
  const [message, setMessage]   = useState('')
  const [chat, setChat]         = useState([])
  const [loading, setLoading]   = useState(false)
  const [step, setStep]         = useState('start')
  const [userName, setUserName] = useState('')
  const chatEndRef              = useRef(null)

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat])

  const sendMessage = async (msg) => {
    if (!msg.trim()) return
    setChat(prev => [...prev, { sender: 'user', text: msg }])
    setLoading(true)
    try {
      const res = await askChatBot(msg, step, userName)
      if (step === 'getName') setUserName(msg)
      setChat(prev => [...prev, { sender: 'bot', text: res.data.reply }])
      setStep(res.data.nextStep)
    } catch {
      setChat(prev => [...prev, { sender: 'bot', text: 'Error contacting bot. Please try again.' }])
    }
    setMessage(''); setLoading(false)
  }

  return (
    <div className="admin-bg min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 text-sm font-semibold">← Back to Home</Link>
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-1">💬 Campus Assistant</h2>
          <p className="text-center text-gray-500 text-sm">Ask me anything about the Smart Campus booking system!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
            {chat.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <span className="text-6xl mb-4">💬</span>
                <p className="text-lg font-semibold">Start a conversation!</p>
                <p className="text-sm mt-1">Type &quot;Hi&quot; to begin</p>
              </div>
            )}
            {chat.map((c, idx) => (
              <div key={idx} className={`flex mb-4 ${c.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end max-w-xs lg:max-w-md ${c.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${c.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                    {c.sender === 'user'
                      ? <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">U</div>
                      : <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">🤖</div>}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-line break-words
                    ${c.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                    {c.text}
                  </div>
                </div>
              </div>
            ))}
            {step === 'showOptions' && (
              <div className="flex flex-col gap-2 mt-4">
                {[
                  { label: '1️⃣ How to create a booking',  val: '1' },
                  { label: '2️⃣ How to cancel a booking',  val: '2' },
                  { label: '3️⃣ Booking approval process', val: '3' },
                  { label: '4️⃣ Ask me anything',          val: '4' },
                ].map(opt => (
                  <button key={opt.val} onClick={() => sendMessage(opt.val)}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold text-left">
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="flex items-center text-gray-400 mt-2 gap-2">
                <div className="flex space-x-1">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }} />
                  ))}
                </div>
                <span className="text-xs">Bot is typing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {step !== 'showOptions' && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-2">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(message)}
                  placeholder={step === 'start' ? "Type 'Hi' to start..." : 'Type your message...'}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={() => sendMessage(message)} disabled={!message.trim()}
                  className="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition text-sm font-bold">Send</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-bold text-gray-700 mb-2 text-sm">💡 Quick Tips:</h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Ask how to create or cancel a booking</li>
            <li>• Learn about the approval workflow</li>
            <li>• Understand booking conflict prevention</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChatBoot
