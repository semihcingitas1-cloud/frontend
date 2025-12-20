
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addAdminProducts, getAdminProducts } from '../../redux/productSlice';
import { openModalFunc } from '../../redux/generalSlice';

import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import AdminPanel from '../../layout/AdminPanel';

import { CiCamera } from 'react-icons/ci';

const ProductsAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adminProducts, loading } = useSelector(state => state.products);
    const { openModal } = useSelector(state => state.general);
    const [data, setData] = useState({name: "", description: "", price: null, category: "", stock: null, images: []});
    const [images, setImages] = useState([]);

    useEffect(() => {

        dispatch(getAdminProducts({ keyword: "" }));
    },[dispatch]);

    const addProduct = () => {

        dispatch(openModalFunc());
    };

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

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

    const productHandle = (e) => {

        if (e.target.name === 'images') {

            const files = Array.from(e.target.files);
        
            files.forEach((file) => {

                const reader = new FileReader();
                reader.onload = () => {

                    if (reader.readyState === 2) {

                        setData((prev) => ({...prev, images: [...prev.images, reader.result]}));
                    }
                };

                reader.readAsDataURL(file);
            });

        }else{

            setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

        }
    };

    const modalAddFunc = () => {

        dispatch(addAdminProducts(data));
        dispatch(openModalFunc());
        setData({name: "", description: "", price: 0, category: "", stock: 0, rating: 0, images: []});
    }

    const content = (

        <div className='my-3 space-y-3'>

            <Input onChange={productHandle} name={'name'} id={''} placeholder={'Ürünün Adı'} type={'text'} value={data.name} />
            <Input onChange={productHandle} name={'description'} id={''} placeholder={'Ürünün Açıklaması'} type={'text'} value={data.description} />

            <div className="grid grid-cols-3 gap-4">

                <div className="flex flex-col gap-1">

                    <label className="text-sm font-semibold text-gray-600 ml-1">Fiyat (₺)</label>
                    <Input onChange={productHandle} name={'price'} placeholder={'Ürünün Fiyatı'} type={'number'} value={data.price} />

                </div>

                <div className="flex flex-col gap-1">

                    <label className="text-sm font-semibold text-gray-600 ml-1">Stok Adedi</label>
                    <Input onChange={productHandle} name={'stock'} placeholder={'Ürünün Stoğu'} type={'number'} value={data.stock} />

                </div>

                <div className="flex flex-col gap-1">

                    <label className="text-sm font-semibold text-gray-600 ml-1">Puanı(1-5)</label>
                    <Input onChange={productHandle} name={'rating'} placeholder={'Ürünün Puanı'} type={'number'} value={data.rating} />

                </div>

            </div>

            <div className="flex flex-col gap-1">

                <label className="text-sm font-semibold text-gray-600 ml-1">Kategori</label>
                <Input onChange={productHandle} name={'category'} placeholder={'Kategori'} type={'text'} value={data.category} />

            </div>

            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200">

                <label className="block text-sm font-bold text-gray-700 mb-2">Görselleri Yükle</label>
                <input onChange={productHandle} name='images' type="file" multiple className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer" />
                <p className="text-xs text-gray-400 mt-2">* Ürünün resmini/resimlerini yükleyin.</p>

            </div>

            <div>

                <label className='block text-sm font-medium text-gray-700 mb-2'>Fotoğraf Ekle:</label>

                <div className='flex items-center gap-4 flex-wrap'>

                    <label className='cursor-pointer bg-white border-2 border-dashed border-gray-300 p-4 rounded-xl hover:border-rose-400 transition flex flex-col items-center gap-2'>

                        <CiCamera size={24} className='text-gray-400'/>
                        <span className='text-xs text-gray-400'>Seç</span>
                        <input type="file" multiple accept="image/*" onChange={productHandle} className='hidden' />

                    </label>

                    {images.map((img, idx) => (

                        <img key={idx} src={img} className='w-16 h-16 object-cover rounded-xl border' alt="önizleme" />

                    ))}

                </div>

             </div>

        </div>
    )

    return (

        <div className='flex w-full'>

            <AdminPanel />

            <div className=''>

                <div className=''>

                    <div className='m-3 mb-6 flex items-center justify-between border-b pb-2'>

                        <div className="text-2xl font-bold italic text-gray-800">Admin Ürün Yönetimi</div>
                        <div onClick={addProduct} className='py-3 px-5 rounded-md bg-rose-600 text-white text-xl cursor-pointer'>Yeni Ürün Ekle</div>

                    </div>

                    {loading ? <div className='w-full flex justify-center'><div className={`w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-rose-400 animate-spinner`}></div></div> : <div>

                        {adminProducts?.products && <div className='m-10 flex items-center justify-center gap-5 flex-wrap'>

                            {adminProducts?.products?.map((product, i) => (

                                <ProductCard edit={true} product={product} key={i} />
                            ))}

                        </div>}

                        {openModal && <Modal title={'Ürün Ekle'} content={content} btnName={'Ürün Ekle'} onClick={modalAddFunc} />}

                    </div>}

                </div>

            </div>

        </div>
    );
};

export default ProductsAdmin;