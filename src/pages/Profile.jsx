
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addAddress, deleteAddress, logoutUser } from '../redux/userSlice';
import { approveOrder, getMyOrders } from '../redux/orderSlice';

import { FaTrash, FaBox, FaTruck, FaCheckDouble, FaClock, FaEye, FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import { User, Package, MapPin, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import { CiCirclePlus } from 'react-icons/ci';

const ProfilePage = () => {

    const [activeTab, setActiveTab] = useState('siparislerim');
    const { myOrders, loading } = useSelector(state => state.orders);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const [showAddrModal, setShowAddrModal] = useState(false);
    const [addressInfo, setAddressInfo] = useState({ title: '', address: '', city: 'KONYA',district: '', shippingPrice: 0, phoneNo: '' });

    const handleAddAddress = (e) => {

        e.preventDefault();
    
        if (!addressInfo.title || !addressInfo.address || !addressInfo.district || !addressInfo.phoneNo) {

            alert("Lütfen tüm alanları (başlık, adres, ilçe ve telefon) doldurun.");
            return;
        }

        dispatch(addAddress(addressInfo));
        setShowAddrModal(false);
        setAddressInfo({ title: '', address: '', city: 'KONYA', district: '', shippingPrice: 0, phoneNo: '' });
    };

    const menuItems = [

        {

            id: 'siparislerim',
            title: 'Siparişlerim',
            icon: <Package size={20} />
        },
        {

            id: 'adreslerim',
            title: 'Adres Bilgilerim',
            icon: <MapPin size={20} />
        },
        {

            id: 'guvenlik',
            title: 'Güvenlik ve Şifre',
            icon: <ShieldCheck size={20} />

        },

    ];

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

    if (loading) {

        return <div className="min-h-screen flex items-center justify-center font-semibold text-gray-500 italic">Siparişleriniz yükleniyor...</div>;
    };


    const logout = () => {
            
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate('/');
    }

    const KONYA_DATA = [

        { ilce: "Selçuklu", fiyat: 0 },
        { ilce: "Karatay", fiyat: 0 },
        { ilce: "Meram", fiyat: 0 },
        { ilce: "Akşehir", fiyat: 55 },
        { ilce: "Ereğli", fiyat: 60 },
        { ilce: "Beyşehir", fiyat: 45 },
        { ilce: "Seydişehir", fiyat: 45 },
        { ilce: "Cihanbeyli", fiyat: 50 },
        { ilce: "Kulu", fiyat: 50 },
        { ilce: "Çumra", fiyat: 35 },
        { ilce: "Ilgın", fiyat: 40 },
        { ilce: "Karapınar", fiyat: 45 },
        { ilce: "Sarayönü", fiyat: 35 },
        { ilce: "Bozkır", fiyat: 50 },
        { ilce: "Kadınhanı", fiyat: 40 }
    ];

    return (

        <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 bg-gray-50 min-h-screen">

            <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6 h-fit">

                <div className="flex flex-col items-center mb-8">

                    <div className="w-30 h-30 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mt-10 mb-3">

                        {user?.user ? <img className='rounded-full absolute w-40' src={user?.user?.avatar?.url || 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'} /> : <User className='absolute' size={40} />}
                        <div onClick={() => {}} className='relative text-gray-500 hover:text-gray-700 cursor-pointer'><CiCirclePlus size={50} /></div>

                    </div>

                    <h2 className="font-bold text-lg mt-10">{user?.user?.name}</h2>
                    <p className="text-sm text-gray-500">{user?.user?.email}</p>

                </div>

                <nav className="space-y-2">

                    {menuItems.map((item) => ( <div key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-rose-500 text-white' : 'hover:bg-gray-100 text-gray-700'} cursor-pointer`}>

                        <div className="flex items-center gap-3">{item.icon}<span className="font-medium">{item.title}</span></div><ChevronRight size={16} />

                    </div>))}

                    <div onClick={() => logout()} className="w-full flex items-center gap-3 p-3 rounded-lg text-rose-500 hover:bg-red-50 mt-4 transition-colors cursor-pointer"><LogOut size={20} /><span className="font-medium">Çıkış Yap</span></div>

                </nav>

            </div>

            <div className="flex-1 bg-white rounded-xl shadow-sm p-6 md:p-8">

            {activeTab === 'siparislerim' && ( <div>

                <h3 className="text-2xl font-bold mb-6">Son Siparişlerim</h3>

                <div className="space-y-3">

                    {loading ? ( <p className="italic text-gray-500">Siparişler yükleniyor...</p> ) : myOrders && myOrders.length > 0 ? (

                        [...myOrders].reverse().map((order) => {

                            const statusDetails = getStatusDetails(order.orderStatus);

                            return (

                                <div key={order._id} className="border rounded-lg p-4 flex items-center justify-between hover:border-rose-300 transition-all cursor-pointer" >
                                    <div className="flex gap-4 items-center">

                                        <img src={order.orderItems[0]?.image || "placeholder_url"} alt="ürün" className="w-16 h-16 bg-gray-100 rounded object-cover" />

                                        <div>

                                            <p className="font-bold text-sm text-gray-800">Sipariş No: #{order._id.slice(-5).toUpperCase()}</p>
                                            <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('tr-TR')} - {order.totalPrice.toLocaleString()} TL</p>
                                            <span className={`inline-block mt-2 px-2 py-1 ${statusDetails.bg} ${statusDetails.color} text-[10px] font-bold rounded uppercase`}>{order.orderStatus}</span>

                                        </div>

                                    </div>

                                    <div className="text-rose-500 text-sm font-semibold cursor-pointer">Detay</div>

                                </div>

                            );
                        }) ) : (

                    <div className="text-center py-10 border-2 border-dashed rounded-lg text-gray-400">Henüz bir siparişiniz bulunmuyor.</div>

                )}

            </div>

        </div>)}

        {activeTab === 'adreslerim' && ( <div>

            <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-bold">Adres Bilgilerim</h3>
                <div onClick={() => setShowAddrModal(true)} className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">+ Yeni Ekle</div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {user?.user?.addresses?.length > 0 ? (

                    user.user.addresses.map((addr, index) => (

                        <div key={index} className="border-2 border-rose-500 p-4 rounded-lg relative">

                            <span className="absolute top-2 right-2 bg-rose-100 text-rose-600 text-[10px] px-2 py-1 rounded font-bold">Varsayılan</span>
                            <p className="font-bold mb-1">{addr.title}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{addr.address} {addr.city}</p>
                            <div onClick={() => { if(window.confirm("Bu adresi silmek istediğinizden emin misiniz?")) {dispatch(deleteAddress(addr._id))}}} className='absolute bottom-1 right-1 text-gray-300 hover:text-red-500 transition cursor-pointer p-2'title="Adresi Sil" ><FaTrash size={14} /></div>

                        </div>

                    ))
                ) : (<div className='col-span-2 text-center py-10 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed'>Henüz kayıtlı bir adresiniz bulunmuyor.</div>)}

            </div>

        </div>)}

        {activeTab === 'guvenlik' && ( <div>

            <h3 className="text-2xl font-bold mb-6">Güvenlik Ayarları</h3>

            <form className="max-w-md space-y-4">

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label>
                    <input type="password" title="Mevcut Şifre" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none" />

                </div>

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                    <input type="password" title="Yeni Şifre" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none" />

                    </div>

                <div onClick={() => {}} className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer">Şifreyi Güncelle</div>

            </form>

        </div> )}

        </div>

            {showAddrModal && ( <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>

                <div className='bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl'>

                    <h2 className='text-2xl font-bold mb-6'>Yeni Adres Ekle</h2>

                    <form onSubmit={handleAddAddress} className='space-y-4'>

                        <input type="text" placeholder="Adres Başlığı (Örn: Evim, İş Yerim)" className='w-full p-3 border rounded-xl outline-rose-500' value={addressInfo.title} onChange={(e) => setAddressInfo({...addressInfo, title: e.target.value})} required />

                        <div className='grid grid-cols-2 gap-4'>

                            <div className="relative">

                                <label className="text-[10px] absolute left-3 top-1 text-gray-400 font-bold uppercase">Şehir</label>
                                <input type="text" className='w-full p-3 pt-5 border rounded-xl bg-gray-50 text-gray-500 font-bold outline-none cursor-not-allowed' value="KONYA" readOnly />

                            </div>

                            <div className="relative">

                                <label className="text-[10px] absolute left-3 top-1 text-rose-500 font-bold uppercase italic">İlçe Seçin</label>
                                <select className='w-full p-3 pt-5 border rounded-xl outline-rose-500 bg-white cursor-pointer font-semibold'value={addressInfo.district}
                                    onChange={(e) => {

                                        const selected = KONYA_DATA.find(i => i.ilce === e.target.value);
                                        setAddressInfo({
                                            ...addressInfo, 
                                            district: e.target.value,
                                            shippingPrice: selected ? selected.fiyat : 0
                                        });
                                    }}
                                    required>

                                    <option value="">Seçiniz...</option>

                                    {KONYA_DATA.map((item) => (
                                        <option key={item.ilce} value={item.ilce}>{item.ilce}</option>
                                    ))}

                                </select>

                            </div>

                        </div>

                        <input type="text" placeholder="Telefon (Örn: 05xx)" className='w-full p-3 border rounded-xl outline-rose-500' value={addressInfo.phoneNo} onChange={(e) => setAddressInfo({...addressInfo, phoneNo: e.target.value})} required />
                        <textarea placeholder="Mahalle, Sokak ve Bina detayları..." className='w-full p-3 border rounded-xl outline-rose-500 h-24 resize-none' value={addressInfo.address} onChange={(e) => setAddressInfo({...addressInfo, address: e.target.value})} required />

                        {addressInfo.district && (

                            <div className='p-3 bg-rose-50 border border-rose-100 rounded-xl flex justify-between items-center transition-all animate-pulse'>
                            <span className='text-[11px] font-bold text-rose-600 uppercase'>İlçe Kargo Ücreti:</span>
                            <span className='font-bold text-rose-700'>{addressInfo.shippingPrice === 0 ? "Ücretsiz" : `${addressInfo.shippingPrice} TL`}</span>

                        </div>

                        )}

                        <div className='flex gap-3 mt-6'>

                            <div onClick={() => setShowAddrModal(false)} className='flex-1 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition text-center cursor-pointer'>İptal</div>
                            <button type="submit" className='flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition shadow-lg shadow-rose-200'>Adresi Kaydet</button>

                        </div>

                    </form>

                </div>

            </div>)}

        </div>

    );
};

export default ProfilePage;