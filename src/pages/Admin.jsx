import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAdminProducts, getAdminProducts } from '../redux/productSlice';
import { openModalFunc } from '../redux/generalSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

const Admin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adminProducts, loading } = useSelector(state => state.products);
    const { openModal } = useSelector(state => state.general);
    const [data, setData] = useState({name: "", description: "", price: null, category: "", stock: null, images: []});

    useEffect(() => {

        dispatch(getAdminProducts({ keyword: "" }));
    },[dispatch]);

    const addProduct = () => {

        dispatch(openModalFunc());
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

        </div>
    )

    return (

        <div className='min-h-screen'>

            {

                loading ? <div className='w-full flex justify-center'><div className={`w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-rose-400 animate-spinner`}></div></div> : <div>

                    <div className='p-2 grid grid-cols-3 gap-2'>

                        <Button text={'Ürün Ekle'} onClick={addProduct} />
                        <Button text={'Siparişler'} onClick={() => navigate('/ordersadmin')} />
                        <Button text={'Mesajlar'} onClick={() => navigate('/messagesadmin')} />

                    </div>

                    {

                        adminProducts?.products && <div className='m-10 flex items-center justify-center gap-5 flex-wrap'>

                            {

                                adminProducts?.products?.map((product, i) => (

                                    <ProductCard edit={true} product={product} key={i} />
                                ))

                            }

                        </div>

                    }

                    {openModal && <Modal title={'Ürün Ekle'} content={content} btnName={'Ürün Ekle'} onClick={modalAddFunc} />}

                </div>

            }

        </div>

    );
};

export default Admin;