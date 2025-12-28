import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus, uploadOrderPhoto } from '../../redux/orderSlice';
import AdminPanel from '../../layout/AdminPanel';
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { CiStickyNote } from "react-icons/ci";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

const OrdersAdmin = () => {

    const dispatch = useDispatch();
    const { orders, loading } = useSelector(state => state.orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deliveryImage, setDeliveryImage] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);

    const playSound = () => {

        const audio = new Audio('/notification.mp3'); 
        audio.play().catch(err => console.log("Ses çalma hatası:", err));
    };

    useEffect(() => {


        dispatch(getAllOrders());
        console.log("Socket bağlantı durumu:", socket.connected);
        socket.on("connect", () => {

            console.log("Bağlantı başarılı! ID:", socket.id);
        });

        socket.on("connect_error", (err) => {

            console.log("Bağlantı hatası:", err.message);
        });

        const joinRoom = () => {

            socket.emit("join_chat", "admin"); 
            console.log("Admin odasına giriş isteği gönderildi.");
        };

        if (socket.connected) {

            joinRoom();
        }

        const onConnect = () => {

            console.log("✅ Socket Bağlandı");
            joinRoom();
        };

        const onNewOrder = (data) => {

            playSound();
            const oldTitle = document.title;
            document.title = "🔥 YENİ SİPARİŞ!";
            dispatch(getAllOrders());
            setTimeout(() => { document.title = oldTitle }, 5000);
        };

        const onStatusUpdate = (data) => {

            console.log("🔄 Sipariş Durumu Güncellendi:", data);
            dispatch(getAllOrders());
        };

        socket.on("connect", onConnect);
        socket.on("new_order", onNewOrder);
        socket.on("order_status_updated", onStatusUpdate);

        return () => {

            socket.off("connect", onConnect);
            socket.off("new_order", onNewOrder);
            socket.off("order_status_updated", onStatusUpdate);
        };

    }, [dispatch]);

    const handleStatusUpdate = (id, newStatus, e) => {

        e.stopPropagation();
        dispatch(updateOrderStatus({ id, status: newStatus }));
    };

    const handleImageChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {

            if (reader.readyState === 2) {

                setDeliveryImage(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handlePhotoSubmit = async (id) => {

        if (!deliveryImage) return alert("Lütfen önce bir fotoğraf seçin!");
        setUploadLoading(true);
        dispatch(uploadOrderPhoto({ id, image: deliveryImage }))
            .unwrap()
            .then(() => {

                alert("Ürün fotoğrafı başarıyla yüklendi.");
                setDeliveryImage("");
                setSelectedOrder(null);
                dispatch(getAllOrders());
            })
            .catch((err) => alert("Hata: " + err))
            .finally(() => setUploadLoading(false));
    };

    const getStatusStyle = (status) => {

        switch (status) {

            case 'Ödeme Bekleniyor': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Hazırlanıyor': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Onay Bekliyor': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Yolda': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Teslim Edildi': return 'bg-green-100 text-green-700 border-green-200';
            case 'İptal Edildi': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (

        <div className='flex flex-col lg:flex-row min-h-screen bg-gray-50'>

            <AdminPanel />

            <div className='flex-1 w-full p-4 lg:p-8 overflow-hidden'>
                
                <div className='flex items-center gap-3 mb-6 border-b pb-2'>

                    <h1 className="text-xl lg:text-2xl font-bold italic text-gray-800">Admin Sipariş Yönetimi</h1>

                </div>

                {loading ? ( <div className="flex justify-center py-20 italic text-gray-500 text-lg">Yükleniyor...</div> ) : (

                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                        <div className="hidden lg:block">

                            <table className="w-full text-left">

                                <thead className="bg-gray-50 border-b text-xs font-bold uppercase text-gray-500">

                                    <tr>

                                        <th className="px-6 py-4">Sipariş No</th>
                                        <th className="px-6 py-4">Müşteri</th>
                                        <th className="px-6 py-4">Tarih</th>
                                        <th className="px-6 py-4">Toplam</th>
                                        <th className="px-6 py-4">Durum</th>
                                        <th className="px-6 py-4 text-right">Aksiyon</th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {[...orders].reverse().map((order) => ( <tr key={order._id} onClick={() => setSelectedOrder(order)} className="hover:bg-blue-50/50 cursor-pointer transition-all">

                                        <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-bold">#{order._id.slice(-6).toUpperCase()}</td>

                                        <td className="px-6 py-4">

                                            <div className="text-sm font-medium text-gray-900">{order.user?.name || 'Misafir'}</div>
                                            <div className="text-xs text-gray-500">{order.user?.email}</div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</td>
                                        <td className="px-6 py-4 font-bold text-gray-700">{order.totalPrice?.toLocaleString()} ₺</td>
                                        <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(order.orderStatus)}`}>{order.orderStatus}</span></td>

                                        <td className="px-6 py-4 text-right">

                                            <select onChange={(e) => handleStatusUpdate(order._id, e.target.value, e)} onClick={(e) => e.stopPropagation()} value={order.orderStatus} className="text-xs border rounded-md p-1.5 bg-white cursor-pointer hover:border-gray-400">

                                                <option value="Hazırlanıyor">Hazırlanıyor</option>
                                                <option value="Onay Bekliyor">Onay Bekliyor</option>
                                                <option value="Yolda">Yolda</option>
                                                <option value="Teslim Edildi">Teslim Edildi</option>
                                                <option value="İptal Edildi">İptal Edildi</option>

                                            </select>

                                        </td>

                                    </tr>))}

                                </tbody>

                            </table>

                        </div>

                        <div className="lg:hidden divide-y divide-gray-100">

                            {[...orders].reverse().map((order) => ( <div key={order._id} onClick={() => setSelectedOrder(order)} className="p-4 active:bg-gray-50 transition-colors">

                                <div className="flex justify-between items-start mb-2">

                                    <span className="font-mono text-indigo-600 font-bold">#{order._id.slice(-6).toUpperCase()}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(order.orderStatus)}`}>{order.orderStatus}</span>

                                </div>

                                <div className="text-sm font-medium text-gray-900">{order.user?.name || 'Misafir'}</div>

                                <div className="flex justify-between items-center mt-3">

                                    <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</div>
                                    <div className="font-bold text-gray-800">{order.totalPrice?.toLocaleString()} ₺</div>

                                </div>

                                <div className="mt-3">

                                    <select onChange={(e) => handleStatusUpdate(order._id, e.target.value, e)} onClick={(e) => e.stopPropagation()} value={order.orderStatus} className="w-full text-xs border rounded-lg p-2 bg-gray-50">

                                        <option value="Hazırlanıyor">Hazırlanıyor</option>
                                        <option value="Onay Bekliyor">Onay Bekliyor</option>
                                        <option value="Yolda">Yolda</option>
                                        <option value="Teslim Edildi">Teslim Edildi</option>
                                        <option value="İptal Edildi">İptal Edildi</option>

                                    </select>

                                </div>

                            </div>))}

                        </div>

                    </div>)}

                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-0 lg:p-4">
                        <div className="bg-white w-full h-full lg:h-auto lg:max-w-3xl lg:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-screen lg:max-h-[90vh]">
                            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center shrink-0">
                                <div>
                                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">Sipariş Ayrıntıları</h3>
                                    <p className="text-[10px] text-gray-500 font-mono">ID: {selectedOrder._id}</p>
                                </div>
                                <button onClick={() => {setSelectedOrder(null); setDeliveryImage("");}} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><IoClose size={24} /></button>
                            </div>

                            <div className="p-4 lg:p-6 overflow-y-auto space-y-6 lg:space-y-8 flex-1">
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-4 border-l-4 border-rose-500 pl-2 text-sm lg:text-base">Sipariş İçeriği</h4>
                                    <div className="space-y-3">
                                        {selectedOrder.orderItems?.map((item, idx) => (
                                            <div key={idx} className="bg-gray-50 border rounded-xl p-3">
                                                <div className="flex items-center gap-3 lg:gap-4">
                                                    <img src={item.image} alt="" className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg" />
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                                                        <p className="text-xs text-gray-500">{item.price} ₺ x {item.quantity}</p>
                                                    </div>
                                                    <div className="font-bold text-rose-600 text-sm">{item.price * item.quantity} ₺</div>
                                                </div>
                                                {item.note && (
                                                    <div className="mt-2 p-2 bg-white border-l-2 border-green-500 rounded-r-lg text-xs text-gray-700 italic flex items-start gap-2">
                                                        <CiStickyNote size={14} className="text-green-600 mt-0.5 shrink-0" />
                                                        <span>{item.note}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {(selectedOrder.orderStatus === "Hazırlanıyor" || selectedOrder.orderStatus === "Onay Bekliyor") && (
                                    <div className="bg-purple-50 p-4 lg:p-6 rounded-2xl border-2 border-dashed border-purple-200">
                                        <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2 text-sm"><IoCloudUploadOutline size={18} />Ürün Hazır Fotoğrafı</h4>
                                        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                                            <div className="flex-1 w-full">
                                                <label className="block w-full bg-white border border-purple-300 text-purple-600 px-4 py-2.5 rounded-xl text-center cursor-pointer hover:bg-purple-600 hover:text-white transition-all text-sm font-medium">
                                                    {deliveryImage ? "Değiştir" : "Fotoğraf Seç"}
                                                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                                </label>
                                                {deliveryImage && (
                                                    <button onClick={() => handlePhotoSubmit(selectedOrder._id)} disabled={uploadLoading} className={`w-full mt-2 py-2.5 rounded-xl font-bold text-white shadow-lg transition-all text-sm ${uploadLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`} >{uploadLoading ? "Yükleniyor..." : "Müşteriye Gönder"}</button>
                                                )}
                                            </div>
                                            <div className="w-24 h-24 lg:w-32 lg:h-32 border-2 border-white rounded-xl shadow-md overflow-hidden bg-gray-200 shrink-0">
                                                {deliveryImage ? (
                                                    <img src={deliveryImage} alt="Önizleme" className="w-full h-full object-cover" />
                                                ) : selectedOrder.deliveredImage?.url ? (
                                                    <img src={selectedOrder.deliveredImage.url} alt="Yüklenmiş" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] text-center p-2">Yok</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-xs lg:text-sm">

                                    <h4 className="font-bold text-blue-800 mb-2">Teslimat Adresi</h4>

                                    <p className="text-blue-900 leading-relaxed">

                                        <strong>Alıcı:</strong> {selectedOrder.shippingInfo?.title}<br />
                                        <strong>Adres:</strong> {selectedOrder.shippingInfo?.address}<br />
                                        <strong>Telefon:</strong> {selectedOrder.shippingInfo?.phoneNo}

                                    </p>

                                </div>

                                <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200 text-xs lg:text-sm">

                                    <h4 className="font-bold text-gray-800 mb-2">Finansal Özet</h4>

                                    <div className="space-y-1">

                                        <div className="flex justify-between"><span>Ürünler:</span><span>{selectedOrder.itemsPrice} ₺</span></div>
                                        <div className="flex justify-between font-bold text-rose-600 border-t pt-1"><span>TOPLAM:</span><span>{selectedOrder.totalPrice} ₺</span></div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="bg-gray-50 px-6 py-4 border-t flex flex-col sm:flex-row gap-3 justify-between items-center shrink-0">

                            <span className={`w-full sm:w-auto text-center px-4 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(selectedOrder.orderStatus)}`}>{selectedOrder.orderStatus}</span>
                            <button onClick={() => {setSelectedOrder(null); setDeliveryImage("");}} className="w-full sm:w-auto bg-gray-800 text-white px-8 py-2 rounded-xl text-sm font-bold hover:bg-black transition-all" >Kapat</button>

                        </div>

                    </div>

                </div>)}

            </div>

        </div>

    );

};

export default OrdersAdmin;