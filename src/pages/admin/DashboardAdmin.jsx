import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';

import { getAllOrders } from '../../redux/orderSlice';

import AdminPanel from '../../layout/AdminPanel';

import { FaShoppingCart, FaDollarSign, FaUsers, FaBoxOpen, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DashboardAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orders, loading } = useSelector(state => state.orders);

    const stats = [

        { id: 1, title: 'Toplam Satış', value: '₺45.250', icon: <FaDollarSign />, color: 'bg-blue-500', trend: '+12%', up: true },
        { id: 2, title: 'Siparişler', value: '128', icon: <FaShoppingCart />, color: 'bg-amber-500', trend: '+5%', up: true },
        { id: 3, title: 'Müşteriler', value: '842', icon: <FaUsers />, color: 'bg-emerald-500', trend: '+18%', up: true },
        { id: 4, title: 'Ürün Sayısı', value: '45', icon: <FaBoxOpen />, color: 'bg-rose-500', trend: '-2%', up: false },
    ];

    useEffect(() => {

        dispatch(getAllOrders());
    }, [dispatch]);

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

        <div className='flex gap-7'>

            <AdminPanel />

            <div className='py-10'>

                <div className="mb-8 p-3 border-b-2">

                    <h1 className="text-2xl font-bold text-gray-800">Genel Bakış</h1>
                    <p className="text-gray-500">Mağazanızın bugünkü performans verileri.</p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    {stats.map((stat) => ( <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1"><CountUp start={0} end={parseFloat(stat.value.toString().replace(/[^0-9.-]+/g, ""))} duration={2.5} separator="." decimals={stat.value.toString().includes(',') ? 2 : 0} suffix={stat.value.toString().includes('₺') ? ' ₺' : ''} prefix={stat.value.toString().includes('$') ? '$' : ''} /></h3>

                            <div className={`flex items-center gap-1 text-xs mt-2 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>

                                {stat.up ? <FaArrowUp /> : <FaArrowDown />}
                                <span>{stat.trend} Geçen aya göre</span>

                            </div>

                        </div>

                        <div className={`${stat.color} p-4 rounded-xl text-white text-2xl`}>

                            {stat.icon}

                        </div>

                    </div>))}

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">

                            <h3 className="font-bold text-gray-800">Son Siparişler</h3>
                            <div onClick={() => navigate('/admin/ordersadmin')} className="text-rose-500 text-sm font-semibold hover:underline cursor-pointer">Tümünü Gör</div>

                        </div>

                        
                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-medium">

                                    <tr>

                                        <th className="px-6 py-4">Sipariş ID</th>
                                        <th className="px-6 py-4">Müşteri</th>
                                        <th className="px-6 py-4">Tutar</th>
                                        <th className="px-6 py-4">Durum</th>
                                        <th className="px-6 py-4">Zaman</th>

                                    </tr>

                                </thead>

                                {loading ? ( <div className="flex justify-center py-20 italic text-gray-500 text-lg">Sipariş verileri yükleniyor...</div> ) : ( <tbody className="text-sm text-gray-600 divide-y divide-gray-50">

                                    {[...orders].reverse().slice(0, 5).map((order) => ( <tr key={order._id} className="hover:bg-gray-50 transition-colors">

                                        <td className="px-6 py-4 font-medium text-gray-800">#{order._id.slice(-6).toUpperCase()}</td>
                                        <td className="px-6 py-4">{order.user?.name || 'Misafir'}</td>
                                        <td className="px-6 py-4 font-bold">{order.totalPrice.toLocaleString()} ₺</td>
                                        <td className="px-6 py-4">

                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(order.orderStatus)}`}>{order.orderStatus}</span>

                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</td>

                                    </tr>))}

                                </tbody>)}

                            </table>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                        <h3 className="font-bold text-gray-800 mb-6 text-center">En Çok Satan Kategoriler</h3>

                        <div className="space-y-4">

                            {

                                [{

                                    name: 'Gül Aranjmanları',
                                    perc: 65,
                                    color: 'bg-rose-500'

                                },
                                {

                                    name: 'Saksı Çiçekleri',
                                    perc: 45,
                                    color: 'bg-emerald-500'

                                },
                                {
                                    name: 'Orkideler',
                                    perc: 30,
                                    color: 'bg-blue-500'

                                },
                                {

                                    name: 'Vazo Çiçekleri',
                                    perc: 20,
                                    color: 'bg-amber-500'

                                }].map((cat, i) => ( <div key={i}>

                                    <div className="flex justify-between text-sm mb-1">

                                        <span className="text-gray-600">{cat.name}</span>
                                        <span className="font-bold">%{cat.perc}</span>

                                    </div>

                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">

                                        <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.perc}%` }}></div>

                                    </div>

                                </div>))

                            }

                        </div>

                        <div className="mt-10 p-4 bg-rose-50 rounded-xl border border-rose-100 text-center">

                            <p className="text-rose-600 text-sm font-medium">Düşük Stok Uyarısı!</p>
                            <p className="text-xs text-rose-400 mt-1">3 ürününüzün stoğu 5'in altına düştü.</p>
                            <div onClick={() => navigate('/admin/productsadmin')} className="mt-3 bg-rose-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-rose-600">Ürünleri Kontrol Et</div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DashboardAdmin;