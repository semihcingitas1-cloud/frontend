import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { getMyOrders, approveOrder, requestRevision } from '../redux/orderSlice';

import { FaBox, FaTruck, FaCheckDouble, FaClock, FaEye, FaCheckCircle, FaCreditCard, FaUndo, FaExclamationTriangle } from 'react-icons/fa';

const socket = io.connect("http://localhost:4000");

const MyOrders = () => {

    const dispatch = useDispatch();

    const { myOrders, loading } = useSelector(state => state.orders);
    const [revisionNote, setRevisionNote] = useState("");
    const [showRevisionInput, setShowRevisionInput] = useState(null);

    const stages = [

        { label: 'Ödeme', status: 'Ödeme Bekliyor' },
        { label: 'Hazırlandı', status: 'Hazırlanıyor' },
        { label: 'Onayında', status: 'Onay Bekliyor' },
        { label: 'Yolda', status: 'Yolda' },
        { label: 'Teslim Edildi', status: 'Teslim Edildi' }
    ];

    useEffect(() => {

        dispatch(getMyOrders());

        console.log("Socket bağlantı durumu:", socket.connected);

        socket.on("connect", () => {

            console.log("Bağlantı başarılı! ID:", socket.id);
        });

        socket.on("connect_error", (err) => {

            console.log("Bağlantı hatası:", err.message);
        });

        const joinRoom = () => {

            socket.emit("join_chat", "admin");
        };

        if (socket.connected) {

            joinRoom();
        }

        const onConnect = () => {

            console.log("✅ Socket Bağlandı");
            joinRoom();
        };

        const handleStatusUpdate = () => {

            dispatch(getMyOrders());
        };

        socket.on("connect", onConnect);
        socket.on("order_status_updated", handleStatusUpdate);
        socket.on("new_order_ready", handleStatusUpdate);

        return () => {

            socket.off("connect", onConnect);
            socket.off("order_status_updated", handleStatusUpdate);
            socket.off("new_order_ready", handleStatusUpdate);
        };

    }, [dispatch]);

    const handleApprove = (id) => {

        if (window.confirm("Ürünün son halini onaylıyor musunuz? Onayınızdan sonra ürün yola çıkacaktır.")) {

            dispatch(approveOrder(id))
            .unwrap()
            .then(() => {

                alert("Sipariş onaylandı! Çiçeğiniz yola çıkıyor.");
                dispatch(getMyOrders());
            })
            .catch((err) => alert("Hata: " + err));
        }
    };

    const handleRevisionSubmit = (id) => {
        if (!revisionNote.trim()) return alert("Lütfen revize nedeninizi yazın.");
        
        dispatch(requestRevision({ id, note: revisionNote }))
            .unwrap()
            .then(() => {
                alert("Revize talebiniz iletildi. Çiçekçimiz gerekli düzenlemeyi yapacaktır.");
                setRevisionNote("");
                setShowRevisionInput(null);
                dispatch(getMyOrders());
            })
            .catch((err) => alert("Hata: " + err));
    };

    const getStatusDetails = (status) => {
        switch (status) {
            case 'Ödeme Bekliyor': return { color: 'text-red-600', bg: 'bg-red-100', icon: <FaCreditCard className="mr-2" /> };
            case 'Hazırlanıyor': return { color: 'text-orange-600', bg: 'bg-orange-100', icon: <FaBox className="mr-2" /> };
            case 'Onay Bekliyor': return { color: 'text-purple-600', bg: 'bg-purple-100', icon: <FaEye className="mr-2" /> };
            case 'Yolda': return { color: 'text-blue-600', bg: 'bg-blue-100', icon: <FaTruck className="mr-2" /> };
            case 'Teslim Edildi': return { color: 'text-green-600', bg: 'bg-green-100', icon: <FaCheckDouble className="mr-2" /> };
            default: return { color: 'text-gray-600', bg: 'bg-gray-100', icon: <FaClock className="mr-2" /> };
        }
    };

    const OrderStepper = ({ currentStatus }) => {
        const currentIndex = stages.findIndex(s => s.status === currentStatus);
        return (
            <div className="w-full py-6 px-2">
                <div className="flex items-center w-full">
                    {stages.map((stage, index) => (
                        <React.Fragment key={index}>
                            <div className="relative flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 border-2 
                                    ${index <= currentIndex ? 'bg-pink-600 border-pink-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-400'}`}>
                                    {index < currentIndex ? <FaCheckDouble size={12} /> : (index + 1)}
                                </div>
                                <div className={`absolute -bottom-6 w-max text-[10px] md:text-xs font-bold uppercase tracking-tighter ${index <= currentIndex ? 'text-pink-600' : 'text-gray-400'}`}>{stage.label}</div>
                            </div>
                            {index !== stages.length - 1 && (
                                <div className="flex-auto border-t-2 transition-colors duration-500 mx-2" style={{ borderColor: index < currentIndex ? '#db2777' : '#e5e7eb' }}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-semibold text-gray-500 italic">Siparişleriniz yükleniyor...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-4 italic tracking-tight">Sipariş Takibi</h1>

            {myOrders && myOrders.length > 0 ? (
                <div className="space-y-8">
                    {[...myOrders].reverse().map((order) => {
                        const status = getStatusDetails(order.orderStatus);
                        const revisionCount = order.revisionCount || 0;
                        const canRequestRevision = revisionCount < 3;

                        return (
                            <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                                {/* Üst Bilgi */}
                                <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-black">Tarih</p>
                                            <p className="text-sm font-semibold text-gray-700">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-black">Toplam</p>
                                            <p className="text-sm font-bold text-pink-600">{order.totalPrice?.toLocaleString()} ₺</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase font-black">Sipariş No</p>
                                        <p className="text-[11px] font-mono text-gray-500">#{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="px-6 pt-4 pb-8"><OrderStepper currentStatus={order.orderStatus} /></div>

                                {/* Onay ve Revize Alanı */}
                                {order.orderStatus === "Onay Bekliyor" && order.deliveredImage?.url && (
                                    <div className="mx-5 mb-5 p-6 bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100 shadow-inner">
                                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                                            <div className="relative group mx-auto lg:mx-0">
                                                <img 
                                                    src={order.deliveredImage.url} 
                                                    alt="Ürün Son Hali" 
                                                    className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-xl border-4 border-white"
                                                />
                                                <button onClick={() => window.open(order.deliveredImage.url, '_blank')} className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <FaEye size={16} />
                                                </button>
                                            </div>

                                            <div className="flex-1 space-y-4 text-center lg:text-left">
                                                <div>
                                                    <h3 className="text-purple-900 font-black text-xl italic flex items-center justify-center lg:justify-start gap-2">
                                                        Çiçeğiniz Hazırlandı! 🌸
                                                    </h3>
                                                    <p className="text-sm text-purple-700 font-medium leading-relaxed mt-2">
                                                        Hazırlanan ürünün fotoğrafı yukarıdadır. Beğendiyseniz onaylayabilir, 
                                                        değişiklik isterseniz revize talebi oluşturabilirsiniz.
                                                    </p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <button 
                                                        onClick={() => handleApprove(order._id)} 
                                                        className="flex-1 bg-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                                                    >
                                                        <FaCheckCircle /> Harika, Onaylıyorum
                                                    </button>
                                                    
                                                    {canRequestRevision ? (
                                                        <button 
                                                            onClick={() => setShowRevisionInput(showRevisionInput === order._id ? null : order._id)} 
                                                            className="flex-1 bg-white text-orange-600 border-2 border-orange-200 px-6 py-4 rounded-2xl font-bold hover:bg-orange-50 transition flex items-center justify-center gap-2"
                                                        >
                                                            <FaUndo /> Revize İste ({3 - revisionCount} Hak)
                                                        </button>
                                                    ) : (
                                                        <div className="flex-1 bg-gray-100 text-gray-500 px-6 py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 text-xs border border-gray-200">
                                                            <FaExclamationTriangle /> Revize Hakkınız Doldu
                                                        </div>
                                                    )}
                                                </div>

                                                {showRevisionInput === order._id && (
                                                    <div className="mt-4 p-4 bg-white rounded-2xl border-2 border-orange-100 animate-in fade-in slide-in-from-top-4 duration-300">
                                                        <textarea 
                                                            className="w-full text-sm border-none focus:ring-0 p-0 placeholder:text-gray-300 italic"
                                                            rows="3"
                                                            placeholder="Çiçekte neyi değiştirmemizi istersiniz? (Örn: Paket kağıdı pembe olsun...)"
                                                            value={revisionNote}
                                                            onChange={(e) => setRevisionNote(e.target.value)}
                                                        ></textarea>
                                                        <div className="flex justify-end mt-2">
                                                            <button 
                                                                onClick={() => handleRevisionSubmit(order._id)}
                                                                className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 transition"
                                                            >
                                                                Talebi Gönder
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {order.revisions && order.revisions.length > 0 && (
    <div className="mt-4 space-y-2">
        <p className="text-[10px] text-gray-400 uppercase font-black px-1">Revize Geçmişi</p>
        {order.revisions.map((rev, idx) => (
            <div key={idx} className="bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
                <p className="text-xs text-orange-800 italic">"{rev.note}"</p>
                <p className="text-[9px] text-orange-400 mt-1">
                    {new Date(rev.date).toLocaleString('tr-TR')}
                </p>
            </div>
        ))}
    </div>
)}

                                <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex-1 w-full space-y-3">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-gray-100" />
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
                                                    <p className="text-xs text-gray-400 font-medium">{item.quantity} Adet x {item.price} ₺</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`flex items-center px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest ${status.bg} ${status.color}`}>
                                        {status.icon} {order.orderStatus}
                                    </div>
                                </div>
                                
                                <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-50 flex flex-wrap justify-between items-center gap-2">
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        Adres: {order.shippingInfo?.address?.substring(0, 50)}...
                                    </p>
                                    <div className="flex gap-2">
                                        {revisionCount > 0 && (
                                            <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">
                                                {revisionCount}. Revize Kullanıldı
                                            </span>
                                        )}
                                        {order.isApprovedByCustomer && (
                                            <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded font-bold uppercase">
                                                Onaylandı
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <div className="bg-white p-8 rounded-full shadow-sm mb-6 text-pink-200">
                        <FaBox size={48} />
                    </div>
                    <p className="text-gray-400 text-xl font-bold italic">Henüz bir siparişiniz yok.</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;