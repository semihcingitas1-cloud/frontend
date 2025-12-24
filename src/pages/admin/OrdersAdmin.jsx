import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllOrders, updateOrderStatus, uploadOrderPhoto } from '../../redux/orderSlice';

import AdminPanel from '../../layout/AdminPanel';

import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { CiStickyNote } from "react-icons/ci";

const OrdersAdmin = () => {

    const dispatch = useDispatch();
    const { orders, loading } = useSelector(state => state.orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deliveryImage, setDeliveryImage] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);

    useEffect(() => {

        dispatch(getAllOrders());
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

            alert("Ürün fotoğrafı başarıyla yüklendi. Durum: Onay Bekliyor");
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

        <div className='flex gap-2'>

            <AdminPanel />

            <div className='w-full mx-5'>

                <div className='w-full'>

                    <div className="p-6 bg-gray-50 min-h-screen relative">

                        <h1 className="text-2xl font-bold mb-6 italic text-gray-800 border-b pb-2">Admin Sipariş Yönetimi</h1>

                        {loading ? ( <div className="flex justify-center py-20 italic text-gray-500 text-lg">Sipariş verileri yükleniyor...</div> ) : ( <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-gray-50 border-b">

                                    <tr>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Sipariş No</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Müşteri</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Tarih</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Toplam</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Durum</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Aksiyon</th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {[...orders].reverse().map((order) => ( <tr key={order._id} onClick={() => setSelectedOrder(order)} className="hover:bg-blue-50/50 cursor-pointer transition-all">

                                        <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-bold">#{order._id.slice(-6).toUpperCase()}</td>

                                        <td className="px-6 py-4">

                                            <div className="text-sm font-medium text-gray-900">{order.user?.name || 'Misafir'}</div>
                                            <div className="text-xs text-gray-500">{order.user?.email}</div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">

                                            {new Date(order.createdAt).toLocaleDateString('tr-TR')}

                                        </td>

                                        <td className="px-6 py-4 font-bold text-gray-700">{order.totalPrice.toLocaleString()} ₺</td>

                                        <td className="px-6 py-4">

                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(order.orderStatus)}`}>{order.orderStatus}</span>

                                        </td>

                                        <td className="px-6 py-4 text-right">

                                            <select onChange={(e) => handleStatusUpdate(order._id, e.target.value, e)} onClick={(e) => e.stopPropagation()}value={order.orderStatus} className="text-xs border rounded-md p-1.5 bg-white outline-none focus:ring-2 focus:ring-indigo-200" >

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

                        </div>)}

                        {selectedOrder && (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">

                                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">

                                    <div>

                                        <h3 className="text-xl font-bold text-gray-800">Sipariş Ayrıntıları</h3>
                                        <p className="text-xs text-gray-500 font-mono">ID: {selectedOrder._id}</p>

                                    </div>

                                    <button onClick={() => {setSelectedOrder(null); setDeliveryImage("");}} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><IoClose size={24} /></button>

                                </div>

                                <div className="p-6 overflow-y-auto space-y-8">

                                    <div>

                                        <h4 className="font-bold text-gray-700 mb-4 border-l-4 border-rose-500 pl-2">Sipariş İçeriği</h4>

                                        <div className="space-y-4">

                                            {selectedOrder.orderItems?.map((item, idx) => ( <div key={idx} className="bg-gray-50 border rounded-xl p-4">

                                                <div className="flex items-center gap-4">

                                                    <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-lg" />

                                                    <div className="flex-1">

                                                        <h5 className="font-bold text-gray-800">{item.name}</h5>
                                                        <p className="text-sm text-gray-500">{item.price} ₺ x {item.quantity}</p>

                                                    </div>

                                                    <div className="font-bold text-rose-600">{item.price * item.quantity} ₺</div>

                                                </div>

                                                {item.note && ( <div className="mt-3 p-3 bg-white border-l-4 border-green-500 rounded-r-lg text-sm text-gray-700 italic flex items-start gap-2">

                                                    <CiStickyNote size={18} className="text-green-600 mt-0.5" />
                                                    <span><strong>Müşteri Notu:</strong> {item.note}</span>

                                                </div> )}

                                            </div> ))}

                                        </div>

                                    </div>

                    {(selectedOrder.orderStatus === "Hazırlanıyor" || selectedOrder.orderStatus === "Onay Bekliyor") && ( <div className="bg-purple-50 p-6 rounded-2xl border-2 border-dashed border-purple-200">

                        <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><IoCloudUploadOutline size={20} />Ürün Hazır Fotoğrafı (Müşteri Onayı İçin)</h4>

                            <div className="flex flex-col md:flex-row items-center gap-6">

                                <div className="flex-1 w-full">

                                    <label className="block w-full bg-white border border-purple-300 text-purple-600 px-4 py-3 rounded-xl text-center cursor-pointer hover:bg-purple-600 hover:text-white transition-all font-medium">

                                        {deliveryImage ? "Fotoğrafı Değiştir" : "Bir Fotoğraf Seç"}
                                        <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />

                                    </label>
                                            
                                    {deliveryImage && (

                                        <button onClick={() => handlePhotoSubmit(selectedOrder._id)} disabled={uploadLoading} className={`w-full mt-3 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${uploadLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`} >{uploadLoading ? "Yükleniyor..." : "Müşteriye Gönder"}</button>

                                    )}

                                </div>

                                <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-white rounded-xl shadow-md overflow-hidden bg-gray-200 flex-shrink-0">
                                
                                    {deliveryImage ? (

                                        <img src={deliveryImage} alt="Önizleme" className="w-full h-full object-cover" />

                                    ) : selectedOrder.deliveredImage?.url ? (

                                        <img src={selectedOrder.deliveredImage.url} alt="Yüklenmiş" className="w-full h-full object-cover" />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] text-center p-2">Henüz fotoğraf yüklenmedi</div>

                                    )}

                                </div>

                            </div>

                            <p className="text-[10px] text-purple-400 mt-2 italic">* Fotoğraf yüklendiğinde sipariş durumu otomatik olarak "Onay Bekliyor" olacaktır.</p>

                        </div>

                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">

                            <h4 className="font-bold text-blue-800 mb-3 underline">Teslimat Adresi</h4>
                            <p className="text-sm text-blue-900 leading-relaxed">

                                <strong>Alıcı:</strong> {selectedOrder.shippingInfo?.title}<br />
                                <strong>Adres:</strong> {selectedOrder.shippingInfo?.address}<br />
                                <strong>Şehir:</strong> {selectedOrder.shippingInfo?.city}<br />
                                <strong>Telefon:</strong> {selectedOrder.shippingInfo?.phoneNo}

                            </p>

                        </div>

                        <div className="bg-gray-100 p-5 rounded-2xl border border-gray-200">

                            <h4 className="font-bold text-gray-800 mb-3 underline">Finansal Özet</h4>

                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between"><span>Ürünler:</span><span>{selectedOrder.itemsPrice} ₺</span></div>
                                <div className="flex justify-between"><span>Kargo:</span><span>{selectedOrder.shippingPrice} ₺</span></div>

                                <div className="flex justify-between font-bold text-lg pt-2 border-t text-rose-600">

                                    <span>TOPLAM:</span><span>{selectedOrder.totalPrice} ₺</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">

                    <span className={`px-4 py-1 rounded-full text-xs font-bold border ${getStatusStyle(selectedOrder.orderStatus)}`}>Mevcut Durum: {selectedOrder.orderStatus}</span>
                    <button onClick={() => {setSelectedOrder(null); setDeliveryImage("");}} className="bg-gray-800 text-white px-8 py-2 rounded-xl hover:bg-black transition-all shadow-lg" >Kapat</button>

                </div>

            </div>

        </div>

        )}

        </div>

        </div>

        </div>

        </div>

    );
};

export default OrdersAdmin;