import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeSlider from '../layout/HomeSlider';
import ProductCard from '../components/ProductCard';

import { getProducts } from '../redux/productSlice';

import { CiDeliveryTruck, CiLock, CiTrash } from "react-icons/ci";
import { PiLeafLight, PiFlowerLotusLight } from "react-icons/pi";

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {

        dispatch(getProducts({ keyword: "" }));
    }, [dispatch]);

    const wrappingAssets = [
        { id: 'kraft', name: 'Kraft Kağıt', price: 20, img: 'https://image.shutterstock.com/image-photo/brown-kraft-paper-background-texture-260nw-2523038733.jpg' },
        { id: 'pink-paper', name: 'Pembe Kağıt', price: 25, img: 'https://www.pngarts.com/files/10/Pink-Tissue-Paper-Background-PNG-Image.png' },
        { id: 'black-paper', name: 'Siyah Mat', price: 30, img: 'https://i.ibb.co/7Xv8zS0/black-wrap.png' },
    ];

    const [selectedItems, setSelectedItems] = useState([]);
    const [wrap, setWrap] = useState(wrappingAssets[0]);
    const [ribbon, setRibbon] = useState(null);

    const addItem = (item) => {

        let newLeft;
        let isOverlapping;
        let attempts = 0;

        do {
            newLeft = Math.floor(Math.random() * 40) + 30; 
            isOverlapping = selectedItems.some(el => Math.abs(el.left - newLeft) < 8);
            attempts++;
        } while (isOverlapping && attempts < 15);

        const newItem = {
            ...item,
            uniqueId: Date.now(),
            left: newLeft,
            top: Math.floor(Math.random() * 15) + 28,
            rotation: Math.floor(Math.random() * 50) - 25,
            scale: 0.9 + Math.random() * 0.3,
            zIndex: selectedItems.length + 10
        };
        setSelectedItems([...selectedItems, newItem]);
    };

    const removeItem = (uniqueId) => {

        setSelectedItems(selectedItems.filter(item => item.uniqueId !== uniqueId));
    };

    const totalAmount = selectedItems.reduce((acc, curr) => acc + curr.price, 0) + (wrap?.price || 0) + (ribbon?.price || 0);

    const popularProducts = useMemo(() => {

        if (!products?.products) return [];
        return [...products.products].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

    }, [products]);

    const latestProducts = useMemo(() => {

        if (!products?.products) return [];
        return [...products.products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    }, [products]);

    return (

        <div className="min-h-screen">

            <HomeSlider />

            <div className="bg-white py-12 border-b">

                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="flex flex-col items-center text-center group">

                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors"><CiDeliveryTruck size={35} className="text-rose-500" /></div>
                            <h3 className="text-lg font-bold text-gray-800">Hızlı Teslimat</h3>
                            <p className="text-sm text-gray-500 mt-1">Konya içi aynı gün güvenli teslimat.</p>

                        </div>

                        <div className="flex flex-col items-center text-center group">

                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors"><PiLeafLight size={35} className="text-rose-500" /></div>
                            <h3 className="text-lg font-bold text-gray-800">Daima Taze</h3>
                            <p className="text-sm text-gray-500 mt-1">Günlük en canlı ve taze çiçekler.</p>

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

                    {popularProducts && popularProducts.length > 0 ? ( <div className='flex items-center justify-center gap-6 md:gap-10 flex-wrap'>

                        {popularProducts.map((product, i) => (<ProductCard product={product} key={i} />))}
                        </div>
                        ) : ( <div className="text-center py-20">
                        <p className="text-gray-500">Henüz ürün bulunamadı.</p>

                    </div>)}

                </div>)}

            </div>

            <div className="container mx-auto px-4 py-16">

                <div className="flex flex-col items-center mb-12">

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 text-center">En Yeni Aranjmanlar</h2>
                    <div className="w-24 h-1 bg-rose-400 mt-4 rounded-full"></div>

                </div>

                {loading ? ( <div className='w-full py-20 flex flex-col items-center justify-center gap-4'>

                    <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-rose-500 animate-spin"></div>
                    <p className="text-rose-500 font-medium italic">Çiçekler hazırlanıyor...</p>

                    </div> ) : ( <div>

                    {latestProducts && latestProducts.length > 0 ? ( <div className='flex items-center justify-center gap-6 md:gap-10 flex-wrap'>

                        {latestProducts.slice(0, 5).map((product, i) => (<ProductCard product={product} key={i} />))}
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