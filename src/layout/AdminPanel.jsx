import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userSlice';

import { CiDollar, CiBoxes, CiChat1, CiMail, CiSettings, CiLogout } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { PiSlideshow } from "react-icons/pi";
import { ImBlog } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";

const AdminPanel = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboardadmin', icon: <CiDollar size={25} /> },
        { name: 'Siparişler', path: '/admin/ordersadmin', icon: <GiShoppingCart size={25} /> },
        { name: 'Mesajlar', path: '/admin/messagesadmin', icon: <CiChat1 size={25} /> },
        { name: 'Bloglar', path: '/admin/blogsadmin', icon: <ImBlog size={25} /> },
        { name: 'Slider', path: '/admin/slideradmin', icon: <PiSlideshow size={25} /> },
        { name: 'Ürünler', path: '/admin/productsadmin', icon: <CiBoxes size={25} /> },
        { name: 'Mail & SMS', path: '/admin/mailadmin', icon: <CiMail size={25} /> },
        { name: 'Analizler', path: '/admin/analyticsadmin', icon: <TbReportAnalytics size={25} /> },
        { name: 'Ayarlar', path: '/admin/settingsadmin', icon: <CiSettings size={25} /> },
    ];

    const logout = () => {

        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate('/');
    };

    return (

        <div>

            <div className="hidden lg:flex flex-col min-w-72 bg-slate-800 text-white sticky top-11 border-r border-slate-700">

                <div className="py-3 px-5 text-2xl font-bold border-b border-slate-700 text-rose-500">

                    Flora HAVEN <span className="text-white text-sm block font-normal">Admin Panel</span>

                </div>
                
                <nav className="flex-1 p-4 max-h-[calc(100vh)/3] space-y-1 overflow-y-auto">

                    {menuItems.map((item) => ( <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${location.pathname === item.path ? 'bg-rose-500 text-white' : 'hover:bg-slate-700 text-gray-400'}`}>

                        {item.icon} {item.name}
                    </Link>))}

                </nav>

                <div className="p-4 border-t border-slate-700">

                    <div onClick={logout} className="flex items-center gap-3 text-gray-400 hover:text-white p-2 cursor-pointer transition-colors">

                        <CiLogout size={25} />
                        <span>Çıkış Yap</span>

                    </div>

                </div>

            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 z-50 flex items-center h-16 shadow-2xl">

                <nav className="flex-1 flex overflow-x-auto no-scrollbar scroll-smooth px-2 items-center h-full">

                    {menuItems.map((item) => ( <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center min-w-[75px] h-full transition-all ${location.pathname === item.path ? 'text-rose-500' : 'text-gray-400'}`}>

                        <span className={`${location.pathname === item.path ? 'scale-110' : ''}`}>{item.icon}</span>
                        <span className="text-[10px] mt-1 whitespace-nowrap">{item.name}</span>
                    </Link>))}

                </nav>

                <div onClick={logout} className="flex flex-col items-center justify-center w-20 h-full bg-slate-800 border-l border-slate-700 text-rose-400 active:bg-slate-700 transition-colors">

                    <CiLogout size={24} />
                    <span className="text-[10px] mt-1 font-bold">Çıkış</span>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />

        </div>
    );
};

export default AdminPanel;