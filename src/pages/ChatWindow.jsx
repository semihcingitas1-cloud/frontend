import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaPaperPlane, FaComments, FaTimes, FaCheck, FaCheckDouble } from 'react-icons/fa';

const socket = io.connect("http://localhost:4000");

const ChatWindow = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isAdminTyping, setIsAdminTyping] = useState(false);
    const [isAdminOnline, setIsAdminOnline] = useState(false);
    const scrollRef = useRef();

    // Kullanıcı ID'sini belirle
    const userId = user?.user?._id || "guest_" + socket.id;

    useEffect(() => {
        socket.emit("join_chat", userId);
        socket.emit("get_old_messages", { userId: userId });

        socket.on("old_messages", (data) => {
            setChat(data);
        });

        socket.on("receive_message", (data) => {
            if (data.senderId === "admin") {
                setChat((prev) => [...prev, data]);
                if (isOpen) {
                    socket.emit("mark_as_seen", { senderId: "admin", receiverId: userId });
                }
            }
        });

        // Admin Yazıyor Bilgisi
        socket.on("user_typing", ({ senderId, isTyping }) => {
            if (senderId === "admin") {
                setIsAdminTyping(isTyping);
            }
        });

        // Admin Online Bilgisi
        socket.on("user_status_changed", ({ userId: statusId, status }) => {
            if (statusId === "admin") {
                setIsAdminOnline(status === "online");
            }
        });

        socket.on("messages_seen_updated", ({ seenBy }) => {
            if (seenBy === "admin") {
                setChat(prev => prev.map(msg => ({ ...msg, isSeen: true })));
            }
        });

        return () => {
            socket.off("old_messages");
            socket.off("receive_message");
            socket.off("user_typing");
            socket.off("user_status_changed");
            socket.off("messages_seen_updated");
        };
    }, [userId, isOpen]);

    useEffect(() => {
        if (isOpen) {
            socket.emit("mark_as_seen", { senderId: "admin", receiverId: userId });
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [isOpen, userId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, isAdminTyping]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        // Admin'e "Müşteri yazıyor" bilgisini gönder
        socket.emit("typing", { 
            receiverId: "admin", 
            senderId: userId, 
            isTyping: e.target.value.length > 0 
        });
    };

    const sendMessage = () => {
        if (message.trim() === "") return;

        const messageData = {
            senderId: userId,
            receiverId: "admin",
            message: message,
            senderName: user?.user?.name || "Misafir",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSeen: false
        };

        socket.emit("send_message", messageData);
        // Mesaj gidince "yazıyor" bilgisini kapat
        socket.emit("typing", { receiverId: "admin", senderId: userId, isTyping: false });
        
        setChat((prev) => [...prev, messageData]);
        setMessage("");
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 font-sans">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-rose-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
                >
                    <FaComments size={24} />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap text-sm">
                        Bize Yazın
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="bg-white w-80 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-rose-500 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isAdminOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm">Gala Çiçek Destek</span>
                                <span className="text-[10px] opacity-80">{isAdminOnline ? 'Çevrimiçi' : 'Çevrimdışı'}</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Mesaj Alanı */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8f9fa] custom-scrollbar">
                        {chat.length === 0 && (
                            <p className="text-[11px] text-center text-gray-400 mt-10 italic">
                                Merhaba! Size nasıl yardımcı olabiliriz?
                            </p>
                        )}
                        {chat.map((msg, index) => (
                            <div key={index} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm relative shadow-sm ${
                                    msg.senderId === userId 
                                    ? 'bg-rose-500 text-white rounded-br-none' 
                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                }`}>
                                    <p className="leading-relaxed">{msg.message}</p>
                                    <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
                                        <span className="text-[9px] font-light">{msg.time}</span>
                                        {msg.senderId === userId && (
                                            msg.isSeen ? <FaCheckDouble className="text-white opacity-80" size={10} /> : <FaCheck size={10} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Admin Yazıyor Göstergesi */}
                        {isAdminTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-500 p-2 px-4 rounded-full text-[10px] italic flex items-center gap-1">
                                    Admin yazıyor
                                    <span className="flex gap-0.5">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef}></div>
                    </div>

                    {/* Input Alanı */}
                    <div className="p-3 border-t bg-white flex gap-2 items-center">
                        <input 
                            type="text" 
                            value={message}
                            onChange={handleInputChange}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Bir mesaj yazın..."
                            className="flex-1 bg-gray-50 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all"
                        />
                        <button 
                            onClick={sendMessage}
                            disabled={!message.trim()}
                            className="bg-rose-500 text-white p-3 rounded-xl hover:bg-rose-600 disabled:opacity-50 transition shadow-lg shadow-rose-500/20"
                        >
                            <FaPaperPlane size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;