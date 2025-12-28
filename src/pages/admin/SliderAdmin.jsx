import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlider, getAllSliders, deleteSlider, resetSliderStatus, updateSliderStatus } from '../../redux/sliderSlice';
import AdminPanel from '../../layout/AdminPanel';
import { FaPlus, FaTrash, FaLink, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';

const SliderAdmin = () => {
    const dispatch = useDispatch();
    // state.slider kısmının store.js ile aynı isimde olduğundan emin ol
    const { success, sliders } = useSelector(state => state.slider);
    const [images, setImages] = useState([]);
    const [link, setLink] = useState('');

    useEffect(() => {
        dispatch(getAllSliders());
        if (success) {
            // Sadece yeni ekleme başarılı olduğunda uyarı ver ve temizle
            // Not: Status güncellemelerinde de success true dönüyorsa 
            // alert'i sadece createSlider aksiyonuna bağlamak daha iyidir.
            dispatch(resetSliderStatus());
            setLink('');
            setImages([]);
        }
    }, [dispatch, success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (images.length === 0) return alert("Lütfen bir resim seçin");
        dispatch(createSlider({ title: "Kampanya", link: link, image: images[0] }));
    };

    const deleteHandler = (id) => {
        if (window.confirm("Bu sliderı silmek istediğinize emin misiniz?")) {
            dispatch(deleteSlider(id));
        }
    };

    // BURASI DÜZELTİLDİ: !isActive gönderiliyor
    const toggleStatusHandler = (id, isActive) => {
        dispatch(updateSliderStatus({ id, isActive: !isActive })); 
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

    // Filtreleme: Sliders dizisinin varlığını kontrol ederek güvenli filtreleme yapıyoruz
    const activeSliders = sliders?.filter(s => s.isActive === true) || [];
    const passiveSliders = sliders?.filter(s => s.isActive === false) || [];

    const SliderRow = ({ slider }) => (
        <div key={slider._id} className={`p-4 flex items-center justify-between hover:bg-gray-50 transition ${!slider.isActive ? 'bg-gray-50/50' : ''}`}>
            <div className='flex items-center gap-4'>
                <div className='relative'>
                    <img 
                        src={slider.image?.url} 
                        alt={slider.title} 
                        className={`w-24 h-12 object-cover rounded-lg border ${!slider.isActive ? 'grayscale opacity-60' : 'border-gray-200 shadow-sm'}`}
                    />
                    {!slider.isActive && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <FaEyeSlash className='text-gray-500 bg-white/80 rounded-full p-0.5' size={16}/>
                        </div>
                    )}
                </div>
                <div>
                    <p className={`text-sm font-semibold ${!slider.isActive ? 'text-gray-400' : 'text-gray-800'}`}>
                        {slider.title || "Slider Görseli"}
                    </p>
                    <p className='text-[10px] text-gray-400 flex items-center gap-1'>
                        <FaLink size={10}/> {slider.link || "Link belirtilmedi"}
                    </p>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                {/* Durum Değiştirme Butonu */}
                <button 
                    onClick={() => toggleStatusHandler(slider._id, slider.isActive)}
                    title={slider.isActive ? "Pasif Yap" : "Aktif Yap"}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ${
                        slider.isActive ? 'bg-green-500 shadow-inner' : 'bg-gray-300'
                    }`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${slider.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>

                {/* Silme Butonu */}
                <button 
                    onClick={() => deleteHandler(slider._id)} 
                    className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all'
                >
                    <FaTrash size={14} />
                </button>
            </div>
        </div>
    );

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <AdminPanel />
            <div className='flex-1 p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                    <FaImage className='text-rose-500' /> Slider Yönetimi
                </h2>

                <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8'>
                    <h3 className='font-semibold mb-4 text-gray-700'>Yeni Kampanya Görseli Ekle</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-3'>
                            <label className='block text-sm font-medium text-gray-600'>Slider Görseli</label>
                            <div className='relative h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-rose-400 transition-colors bg-gray-50 overflow-hidden'>
                                {images.length > 0 ? ( <img src={images[0]} alt="Önizleme" className='w-full h-full object-cover' /> ) : (
                                    <div className='text-center'>
                                        <FaPlus className='text-gray-400 text-2xl mb-2 mx-auto' />
                                        <span className='text-xs text-gray-400 font-medium'>Görsel Seçmek İçin Tıklayın</span>
                                    </div>
                                )}
                                <input type="file" onChange={handleImageChange} className='absolute inset-0 opacity-0 cursor-pointer' accept="image/*"/>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div className='space-y-3'>
                                <label className='block text-sm font-medium text-gray-600'>Yönlendirme Linki (URL)</label>
                                <div className='flex items-center border border-gray-200 rounded-xl px-3 bg-white focus-within:ring-1 focus-within:ring-rose-200 transition-all'>
                                    <FaLink className='text-gray-400' />
                                    <input type="text" placeholder="/kategori/elektronik" className='w-full p-3 outline-none text-sm' value={link} onChange={(e) => setLink(e.target.value)}/>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className='w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 mt-4 active:scale-[0.98]'>
                                <FaPlus /> Sliderı Yayınla
                            </button>
                        </div>
                    </div>
                </div>

                <div className='space-y-8'>
                    {/* AKTİF LİSTE */}
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <div className='p-4 border-b border-gray-50 bg-green-50/30 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <FaEye className='text-green-600' />
                                <h3 className='font-bold text-gray-700 text-sm'>YAYINDA OLANLAR ({activeSliders.length})</h3>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-100'>
                            {activeSliders.length > 0 ? (
                                activeSliders.map(slider => <SliderRow key={slider._id} slider={slider} />)
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-sm italic font-medium">Şu an aktif slider bulunmuyor.</div>
                            )}
                        </div>
                    </div>

                    {/* PASİF LİSTE */}
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <div className='p-4 border-b border-gray-50 bg-gray-100/50 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <FaEyeSlash className='text-gray-500' />
                                <h3 className='font-bold text-gray-600 text-sm'>YAYINDA OLMAYANLAR ({passiveSliders.length})</h3>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-100'>
                            {passiveSliders.length > 0 ? (
                                passiveSliders.map(slider => <SliderRow key={slider._id} slider={slider} />)
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-sm italic font-medium">Pasif slider bulunmuyor.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderAdmin;