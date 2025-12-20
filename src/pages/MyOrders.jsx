import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, approveOrder } from '../redux/orderSlice';
import { FaBox, FaTruck, FaCheckDouble, FaClock, FaEye, FaCheckCircle, FaCreditCard } from 'react-icons/fa';

const MyOrders = () => {

    const dispatch = useDispatch();
    const { myOrders, loading } = useSelector(state => state.orders);

    const stages = [

        {

            label: 'Ödeme',
            status: 'Ödeme Bekliyor'
        },
        {

            label: 'Hazırlandı',
            status: 'Hazırlanıyor'

        },
        {

            label: 'Onayında',
            status: 'Onay Bekliyor'

        },
        {

            label: 'Yolda',
            status: 'Yolda'

        },
        {

            label: 'Teslim Edildi',
            status: 'Teslim Edildi'

        }

    ];

    useEffect(() => {
        dispatch(getMyOrders());
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

    const getStatusDetails = (status) => {

        switch (status) {

            case 'Ödeme Bekliyor':

                return { color: 'text-red-600', bg: 'bg-red-100', icon: <FaCreditCard className="mr-2" /> };
            case 'Hazırlanıyor':

                return { color: 'text-orange-600', bg: 'bg-orange-100', icon: <FaBox className="mr-2" /> };
            case 'Onay Bekliyor':

                return { color: 'text-purple-600', bg: 'bg-purple-100', icon: <FaEye className="mr-2" /> };
            case 'Yolda':

                return { color: 'text-blue-600', bg: 'bg-blue-100', icon: <FaTruck className="mr-2" /> };
            case 'Teslim Edildi':

                return { color: 'text-green-600', bg: 'bg-green-100', icon: <FaCheckDouble className="mr-2" /> };
            default:

                return { color: 'text-gray-600', bg: 'bg-gray-100', icon: <FaClock className="mr-2" /> };
        }
    };

    const OrderStepper = ({ currentStatus }) => {

        const currentIndex = stages.findIndex(s => s.status === currentStatus);

        return (

            <div className="w-full py-6 px-2">

                <div className="flex items-center w-full">

                    {stages.map((stage, index) => ( <React.Fragment key={index}>

                        <div className="relative flex flex-col items-center">

                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 border-2 

                                ${index <= currentIndex ? 'bg-pink-600 border-pink-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-400'}`}>
                                {index < currentIndex ? <FaCheckDouble size={12} /> : (index + 1)}

                            </div>

                            <div className={`absolute -bottom-6 w-max text-[10px] md:text-xs font-bold uppercase tracking-tighter ${index <= currentIndex ? 'text-pink-600' : 'text-gray-400'}`}>{stage.label}</div>

                        </div>

                        {index !== stages.length - 1 && ( <div className="flex-auto border-t-2 transition-colors duration-500 mx-2" 

                            style={{ borderColor: index < currentIndex ? '#db2777' : '#e5e7eb' }}></div>
                        )}

                        </React.Fragment>

                    ))}

                </div>

            </div>

        );
    };

    if (loading) {

        return <div className="min-h-screen flex items-center justify-center font-semibold text-gray-500 italic">Siparişleriniz yükleniyor...</div>;
    }

    return (

        <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen">

            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-4 italic">Siparişlerim</h1>

            {myOrders && myOrders.length > 0 ? ( <div className="space-y-6">

                {[...myOrders].reverse().map((order) => {

                    const status = getStatusDetails(order.orderStatus);

                        return (

                            <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    
                                {/* Üst Bilgi Alanı */}
                                <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">

                                    <div className="flex gap-8">

                                        <div>

                                            <p className="text-xs text-gray-400 uppercase font-bold">Sipariş Tarihi</p>
                                            <p className="text-sm font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>

                                        </div>

                                        <div>

                                            <p className="text-xs text-gray-400 uppercase font-bold">Toplam Tutar</p>
                                            <p className="text-sm font-bold text-pink-600">{order.totalPrice.toLocaleString()} ₺</p>

                                        </div>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Sipariş No</p>
                                        <p className="text-xs font-mono text-gray-500 italic">#{order._id}</p>

                                    </div>

                                </div>
                                {/* Takip Çizgisi (Stepper) */}
                                <div className="px-6 pt-4 pb-8"><OrderStepper currentStatus={order.orderStatus} /></div>
                                {/* Orta Kısım: Ürünler ve Durum */}
                                <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                                    <div className="flex-1 w-full">

                                        {order.orderItems.map((item, index) => ( <div key={index} className="flex items-center gap-4 mb-3 last:mb-0">

                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />

                                            <div className="flex-1">

                                                <h4 className="text-sm font-semibold text-gray-800">{item.name}</h4>
                                                <p className="text-xs text-gray-500">{item.quantity} Adet x {item.price} ₺</p>

                                            </div>

                                        </div>))}

                                    </div>

                                    <div className={`flex items-center px-6 py-2 rounded-full font-bold text-sm ${status.bg} ${status.color}`}>

                                        {status.icon} {order.orderStatus}

                                    </div>

                                </div>
                                {/* Onay Bekleyen Fotoğraf Alanı */}
                                {order.orderStatus === "Onay Bekliyor" && order.deliveredImage?.url && (
                                    <div className="mx-5 mb-5 p-4 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col md:flex-row items-center gap-6">
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={order.deliveredImage.url} 
                                                alt="Ürün Son Hali" 
                                                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl shadow-lg border-4 border-white cursor-zoom-in" 
                                                onClick={() => window.open(order.deliveredImage.url, '_blank')} 
                                            />
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-purple-800 font-bold text-lg mb-2 italic">Çiçeğiniz Hazırlandı! 🌸</h3>
                                            <p className="text-sm text-purple-600 mb-4 font-medium">
                                                Çiçekçimiz siparişinizi hazırladı. Yukarıdaki görsel siparişinizin son halidir. 
                                                Beğendiyseniz onaylayın, hemen yola çıkaralım!
                                            </p>
                                            <button 
                                                onClick={() => handleApprove(order._id)} 
                                                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md w-full md:w-auto"
                                            >
                                                <FaCheckCircle /> Görseli Onayla ve Kargola
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Alt Bilgi: Teslimat Adresi ve Müşteri Onayı Bilgisi */}
                                <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
                                    <p className="text-[11px] text-gray-400 italic">
                                        Teslimat Adresi: {order.shippingInfo.address}, {order.shippingInfo.city}
                                    </p>
                                    {order.isApprovedByCustomer && (
                                        <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded font-bold uppercase tracking-tighter">
                                            Müşteri Onayı Alındı
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-4 text-gray-300">
                        <FaBox size={40} />
                    </div>
                    <p className="text-gray-500 text-lg font-medium italic">Henüz bir siparişiniz bulunmuyor.</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;