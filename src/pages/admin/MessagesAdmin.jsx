import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { FaPaperPlane, FaUserCircle, FaComments, FaTrashAlt, FaCheck, FaCheckDouble, FaBolt, FaArrowLeft } from 'react-icons/fa';
import AdminPanel from '../../layout/AdminPanel';

const socket = io.connect("https://backend-d72l.onrender.com");

const MessagesAdmin = () => {

    const { user } = useSelector(state => state.user);
    const [users, setUsers] = useState([]); 
    const [selectedUser, setSelectedUser] = useState(null); 
    const [message, setMessage] = useState(""); 
    const [messages, setMessages] = useState({}); 
    const [typingStatus, setTypingStatus] = useState({}); 
    const [unreadCounts, setUnreadCounts] = useState({}); 
    const [onlineUsers, setOnlineUsers] = useState(new Set()); 
    const scrollRef = useRef();
    const selectedUserRef = useRef(null);

    const totalUnreadMessages = Object.values(unreadCounts).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {

        selectedUserRef.current = selectedUser;
    }, [selectedUser]);

    const fastReplies = [

        "Merhaba, size nasıl yardımcı olabilirim?",
        "Siparişiniz kargoya verildi.",
        "Ödemeniz onaylandı, teşekkür ederiz.",
        "Hangi çiçek modelimizle ilgileniyorsunuz?"
    ];

    const playSound = () => {

        const audio = new Audio('/notification.mp3');
        audio.play().catch(err => console.log("Ses çalma engellendi (Kullanıcı etkileşimi gerekiyor):", err));
    };

    useEffect(() => {

        socket.emit("join_chat", "admin");
        socket.emit("get_unread_counts");
        socket.emit("get_old_messages", { userId: "admin" });

        socket.on("receive_message", (data) => {
            const partnerId = data.senderId === "admin" ? data.receiverId : data.senderId;
            const partnerName = data.senderName || "Müşteri";

            setMessages((prev) => ({
                ...prev,
                [partnerId]: [...(prev[partnerId] || []), data]
            }));

            setUsers((prev) => {
                if (!prev.find(u => u.id === partnerId)) {
                    return [{ id: partnerId, name: partnerName }, ...prev];
                }
                return prev;
            });

            if (selectedUserRef.current?.id !== partnerId && data.senderId !== "admin") {
                setUnreadCounts(prev => ({ ...prev, [partnerId]: (prev[partnerId] || 0) + 1 }));
            }

            if (selectedUserRef.current?.id === partnerId) {
                socket.emit("mark_as_seen", { senderId: partnerId, receiverId: "admin" });
            }
            
            if (data.senderId !== "admin") {

                if (selectedUserRef.current?.id !== partnerId || document.hidden) {

                    playSound();
                }
            }

            if (document.hidden && data.senderId !== "admin") {

                const oldTitle = document.title;
                document.title = `🔔 Yeni Mesaj! ${totalUnreadMessages}`;
                setTimeout(() => { document.title = oldTitle }, 3000);
            }

        });

        socket.on("old_messages", (data) => {

            if (!data || !Array.isArray(data)) return;
            const groupedMessages = {};
            const chatUsers = [];

            data.forEach(msg => {

                const partnerId = msg.senderId === "admin" ? msg.receiverId : msg.senderId;
                const partnerName = msg.senderId === "admin" ? "Müşteri" : (msg.senderName || "Müşteri");

                if (!partnerId || partnerId === "undefined") return;

                if (!groupedMessages[partnerId]) {

                    groupedMessages[partnerId] = [];

                    if (!chatUsers.find(u => u.id === partnerId)) {

                        chatUsers.push({ id: partnerId, name: partnerName });
                    }
                }
                groupedMessages[partnerId].push(msg);
            });

            setMessages(groupedMessages);
            setUsers(chatUsers);
        });

        socket.on("unread_counts_data", (data) => {

            const counts = {};
            data.forEach(item => counts[item._id] = item.count);
            setUnreadCounts(counts);
        });

        socket.on("user_typing", ({ senderId, isTyping }) => {

            setTypingStatus(prev => ({ ...prev, [senderId]: isTyping }));
        });

        socket.on("user_status_changed", ({ userId, status }) => {

            setOnlineUsers(prev => {

                const next = new Set(prev);
                status === "online" ? next.add(userId) : next.delete(userId);
                return next;
            });
        });

        socket.on("messages_seen_updated", ({ seenBy, partnerId }) => {

            const targetId = partnerId || seenBy;

            setMessages(prev => {

                if (!prev[targetId]) return prev;
                return { ...prev, [targetId]: prev[targetId].map(msg => ({ ...msg, isSeen: true })) };
            });
        });

        socket.on("messages_deleted", ({ userId }) => {

            setMessages(prev => {

                const newMessages = { ...prev };
                delete newMessages[userId];
                return newMessages;
            });

            setUsers(prev => prev.filter(u => u.id !== userId));
            if (selectedUserRef.current?.id === userId) setSelectedUser(null);
        });

        return () => {

            socket.off("receive_message");
            socket.off("old_messages");
            socket.off("unread_counts_data");
            socket.off("user_typing");
            socket.off("user_status_changed");
            socket.off("messages_seen_updated");
            socket.off("messages_deleted");
        };
    }, []);

    useEffect(() => {

        if (selectedUser) {

            setUnreadCounts(prev => ({ ...prev, [selectedUser.id]: 0 }));
            socket.emit("mark_as_seen", { senderId: selectedUser.id, receiverId: "admin" });
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [selectedUser, messages[selectedUser?.id]?.length]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (selectedUser) {
            socket.emit("typing", { receiverId: selectedUser.id, senderId: "admin", isTyping: e.target.value.length > 0 });
        }
    };

    const sendMessage = (customMsg) => {

        const finalMsg = typeof customMsg === 'string' ? customMsg : message;
        const targetUser = selectedUserRef.current;
        
        if (finalMsg.trim() === "" || !targetUser) return;

        const messageData = {
            senderId: "admin",
            receiverId: targetUser.id,
            message: finalMsg,
            senderName: "Flora Haven Admin",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSeen: false
        };

        setMessages((prev) => ({
            ...prev,
            [targetUser.id]: [...(prev[targetUser.id] || []), messageData]
        }));

        socket.emit("send_message", messageData);
        socket.emit("typing", { receiverId: targetUser.id, senderId: "admin", isTyping: false });
        setMessage("");
    };

    const deleteChat = (userId) => {

        if (window.confirm("Bu sohbeti silmek istediğinize emin misiniz?")) {

            socket.emit("delete_chat", { adminId: "admin", userId: userId });

            setMessages(prev => {

                const newMessages = { ...prev };
                delete newMessages[userId];
                return newMessages;
            });

            setUsers(prev => prev.filter(u => u.id !== userId));

            if (selectedUser?.id === userId) {

                setSelectedUser(null);
            }

            setUnreadCounts(prev => {

                const newCounts = { ...prev };
                delete newCounts[userId];
                return newCounts;
            });
        }
    };

    return (

        <div className='flex flex-col lg:flex-row min-h-screen'>

            <AdminPanel />

            <div className="mx-2 md:mx-5 w-[calc(100%-16px)] md:w-full p-2 md:p-5 flex flex-col md:flex-row gap-4 bg-gray-50 my-5 md:my-10 rounded-3xl shadow-xl border border-gray-100 font-sans h-[85vh] md:h-[90vh]">

                <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-1/4 bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col`}>

                    <div className="p-4 bg-rose-500 text-white font-bold flex items-center justify-between shadow-md">

                        <span className="flex items-center gap-2"><FaComments /> Sohbetler</span>

                    </div>

                    <div className="flex-1 overflow-y-auto">

                        {users.map((u) => ( <div key={u.id} className="group relative border-b hover:bg-gray-50 transition-all">

                            <div onClick={() => setSelectedUser(u)} className={`p-4 cursor-pointer flex items-center justify-between ${selectedUser?.id === u.id ? 'bg-rose-50 border-r-4 border-r-rose-500' : ''}`}>

                                <div className="flex items-center gap-3 overflow-hidden">

                                    <div className="relative">

                                        <FaUserCircle className="text-gray-300 text-4xl" />
                                        {onlineUsers.has(u.id) && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}

                                    </div>

                                    <div className="overflow-hidden">

                                        <p className="font-bold text-gray-700 truncate text-sm">{u.name}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{typingStatus[u.id] ? <span className="text-rose-500 italic">Yazıyor...</span> : "Sohbeti aç"}</p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-2">

                                    {unreadCounts[u.id] > 0 && (<span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">{unreadCounts[u.id]}</span>)}
                                    <button onClick={(e) => { e.stopPropagation(); deleteChat(u.id); }} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"><FaTrashAlt size={14} /></button>

                                </div>

                            </div>

                        </div>))}

                    </div>

                </div>

                <div className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 bg-white border rounded-2xl shadow-sm flex flex-col overflow-hidden relative`}>

                {selectedUser ? ( <div className="flex flex-col h-full w-full"> 

                    <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm z-10">

                        <div className="flex items-center gap-3">

                            <button onClick={() => setSelectedUser(null)} className="md:hidden text-gray-500 mr-2"><FaArrowLeft/></button>
                            <FaUserCircle className="text-rose-500 text-3xl" />

                            <div>

                                <span className="font-bold text-gray-800 text-sm md:text-base">{selectedUser.name}</span>

                                <div className="flex items-center gap-2 text-[10px]">

                                    <span className={onlineUsers.has(selectedUser.id) ? 'text-green-500' : 'text-gray-400'}> ● {onlineUsers.has(selectedUser.id) ? 'Çevrimiçi' : 'Çevrimdışı'}</span>
                                    {typingStatus[selectedUser.id] && <span className="text-rose-500 italic animate-pulse">yazıyor...</span>}

                                </div>

                            </div>

                        </div>

                        <button onClick={() => deleteChat(selectedUser.id)} className="text-gray-400 hover:text-red-500 p-2"><FaTrashAlt size={18} title="Sohbeti Sil" /></button>

                    </div>

                    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#f8f9fa] space-y-4 custom-scrollbar">

                        {messages[selectedUser.id]?.map((msg, index) => ( <div key={index} className={`flex ${msg.senderId === "admin" ? 'justify-end' : 'justify-start'}`}>

                            <div className={`max-w-[85%] md:max-w-[70%] p-3 shadow-sm rounded-2xl text-sm ${msg.senderId === "admin" ? 'bg-rose-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}>

                                <p className="leading-relaxed">{msg.message}</p>

                                <div className="flex items-center justify-end gap-1 opacity-70 mt-1 text-[9px]">

                                    <span>{msg.time}</span>
                                    {msg.senderId === "admin" && (msg.isSeen ? <FaCheckDouble /> : <FaCheck />)}

                                </div>

                            </div>

                        </div>))}

                        <div ref={scrollRef}></div>

                    </div>

                    <div className="p-2 bg-gray-50 border-t flex gap-2 overflow-x-auto no-scrollbar">

                        <FaBolt className="text-amber-500 mt-1 flex-shrink-0" size={12}/>

                        {fastReplies.map((reply, i) => (

                            <button key={i} onClick={() => sendMessage(reply)} className="text-[10px] bg-white border px-3 py-1 rounded-full whitespace-nowrap hover:border-rose-300">{reply}</button>
                        ))}

                    </div>

                    <div className="p-3 md:p-4 bg-white border-t flex gap-2">

                        <input type="text" value={message} onChange={handleMessageChange} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Mesajınızı yazın..." className="flex-1 p-3 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500 text-sm" />
                        <button onClick={() => sendMessage()} className="bg-rose-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center hover:shadow-lg"><FaPaperPlane /></button>

                    </div>

                </div> ) : (
                
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 p-10 text-center">

                        <FaComments size={60} className="mb-4 opacity-10" />
                        <p className="text-lg font-medium">Bir sohbet seçerek başlayın</p>

                    </div>)}

                </div>

            </div>

        </div>

    );

};


export default MessagesAdmin;