import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getKeyword, openOrderModalFunc } from '../redux/generalSlice';
import { logoutUser } from '../redux/userSlice';

import Input from '../components/Input';
import Modal from '../components/Modal';

import { GiShoppingCart } from "react-icons/gi";
import { CiHeart, CiUser, CiCircleRemove } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Header = ({ edit }) => {

    const [openMenu, setOpenMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [orderState, setOrderState] = useState({ orderCode: '', orderData: null, error: false, loading: false });

    const { user, isAuth } = useSelector(state => state.user);
    const { myOrders } = useSelector(state => state.orders);
    const { carts } = useSelector(state => state.cart);
    const { favorites } = useSelector(state => state.favorite);
    const { openOrderModal } = useSelector(state => state.general);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuItems = [

        ...(isAuth && user?.user?.role === 'user' ? [{ name: 'Profil', url: 'profile' }] : []),
        ...(isAuth && user?.user?.role === 'admin' ? [{ name: 'Admin Paneli', url: 'admin/dashboardadmin' }] : []),
        ...(!isAuth ? [{ name: 'Giriş Yap', url: 'auth' }] : []),
        ...(isAuth ? [{ name: 'Çıkış', url: 'logout' }] : []),
    ];

    const menuFunc = (item) => {

        if (item.name === 'Çıkış') {

            localStorage.removeItem("token");
            dispatch(logoutUser());
            navigate('/');

        } else {

            navigate(item.url);
        }

        setOpenMenu(false);
        setIsMobileMenuOpen(false);
    };

    const keywordFunction = () => {

        dispatch(getKeyword(keyword));
        setKeyword('');
        navigate('/products');
        setIsSearchOpen(false);
    };

    const orderFunc = () => {

        if(isAuth){

            navigate('/orders/me');
        }
        else{

            dispatch(openOrderModalFunc());
        }
    };

    const handleModalSearch = () => {
    if (!orderState.orderCode) {
        alert("Lütfen bir takip kodu giriniz!");
        return;
    }

    setOrderState(prev => ({ ...prev, loading: true, error: false }));

    setTimeout(() => {

        const cleanID = orderState.orderCode.trim().replace('#', '');
        const foundOrder = myOrders?.find(order => order._id === cleanID);

        if (foundOrder) {
            setOrderState(prev => ({
                ...prev,
                loading: false,
                orderData: foundOrder, 
                error: false
            }));
        } else {

            setOrderState(prev => ({ 
                ...prev, 
                loading: false, 
                error: true, 
                orderData: null 
            }));
        }
    }, 800);
};

    const getOrderFunc = () => {

        setOrderState({ orderCode: '', orderData: null, error: false, loading: false });
        return openOrderModalFunc();
    };

    const handleRequestRevision = (id) => {

        console.log("Revize isteği:", orderState.revisionMessage);
        alert("Revize talebiniz iletildi. Çiçekçimiz bilgilendirildi.");
    };

    const content = (

        <div className='my-2 space-y-6 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar pb-4'>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Sipariş Sorgulama</h3>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Takip Numarası (MongoDB ID) <span className="text-rose-500 text-lg">*</span></label>
                <div className="relative group">
                    <Input 
                        onChange={(e) => setOrderState({...orderState, orderCode: e.target.value, error: false})} 
                        name={'orderCode'} 
                        placeholder={'Örn: 65a2b...'} 
                        type={'text'} 
                        value={orderState.orderCode} 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 opacity-20 group-focus-within:opacity-100 transition-opacity">
                        <LiaShippingFastSolid size={20} />
                    </div>
                </div>
                <p className="text-[10px] text-gray-400 ml-1 italic">Siparişinizin ID'sini buraya yapıştırarak durumunu görebilirsiniz.</p>
            </div>
        </div>

        {/* Sonuç Alanı - orderState.orderData varsa gösterilir */}
        {orderState.orderData && (
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-green-500 rounded-full"></div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Sipariş Durumu</h3>
                    </div>
                    {/* Backend'den gelen status */}
                    <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase">
                        {orderState.orderData.orderStatus}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Sipariş Tarihi</span>
                        <span className="text-sm font-semibold text-gray-700">
                            {new Date(orderState.orderData.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                    </div>
                    <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Toplam Tutar</span>
                        <span className="text-sm font-semibold text-gray-700">{orderState.orderData.totalPrice} ₺</span>
                    </div>
                </div>

                {/* Ürün Listesi */}
                <div className="bg-rose-50/30 p-4 rounded-xl border border-dashed border-rose-200 space-y-3">
                    {orderState.orderData.orderItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <img src={item.image} className="w-10 h-10 object-cover rounded-lg border border-white shadow-sm" alt={item.name} />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-rose-400 uppercase">Ürün</span>
                                <span className="text-sm font-medium text-gray-800">{item.name} ({item.quantity} Adet)</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dinamik Stepper (Aşama Çizelgesi) */}
                <div className="flex items-center justify-between px-2 pt-2">
                    {/* Alındı */}
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${orderState.orderData.orderStatus !== 'Ödeme Bekliyor' ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-200'}`}></div>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Alındı</span>
                    </div>
                    <div className={`h-[2px] flex-1 mx-2 ${['Hazırlanıyor', 'Onay Bekliyor', 'Yolda', 'Teslim Edildi'].includes(orderState.orderData.orderStatus) ? 'bg-green-200' : 'bg-gray-100'}`}></div>
                    
                    {/* Hazırlanıyor / Onayda */}
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${['Hazırlanıyor', 'Onay Bekliyor'].includes(orderState.orderData.orderStatus) ? 'bg-rose-500 ring-4 ring-rose-100' : (['Yolda', 'Teslim Edildi'].includes(orderState.orderData.orderStatus) ? 'bg-green-500' : 'bg-gray-200')}`}></div>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Hazırlık</span>
                    </div>
                    <div className={`h-[2px] flex-1 mx-2 ${['Yolda', 'Teslim Edildi'].includes(orderState.orderData.orderStatus) ? 'bg-green-200' : 'bg-gray-100'}`}></div>

                    {/* Teslim */}
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${orderState.orderData.orderStatus === 'Teslim Edildi' ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-200'}`}></div>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Teslim</span>
                    </div>
                </div>
            </div>
        )}

        {/* Hata Mesajı */}
        {orderState.error && (
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 animate-pulse">
                <CiCircleRemove size={24} />
                <span className="text-xs font-bold tracking-tight">Sipariş bulunamadı. Lütfen ID'yi kontrol edin.</span>
            </div>
        )}
    </div>
    );

    return (

        <div className='relative w-full border-b-2 border-black'>

            <div className='py-3 px-4 md:px-7 flex items-center justify-between'>

                <div onClick={() => navigate('/')} className='cursor-pointer'><img className='w-36' src={"/MERNlogo2.png"}  alt="logo"/></div>

                <div className='hidden lg:flex flex-1 items-center justify-center px-10'>

                    <div className='w-full max-w-md flex items-center gap-2'>

                        <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder='Aradığınız çiçeği bulun...' className='w-full p-1 text-md outline-none border-2 border-gray-800 rounded-md' type="text" />
                        <IoSearchOutline onClick={keywordFunction} size={40} className='bg-gray-100 rounded-full p-2 cursor-pointer shrink-0' />

                    </div>

                </div>

                <div className='flex items-center gap-4'>
                    
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className='lg:hidden p-2'><IoSearchOutline size={30} /></button>

                    <div className='hidden lg:flex items-center gap-6'>

                        <div className='flex items-center gap-2 shrink-0'>

                            <TfiHeadphoneAlt size={30} />

                            <div className='flex flex-col'>

                                <h4 className='text-xs font-bold leading-tight'>Bizi Arayın</h4>
                                <a className='text-sm' href="tel:+905511335410">+90-551-133-54-10</a>

                            </div>

                        </div>

                        {!edit && <div onClick={() => orderFunc()} className='flex flex-col items-center cursor-pointer'>

                            <LiaShippingFastSolid size={30} />
                            <div className='text-xs'>Sipariş Takibi</div>

                        </div>}

                        {!edit && <div onClick={() => navigate('/favorite')} className='relative flex flex-col items-center cursor-pointer'>

                            <CiHeart size={30} />
                            <div className='text-xs'>Favoriler</div>
                            {favorites?.length > 0 && <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]'>{favorites?.length}</div>}

                        </div>}

                        <div className='relative flex flex-col items-center cursor-pointer'>

                            <div onClick={() => setOpenMenu(!openMenu)} className='flex flex-col items-center'>

                                {user?.user ? <img className='w-8 h-8 rounded-full border border-black' src={user?.user?.avatar?.url} alt="user" /> : <CiUser size={30} />}
                                <div className='text-xs'>Profil</div>

                            </div>

                            {openMenu && ( <div className='absolute right-0 top-full mt-2 w-[110px] shadow-lg border border-black z-50'>
                                {menuItems.map((item, i) => (
                                    <div onClick={() => menuFunc(item)} key={i} className='py-2 bg-white hover:bg-gray-100 border-b last:border-0 cursor-pointer text-sm text-center'>{item.name}</div>
                                ))}
                            </div> )}

                        </div>

                        {!edit && <div onClick={() => navigate('/cart')} className='relative flex flex-col items-center cursor-pointer'>

                            <GiShoppingCart size={30} />
                            <div className='text-xs'>Sepet</div>
                            {carts?.length > 0 && <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]'>{carts?.length}</div>}

                        </div>}

                    </div>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='lg:hidden p-2 border-2 border-black rounded'>{isMobileMenuOpen ? <IoCloseOutline size={30} /> : <IoMenuOutline size={30} />}</button>

                </div>

            </div>

            {isSearchOpen && ( <div className='lg:hidden p-4 bg-gray-50 border-t border-black flex items-center gap-2'>

                <input autoFocus value={keyword} onChange={e => setKeyword(e.target.value)} className='w-full p-2 outline-none border-2 border-gray-800 rounded-md' type="text" placeholder="Aradığınız çiçeği bulun..."/>
                <IoSearchOutline onClick={keywordFunction} size={40} className='bg-black text-white rounded-full p-2 cursor-pointer' />

            </div>)}

            {isMobileMenuOpen && ( <div className='lg:hidden absolute top-full left-0 w-full bg-white border-t-2 border-black shadow-xl z-40 p-5'>

                <div className='flex flex-col gap-6'>

                    <div className='flex items-center gap-4 p-2 bg-gray-50 rounded'>

                        <TfiHeadphoneAlt size={30} />

                        <div>

                            <h4 className='text-xs font-bold'>Bizi Arayın</h4>
                            <a className='text-sm' href="tel:+905511335410">+90-551-133-54-10</a>

                        </div>

                    </div>

                    <div className='grid grid-cols-2 gap-4'>

                        {!edit && <div onClick={() => {navigate('/orders/me'); setIsMobileMenuOpen(false);}} className='flex flex-col items-center p-2 border border-gray-200 rounded'>

                            <LiaShippingFastSolid size={30} />
                            <span className='text-xs'>Sipariş Takibi</span>

                        </div>}

                        {!edit && <div onClick={() => {navigate('/favorite'); setIsMobileMenuOpen(false);}} className='relative flex flex-col items-center p-2 border border-gray-200 rounded'>

                            <CiHeart size={30} />
                            <span className='text-xs'>Favoriler</span>
                            {carts?.length > 0 && <span className='bg-red-500 text-white text-[10px] px-1 rounded-full'>{carts.length}</span>}

                        </div>}

                        <div onClick={() => {navigate('/cart'); setIsMobileMenuOpen(false);}} className='relative flex flex-col items-center p-2 border border-gray-200 rounded'>

                            <GiShoppingCart size={30} />
                            <span className='text-xs'>Sepet</span>

                        </div>

                        <div onClick={() => setOpenMenu(!openMenu)} className='flex flex-col items-center p-2 border border-gray-200 rounded'>

                            <CiUser size={30} />
                            <span className='text-xs'>Hesabım</span>

                        </div>

                    </div>

                    {openMenu && (<div className='flex flex-col bg-gray-100 rounded overflow-hidden'>

                        {menuItems.map((item, i) => (

                            <div onClick={() => menuFunc(item)} key={i} className='p-3 border-b border-white text-center text-sm font-bold'>{item.name}</div>
                        ))}

                    </div>)}

                </div>

            </div> )}

            {openOrderModal && (<Modal title={'Sipariş Takibi'} content={content} btnName={orderState.loading ? 'Sorgulanıyor...' : 'Siparişi Sorgula'} onClick={handleModalSearch} func={getOrderFunc} />)}

        </div>

    );
};


export default Header;