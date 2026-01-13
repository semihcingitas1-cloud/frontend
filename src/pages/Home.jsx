import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeSlider from '../layout/HomeSlider';
import ProductCard from '../components/ProductCard';

import { getProducts } from '../redux/productSlice';

import { CiDeliveryTruck, CiSun, CiLock } from "react-icons/ci";

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {

        dispatch(getProducts({ keyword: "" }));
    }, [dispatch]);

    return (

        <div className="min-h-screen">

            <HomeSlider />

            <div className="bg-white py-12 border-b">

                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="flex flex-col items-center text-center group">

                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors"><CiDeliveryTruck size={35} className="text-rose-500" /></div>
                            <h3 className="text-lg font-bold text-gray-800">Hızlı Teslimat</h3>
                            <p className="text-sm text-gray-500 mt-1">İstanbul içi aynı gün güvenli teslimat.</p>

                        </div>
                        
                        <div className="flex flex-col items-center text-center group">

                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors"><CiSun size={35} className="text-rose-500" /></div>
                            <h3 className="text-lg font-bold text-gray-800">Daima Taze</h3>
                            <p className="text-sm text-gray-500 mt-1">Doğrudan mezattan, günlük taze çiçekler.</p>

                        </div>

                        <div className="flex flex-col items-center text-center group">

                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors"><CiLock size={35} className="text-rose-500" /></div>
                            <h3 className="text-lg font-bold text-gray-800">Güvenli Ödeme</h3>
                            <p className="text-sm text-gray-500 mt-1">256-bit SSL korumalı güvenli alışveriş.</p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="container mx-auto px-4 py-16">

                <div className="flex flex-col items-center mb-12">

                    <span className="text-rose-500 font-bold tracking-widest uppercase text-xs mb-2">Sizin İçin Seçtiklerimiz</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 text-center">En Popüler Aranjmanlar</h2>
                    <div className="w-24 h-1 bg-rose-400 mt-4 rounded-full"></div>

                </div>

                {loading ? ( <div className='w-full py-20 flex flex-col items-center justify-center gap-4'>

                    <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-rose-500 animate-spin"></div>
                    <p className="text-rose-500 font-medium italic">Çiçekler hazırlanıyor...</p>

                    </div> ) : ( <div>

                    {products?.products && products.products.length > 0 ? ( <div className='flex items-center justify-center gap-6 md:gap-10 flex-wrap'>

                        {products.products.slice(0, 10).map((product, i) => (<ProductCard product={product} key={i} />))}
                        </div>
                        ) : ( <div className="text-center py-20">
                        <p className="text-gray-500">Henüz ürün bulunamadı.</p>

                    </div>)}

                </div>)}

            </div>

            <section className="relative py-20 bg-rose-500 overflow-hidden">

                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">

                   <div className="text-[200px]">🌸</div>

                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">

                    <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-6">Özel Günleri Ölümsüzleştirin</h2>

                    <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">

                        Flora Haven'ın eşsiz tasarımlarıyla sevdiklerinizin yüzünde bir gülümseme oluşturun. 
                        Şimdi sipariş verin, tazeliği adrese ulaştıralım.

                    </p>

                    <button onClick={() => navigate("/products")} className="bg-white text-rose-500 px-10 py-4 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95">Tüm Ürünleri Keşfet</button>

                </div>

            </section>

        </div>

    );
};

export default Home;
