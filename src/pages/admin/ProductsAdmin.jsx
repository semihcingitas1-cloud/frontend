import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdminProducts, getAdminProducts } from '../../redux/productSlice';
import { openModalFunc } from '../../redux/generalSlice';

import ProductCard from '../../components/ProductCard';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import AdminPanel from '../../layout/AdminPanel';

import { CiCamera, CiCircleRemove } from 'react-icons/ci';

const ProductsAdmin = () => {

    const dispatch = useDispatch();
    const { adminProducts, loading } = useSelector(state => state.products);
    const { openModal } = useSelector(state => state.general);
    const [data, setData] = useState({ name: "", description: "", price: "", category: "", stock: "", rating: "", images: [] });

    useEffect(() => {

        dispatch(getAdminProducts({ keyword: "" }));
    }, [dispatch]);

    const productHandle = (e) => {

        if (e.target.name === 'images') {

            const files = Array.from(e.target.files);

            files.forEach((file) => {

                const reader = new FileReader();

                reader.onload = () => {

                    if (reader.readyState === 2) {

                        setData((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
                    }
                };

                reader.readAsDataURL(file);
            });
        } else {

            setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const removeImage = (index) => {

        const filteredImages = data.images.filter((_, i) => i !== index);
        setData({ ...data, images: filteredImages });
    };

    const moveImage = (index, direction) => {

        const newImages = [...data.images];
        const targetIndex = direction === 'left' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newImages.length) return;

        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        setData({ ...data, images: newImages });
    };

    const modalAddFunc = () => {

        if (!data.name || !data.price || !data.category || !data.stock) {

            alert("Lütfen tüm zorunlu alanları (*) doldurunuz!");
            return;
        }

        if (data.images.length === 0) {

            alert("Lütfen en az bir ürün fotoğrafı ekleyin!");
            return;
        }

        dispatch(addAdminProducts(data));
        dispatch(openModalFunc());
        setData({ name: "", description: "", price: "", category: "", stock: "", rating: "", images: [] });
    };

    const content = (

        <div className='my-2 space-y-6 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar pb-4'>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">

                <div className="flex items-center gap-2 mb-1">

                    <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Ürün Kimliği</h3>

                </div>

                <div className="space-y-3">

                    <div className="flex flex-col gap-1">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">

                            Ürün Adı <span className="text-rose-500 text-lg">*</span>

                        </label>

                        <Input onChange={productHandle} name={'name'} placeholder={'Örn: Premium Kırmızı Gül Buketi'} type={'text'} value={data.name} />

                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Açıklama</label>
                        <textarea name="description" onChange={productHandle} value={data.description} placeholder="Ürün hikayesi, içeriği veya bakım önerileri..."className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all min-h-[100px] text-sm bg-gray-50/50"/>

                    </div>

                </div>

            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">

                <div className="flex items-center gap-2 mb-1">

                    <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Satış ve Stok</h3>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">

                            Birim Fiyat (₺) <span className="text-rose-500 text-lg">*</span>

                        </label>

                        <Input onChange={productHandle} name={'price'} placeholder={'0.00'} type={'number'} value={data.price} />


                    </div>

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">

                            Stok Adedi <span className="text-rose-500 text-lg">*</span>

                        </label>

                        <Input onChange={productHandle} name={'stock'} placeholder={'Adet'} type={'number'} value={data.stock} />

                    </div>

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">

                            Kategori <span className="text-rose-500 text-lg">*</span>

                        </label>

                        <select name="category" onChange={productHandle} value={data.category} className={`w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50/50 text-sm transition-all appearance-none cursor-pointer ${!data.category && 'border-rose-100'}`}>

                            <option value="">Seçim Yapınız</option>
                            <option value="Düğün">Düğün Çiçekleri</option>
                            <option value="Hediye">Hediye Kutuları</option>
                            <option value="Bitki">Salon Bitkileri</option>

                        </select>

                    </div>

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Puan (1-5)</label>
                        <Input onChange={productHandle} name={'rating'} placeholder={'5'} type={'number'} value={data.rating} />

                    </div>

                </div>

            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">

                <div className="flex items-center justify-between mb-1">

                    <div className="flex items-center gap-2">

                        <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>

                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Ürün Fotoğrafları <span className="text-rose-500 text-lg">*</span>
                        </h3>

                    </div>

                <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">

                    {data.images.length} Görsel Eklendi

                </span>

            </div>

            <div className='flex items-center gap-4 flex-wrap p-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 transition-colors hover:border-rose-200'>

                <label className='cursor-pointer bg-white border border-gray-200 w-24 h-24 rounded-2xl hover:bg-rose-50 hover:border-rose-300 transition-all flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 group'>

                    <div className="bg-rose-100 p-2 rounded-full group-hover:bg-rose-200 transition-colors"><CiCamera size={24} className='text-rose-600'/></div>
                    <span className='text-[10px] text-gray-500 font-bold uppercase tracking-tighter'>Görsel Seç</span>
                    <input type="file" multiple accept="image/*" onChange={productHandle} name="images" className='hidden' />

                </label>

                {data.images.map((img, idx) => ( <div key={idx} className="relative group w-24 h-24 animate-fadeIn transition-all">

                    <img src={img} className={`w-full h-full object-cover rounded-2xl border-2 transition-all duration-300 ${idx === 0 ? 'border-rose-500 ring-4 ring-rose-50' : 'border-white shadow-md'}`} alt={`ürün-${idx}`} />

                    {idx === 0 && (<div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold shadow-lg z-10 whitespace-nowrap">

                        ANA GÖRSEL
                    </div>)}

                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1.5 z-20">

                        <button onClick={(e) => { e.preventDefault(); removeImage(idx); }} className="self-end bg-white text-rose-600 p-1 rounded-full hover:bg-rose-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"><CiCircleRemove size={18} /></button>

                        <div className="flex gap-2 w-full justify-center pb-1">

                            {idx !== 0 && ( <button onClick={(e) => { e.preventDefault(); moveImage(idx, 'left'); }}className="bg-white/90 p-1 rounded-md text-gray-700 hover:bg-rose-500 hover:text-white transition-all shadow-sm">←</button>)}
                            {idx !== data.images.length - 1 && ( <button onClick={(e) => { e.preventDefault(); moveImage(idx, 'right'); }} className="bg-white/90 p-1 rounded-md text-gray-700 hover:bg-rose-500 hover:text-white transition-all shadow-sm">→</button>)}

                        </div>

                        </div>

                    </div>))}

                </div>

                <p className="text-[10px] text-center text-gray-400 italic">
                    * En baştaki fotoğraf kapak resmi olarak ayarlanır. Okları kullanarak sıralayın.
                </p>

            </div>

        </div>

    );

    return (

        <div className='flex flex-col md:flex-row min-h-screen bg-[#fbfbfb]'>

            <AdminPanel />

            <div className='flex-1 p-4 sm:p-8'>

                <div className='max-w-7xl mx-auto'>

                    <div className='flex flex-col sm:flex-row items-center justify-between gap-6 border-b pb-3 mb-10'>

                        <div>

                            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1">Ürün Portföyü</h1>
                            <p className="text-sm text-gray-500 font-medium tracking-wide italic">Gala Çiçek Evi Yönetim Paneli</p>

                        </div>

                        <button onClick={() => dispatch(openModalFunc())} className='w-full sm:w-auto py-3 px-8 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 active:scale-95 flex items-center justify-center gap-2'>

                            <span className="text-xl">+</span> Yeni Ürün Ekle

                        </button>

                    </div>

                    {loading ? ( <div className='w-full flex flex-col items-center justify-center py-32 gap-4'>

                        <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-rose-500 animate-spin"></div>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Veriler Yükleniyor...</p>

                    </div> ) : (

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

                        {adminProducts?.products?.map((product, i) => (

                            <ProductCard edit={true} product={product} key={i} />
                        ))}

                    </div>)}

                    {openModal && (<Modal title={'Yeni Ürün Ekle'} content={content} btnName={'Ürünü Kataloğa Ekle'} onClick={modalAddFunc} />)}

                </div>

            </div>

        </div>

    );
};

export default ProductsAdmin;