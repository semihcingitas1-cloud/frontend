import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import { CiHeart, CiUser } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { getKeyword } from '../redux/generalSlice';
import { logoutUser } from '../redux/userSlice';
import Favorites from '../pages/Favorite';

const Header = ({ edit }) => {

    const [openMenu, setOpenMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const { user, isAuth } = useSelector(state => state.user);
    const { carts } = useSelector(state => state.cart);
    const { favorites } = useSelector(state => state.favorite);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const menuItems = [


        ...(isAuth ? [{ name: 'Profil', url: 'profile' }] : []),
        ...(isAuth && user?.user?.role === 'admin' ? [{ name: 'Dashboard', url: 'admin/dashboardadmin' }] : []),
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

                        {!edit && <div onClick={() => navigate('/orders/me')} className='flex flex-col items-center cursor-pointer'>

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
                            {openMenu && (
                                <div className='absolute right-0 top-full mt-2 w-[110px] shadow-lg border border-black z-50'>
                                    {menuItems.map((item, i) => (
                                        <div onClick={() => menuFunc(item)} key={i} className='py-2 bg-white hover:bg-gray-100 border-b last:border-0 cursor-pointer text-sm text-center'>{item.name}</div>
                                    ))}
                                </div>
                            )}
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

        </div>

    );
};


export default Header;

