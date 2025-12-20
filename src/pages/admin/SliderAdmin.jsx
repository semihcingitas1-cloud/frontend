import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlider, getAllSliders, deleteSlider, resetSliderStatus } from '../../redux/sliderSlice';

import AdminPanel from '../../layout/AdminPanel';

import { FaPlus, FaTrash, FaLink, FaImage } from 'react-icons/fa';

const SliderAdmin = () => {

    const dispatch = useDispatch();
    const { success, sliders, error } = useSelector(state => state.slider);
    const [images, setImages] = useState([]);
    const [link, setLink] = useState('');

    useEffect(() => {

        dispatch(getAllSliders());

        if (success) {

            alert("Slider başarıyla eklendi!");
            dispatch(resetSliderStatus());
            setLink(''); // Formu temizle
            setImages([]);
        }
    }, [dispatch, success]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (images.length === 0) return alert("Lütfen bir resim seçin");

        dispatch(createSlider({

            title: "Kampanya",
            link: link,
            image: images[0]
        }));
    };

    const deleteHandler = (id) => {

        if (window.confirm("Bu sliderı silmek istediğinize emin misiniz?")) {

            dispatch(deleteSlider(id));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <AdminPanel />
            
            <div className='flex-1 p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                    <FaImage className='text-rose-500' /> Slider Yönetimi
                </h2>

                {/* 1. YENİ SLIDER EKLEME FORMU */}
                <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8'>
                    <h3 className='font-semibold mb-4 text-gray-700'>Yeni Kampanya Görseli Ekle</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        
                        {/* Resim Seçme Alanı */}
                        <div className='space-y-3'>
                            <label className='block text-sm font-medium text-gray-600'>Slider Görseli</label>
                            <div className='relative h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-rose-400 transition-colors bg-gray-50 overflow-hidden'>
                                {images.length > 0 ? (
                                    <img src={images[0]} alt="Önizleme" className='w-full h-full object-cover' />
                                ) : (
                                    <>
                                        <FaPlus className='text-gray-400 text-2xl mb-2' />
                                        <span className='text-xs text-gray-400'>Görsel Seçmek İçin Tıklayın</span>
                                    </>
                                )}
                                <input 
                                    type="file" 
                                    onChange={handleImageChange}
                                    className='absolute inset-0 opacity-0 cursor-pointer' 
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        {/* Link ve Kaydet Butonu */}
                        <div className='flex flex-col justify-between'>
                            <div className='space-y-3'>
                                <label className='block text-sm font-medium text-gray-600'>Yönlendirme Linki (URL)</label>
                                <div className='flex items-center border border-gray-200 rounded-xl px-3 bg-white'>
                                    <FaLink className='text-gray-400' />
                                    <input 
                                        type="text" 
                                        placeholder="/kategori/elektronik veya https://..." 
                                        className='w-full p-3 outline-none text-sm'
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>
                                <p className='text-[10px] text-gray-400 italic'>* Kullanıcı görsele tıkladığında bu sayfaya yönlendirilir.</p>
                            </div>

                            <button onClick={handleSubmit} className='w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 mt-4'>
                                <FaPlus /> Sliderı Yayınla
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. MEVCUT SLIDERLAR LİSTESİ */}
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className='p-4 border-b border-gray-50 bg-gray-50/50'>
                        <h3 className='font-semibold text-gray-700'>Aktif Sliderlar</h3>
                    </div>
                    
                    <div className='divide-y divide-gray-100'>
                        {/* Örnek Satır - Veri geldiğinde map ile döneceğiz */}
                        <div className='p-4 flex items-center justify-between hover:bg-gray-50 transition'>
                            <div className='flex items-center gap-4'>
                                <img 
                                    src="https://via.placeholder.com/1200x400" 
                                    alt="Slider" 
                                    className='w-24 h-12 object-cover rounded-lg border border-gray-200'
                                />
                                <div>
                                    <p className='text-sm font-medium text-gray-800'>Kış Sezonu Kampanyası</p>
                                    <p className='text-xs text-gray-400 flex items-center gap-1'><FaLink size={10}/> /kategori/kis-sezonu</p>
                                </div>
                            </div>
                            
                            <button onClick={deleteHandler} className='p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all'>
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderAdmin;