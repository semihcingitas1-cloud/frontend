import React, { useState, useMemo } from 'react';
import { TbWallpaper } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import { GiShoppingCart, GiRibbonMedal } from 'react-icons/gi';
import { PiFlowerLotusLight } from "react-icons/pi";
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FLOWERS = 15;

const FlowerBuilder = () => {

    const flowerAssets = [
        {
          id: 'rose-red',
          name: 'Kırmızı Gül',
          price: 120,
          img: 'https://pngimg.com/uploads/rose/rose_PNG639.png'
        },
        {
          id: 'rose-pink',
          name: 'Pembe Gül',
          price: 140,
          img: 'https://pngimg.com/uploads/rose/rose_PNG650.png'
        },
        {
          id: 'rose-white',
          name: 'Beyaz Gül',
          price: 70,
          img: 'https://www.pngimg.com/uploads/white_roses/white_roses_PNG2785.png'
        },
        {
          id: 'leaf',
          name: 'Yeşil Yaprak',
          price: 50,
          img: 'https://www.pngimg.com/uploads/green_leaves/green_leaves_PNG3654.png'
        }
    ];

  const wrappingAssets = [
    { id: 'kraft', name: 'Kraft Kağıt', price: 20, img: 'eyJpZCI6Im1fNjk3Mjc0NzdmY2E0ODE5MWE0YzdhY2ZmNDkyZmI2ODM6ZmlsZV8wMDAwMDAwMDI5NjA3MWY0YmI5YTY1ZWExNWRlOWM2ZiIsInRzIjoiMjA0NzUiLCJwIjoicHlpIiwiY2lkIjoiMSIsInNpZyI6ImFiMzE4ZGQ2NDI2YWNiNmRhZjYzMGE5NDMyMmRiYjg2OGUyYjNiY2I0ZjljMDZhOGQwOGMyZGJlNGU5NTlmODYiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsLCJjcyI6bnVsbCwiY3AiOm51bGwsIm1hIjpudWxsfQ' },
    { id: 'pink-paper', name: 'Pembe Kağıt', price: 25, img: 'https://www.pngarts.com/files/10/Pink-Tissue-Paper-Background-PNG-Image.png' },
    { id: 'black-paper', name: 'Siyah Mat', price: 30, img: 'https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNjk3Mjc5NTdjMTk4ODE5MTkyYWIwNTc0YzUzNWQ5YTg6ZmlsZV8wMDAwMDAwMGM2MDQ3MWY0YjdmZWVkMzU5Y2UwZTcwZiIsInRzIjoiMjA0NzUiLCJwIjoicHlpIiwiY2lkIjoiMSIsInNpZyI6IjkzZDNkOWI4YTBjZGRkNWUxNjQ3YTQ1ZTFhMTY2YjczZDJhMjBhYTFkYjlkZDg0MjhmYTRkNzEyNjYxM2JiM2MiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsLCJjcyI6bnVsbCwiY3AiOm51bGwsIm1hIjpudWxsfQ==' },
  ];

  const ribbonAssets = [
    { id: 'red-ribbon', name: 'Kırmızı Kurdele', price: 10, img: 'https://pngimg.com/uploads/ribbon/small/ribbon_PNG1538.png' },
    { id: 'gold-ribbon', name: 'Altın Kurdele', price: 15, img: 'https://www.pngall.com/wp-content/uploads/2016/04/Ribbon-Free-Download-PNG.png' },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [wrap, setWrap] = useState(wrappingAssets[0]);
  const [ribbon, setRibbon] = useState(null);

  const addItem = (item) => {
    if (selectedItems.length >= MAX_FLOWERS) return;

    let newLeft;
    let isOverlapping;
    let attempts = 0;

    const usedPositions = selectedItems.map(i => i.left);

    do {
      newLeft = Math.floor(Math.random() * 40) + 30;
      isOverlapping = usedPositions.some(pos => Math.abs(pos - newLeft) < 8);
      attempts++;
    } while (isOverlapping && attempts < 15);

    const maxZ = Math.max(0, ...selectedItems.map(i => i.zIndex || 0));

    const newItem = {
      ...item,
      uniqueId: crypto.randomUUID(),
      left: newLeft,
      top: Math.floor(Math.random() * 15) + 28,
      rotation: Math.floor(Math.random() * 50) - 25,
      scale: 0.9 + Math.random() * 0.3,
      zIndex: maxZ + 1
    };

    setSelectedItems(prev => [...prev, newItem]);
  };

  const removeItem = (uniqueId) => {
    setSelectedItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const baseTotal = useMemo(() => {
    return selectedItems.reduce((acc, curr) => acc + curr.price, 0)
      + (wrap?.price || 0)
      + (ribbon?.price || 0);
  }, [selectedItems, wrap, ribbon]);

  const hasDiscount = selectedItems.length >= 7;
  const totalAmount = hasDiscount ? Math.floor(baseTotal * 0.9) : baseTotal;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">

      <div className="bg-white border-b py-8 mb-8 shadow-sm text-center">
        <span className="text-rose-500 font-bold tracking-widest uppercase text-xs">Atölye</span>
        <h1 className="text-3xl font-serif font-bold text-gray-800">Buketini Tasarla</h1>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* CANVAS */}
          <div className="lg:col-span-7 bg-white rounded-[3rem] shadow-2xl p-8 flex flex-col items-center justify-center min-h-[650px] relative overflow-hidden border border-rose-50">

            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')]"></div>

            <div className="relative w-full h-[550px] flex items-center justify-center">

              {wrap && (
                <motion.img
                  key={wrap.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.15, opacity: 1 }}
                  src={wrap.img}
                  className="absolute w-[500px] z-0 drop-shadow-2xl select-none"
                  alt=""
                />
              )}

              <div className="relative w-full h-full z-10">
                <AnimatePresence>
                  {selectedItems.map(item => (
                    <motion.div
                      key={item.uniqueId}
                      initial={{ y: -80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1, zIndex: 100 }}
                      className="absolute group -translate-x-1/2"
                      style={{
                        top: `${item.top}%`,
                        left: `${item.left}%`,
                        transform: `translateX(-50%) rotate(${item.rotation}deg) scale(${item.scale})`,
                        zIndex: item.zIndex
                      }}
                    >
                      <img src={item.img} className="w-32 md:w-40 drop-shadow-xl select-none" alt="" />

                      <button
                        onClick={() => removeItem(item.uniqueId)}
                        className="absolute -top-2 -right-2 bg-gray-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        title="Kaldır"
                      >
                        <CiTrash size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {ribbon && (
                <motion.img
                  initial={{ y: 50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  src={ribbon.img}
                  className="absolute bottom-16 w-56 z-50 select-none"
                  alt=""
                />
              )}

              {selectedItems.length === 0 && (
                <div className="absolute text-rose-200 font-serif italic animate-pulse text-lg">
                  Çiçek seçerek buketi oluşturmaya başla...
                </div>
              )}

            </div>

          </div>

          {/* SIDE */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                <PiFlowerLotusLight className="text-rose-400" /> Çiçekler
              </h3>

              <p className="text-[11px] text-gray-400 mb-3">
                {selectedItems.length} / {MAX_FLOWERS} çiçek seçildi
              </p>

              <div className="grid grid-cols-2 gap-3">
                {flowerAssets.map(f => (
                  <button
                    key={f.id}
                    onClick={() => addItem(f)}
                    disabled={selectedItems.length >= MAX_FLOWERS}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-2xl hover:bg-rose-50 transition disabled:opacity-40"
                  >
                    <img src={f.img} className="w-12 h-12 object-contain" alt="" />
                    <div className="text-left">
                      <p className="text-xs font-bold">{f.name}</p>
                      <p className="text-[10px] text-rose-500">{f.price} ₺</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                <TbWallpaper className="text-blue-400" /> Ambalaj
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {wrappingAssets.map(w => (
                  <button
                    key={w.id}
                    onClick={() => setWrap(w)}
                    className={`p-2 rounded-2xl border-2 ${wrap?.id === w.id ? 'border-rose-500 bg-rose-50' : 'border-gray-50'}`}
                  >
                    <img src={w.img} className="h-10 w-full object-cover rounded mb-1" alt="" />
                    <p className="text-[10px] font-bold text-center">{w.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                <GiRibbonMedal className="text-yellow-500" /> Kurdele
              </h3>

              <div className="flex gap-4">
                {ribbonAssets.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRibbon(r)}
                    className={`p-2 rounded-2xl border-2 ${ribbon?.id === r.id ? 'border-rose-500 bg-rose-50' : 'border-white'}`}
                  >
                    <img src={r.img} className="w-12 h-8 object-contain" alt="" />
                    <p className="text-[10px] font-bold mt-1">{r.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-rose-500 rounded-[2rem] p-8 text-white shadow-xl">

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-rose-100">Toplam</p>
                  <p className="text-4xl font-serif font-bold">{totalAmount} ₺</p>
                  {hasDiscount && (
                    <p className="text-[11px] text-rose-100">🎁 Özel tasarım indirimi uygulandı</p>
                  )}
                </div>

                <button
                  onClick={() => { setSelectedItems([]); setRibbon(null); }}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30"
                >
                  <CiTrash size={24} />
                </button>
              </div>

              <button className="w-full bg-white text-rose-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                <GiShoppingCart size={24} /> Sepete Ekle
              </button>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default FlowerBuilder;
