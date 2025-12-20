import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { logoutUser } from '../redux/userSlice';

import { CiDollar, CiBoxes, CiMail, CiSettings, CiLogout } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { PiSlideshow } from "react-icons/pi";

const AdminPanel = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuItems = [

        {
            name: 'Dashboard',
            path: '/admin/dashboardadmin',
            icon: <CiDollar size={25} />
        },
        {
            name: 'Siparişler',
            path: '/admin/ordersadmin',
            icon: <GiShoppingCart size={25} />
        },
        {
            name: 'Mesajlar',
            path: '/admin/messagesadmin',
            icon: <CiMail size={25} />
        },
        {
            name: 'Slider Yönetimi',
            path: '/admin/slideradmin',
            icon: <PiSlideshow size={25} />
        },
        {
            name: 'Ürün Yönetimi',
            path: '/admin/productsadmin',
            icon: <CiBoxes size={25} />
        },
        {
            name: 'Ayarlar',
            path: '/admin/settingsadmin',
            icon: <CiSettings size={25} />
        },
    ];

    const logout = () => {

        
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate('/');
    }

    return (

        <div className="min-w-72 bg-slate-800 text-white flex flex-col h-full sticky top-10">

            <div className="p-6 text-2xl font-bold border-b border-slate-400 text-rose-500">

                Gala Çiçek <span className="text-white text-sm block font-normal">Admin Panel</span>

            </div>
                
            <nav className="flex-1 p-4 space-y-2">

                {menuItems.map((item) => (

                    <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${location.pathname === item.path ? 'bg-rose-500 text-white' : 'hover:bg-slate-600 text-gray-400'}`}>{item.icon} {item.name}</Link>
                ))}

            </nav>

            <div className="mt-20 p-4 border-t border-slate-800">

                <div onClick={() => {}} className="flex items-center gap-3 text-gray-400 hover:text-white p-2 cursor-pointer">

                    <CiLogout size={25} />
                    <div onClick={() => logout()}>Çıkış Yap</div>

                </div>

            </div>

        </div>

    );
};

export default AdminPanel;