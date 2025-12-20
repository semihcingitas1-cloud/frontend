import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAdminProduct } from '../../redux/productSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';

const UpdateProductPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: "", 
        description: "", 
        price: 0, 
        category: "",
        images: []
    });

    useEffect(() => {

        const getProductDetails = async () => {

            try {

                const response = await fetch(`http://localhost/product/${id}`);
                const result = await response.json();
                
                if(result.product) {

                    setData({

                        name: result.product.name,
                        description: result.product.description,
                        price: result.product.price,
                        category: result.product.category,
                        stock: result.product.stock,
                        images: []
                    });
                }
            } catch (error) {

                console.log("Veri çekme hatası:", error);
            }
        };

        getProductDetails();

    }, [id]);

    const handleChange = (e) => {

        if (e.target.name === 'images') {

            const files = Array.from(e.target.files);
            setData(prev => ({ ...prev, images: [] })); 
            files.forEach((file) => {

                const reader = new FileReader();

                reader.onload = () => {

                    if (reader.readyState === 2) {

                        setData((prev) => ({...prev, images: [...prev.images, reader.result]}));
                    }
                };

                reader.readAsDataURL(file);
            });
        } else {

            setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const handleUpdate = async () => {

        await dispatch(updateAdminProduct({ id, productData: data }));
        alert("Ürün başarıyla güncellendi!");
        navigate('/admin'); 
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-8 border rounded-xl shadow-2xl bg-white">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Ürünü Düzenle</h2>
            
            <div className="space-y-5">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Ürün Adı</label>
                    <Input onChange={handleChange} name={'name'} placeholder={'Ürün Adı'} type={'text'} value={data.name} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Açıklama</label>
                    <Input onChange={handleChange} name={'description'} placeholder={'Açıklama'} type={'text'} value={data.description} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Fiyat (₺)</label>
                        <Input onChange={handleChange} name={'price'} placeholder={'Fiyat'} type={'number'} value={data.price} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Stok Adedi</label>
                        <Input onChange={handleChange} name={'stock'} placeholder={'Stok'} type={'number'} value={data.stock} />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Kategori</label>
                    <Input onChange={handleChange} name={'category'} placeholder={'Kategori'} type={'text'} value={data.category} />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Görselleri Güncelle</label>
                    <input onChange={handleChange} name='images' type="file" multiple className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer" />
                    <p className="text-xs text-gray-400 mt-2">* Yeni resim seçerseniz eskiler silinecektir.</p>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button text={'Güncellemeyi Kaydet'} width={'70%'} onClick={handleUpdate} />
                    <Button text={'İptal'} width={'30%'} onClick={() => navigate('/admin')} />
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;