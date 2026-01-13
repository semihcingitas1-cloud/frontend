import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, createCategory, deleteCategory, clearStatus, getAllShippings, createShipping, deleteShipping } from '../../redux/categorySlice';
import AdminPanel from '../../layout/AdminPanel';
import { FaPlus, FaTrash, FaFolderOpen, FaTruck, FaLiraSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CategoryAdmin = () => {

    const dispatch = useDispatch();
    const { categories, shippings, success, error } = useSelector(state => state.category);

    const [name, setName] = useState("");
    const [district, setDistrict] = useState("");
    const [shippingPrice, setShippingPrice] = useState("");

    useEffect(() => {

        dispatch(getAllCategories());
        dispatch(getAllShippings());
        
        if (success) {

            toast.success("İşlem başarılı!");
            setName("");
            setDistrict("");
            setShippingPrice("");
            dispatch(clearStatus());
        }

        if (error) {

            toast.error(error);
            dispatch(clearStatus());
        }

    }, [dispatch, success, error]);

    const submitHandler = (e) => {

        e.preventDefault();
        if(name.length < 2) return toast.warn("İsim çok kısa");
        dispatch(createCategory({ name }));
    };

    const shippingSubmitHandler = (e) => {

        e.preventDefault();

        if (!district || !shippingPrice) {
            return toast.warn("Lütfen hem ilçe adını hem de kargo ücretini giriniz.");
        }

        dispatch(createShipping({ district, price: Number(shippingPrice) }));

    };

    const deleteHandler = (id) => {

        if(window.confirm("Bu öğeyi silmek istediğine emin misin?")) {

            dispatch(deleteCategory(id));
        }
    };

    return (

        <div className='flex min-h-screen bg-gray-50'>

            <AdminPanel />

            <div className='flex-1 p-8'>

                <div className='max-w-4xl space-y-12'>

                    <section>

                        <h1 className='text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3'><FaFolderOpen className='text-rose-500' /> Kategori Yönetimi</h1>

                        <form onSubmit={submitHandler} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6'>

                            <label className='block text-sm font-semibold text-gray-600 mb-2'>Yeni Kategori Adı</label>

                            <div className='flex gap-4'>

                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn: Telefon, Aksesuar..." className='flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all'/>
                                <button type="submit" className='bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95'><FaPlus /> Ekle</button>

                            </div>

                        </form>

                        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>

                            <table className='w-full text-left'>

                                <thead className='bg-gray-50 border-b border-gray-100'>

                                    <tr>

                                        <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase'>Kategori Adı</th>
                                        <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right'>İşlem</th>

                                    </tr>

                                </thead>

                                <tbody className='divide-y divide-gray-50'>

                                    {categories && categories.map(cat => ( <tr key={cat._id} className='hover:bg-gray-50/50 transition-colors'>

                                        <td className='px-6 py-4 font-medium text-gray-700'>{cat.name}</td>
                                        <td className='px-6 py-4 text-right'><button onClick={() => deleteHandler(cat._id)} className='p-2 text-gray-300 hover:text-red-500 transition-colors'><FaTrash size={16} /></button></td>
                                    </tr>))}

                                </tbody>

                            </table>

                        </div>

                    </section>

                    <section>

                        <h2 className='text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3'><FaTruck className='text-rose-500' />Bölge Ücretleri</h2>

                        <form onSubmit={shippingSubmitHandler} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6'>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>

                                <div>

                                    <label className='block text-sm font-semibold text-gray-600 mb-2'>İlçe Adı</label>
                                    <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Örn: Çankaya, ulus ..." className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all'/>

                                </div>

                                <div>

                                    <label className='block text-sm font-semibold text-gray-600 mb-2'>Bölge Ücreti (TL)</label>

                                    <div className='relative'>

                                        <input type="number" value={shippingPrice} onChange={(e) => setShippingPrice(e.target.value)} placeholder="Örn: 100" className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all pl-10'/>
                                        <FaLiraSign className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

                                    </div>

                                </div>

                            </div>

                            <button type="submit" className='w-full bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95'><FaPlus /> Bölge ve Ücret Ekle</button>

                        </form>

                        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>

                            <table className='w-full text-left'>

                                <thead className='bg-gray-50 border-b border-gray-100'>

                                    <tr>

                                        <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase'>Bölge Adı</th>
                                        <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase'>Bölge Ücreti</th>
                                        <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right'>İşlem</th>

                                    </tr>

                                </thead>

                                <tbody className='divide-y divide-gray-50'>

                                    {shippings && shippings.map(ship => ( <tr key={ship._id} className='hover:bg-gray-50/50 transition-colors'>

                                        <td className='px-6 py-4 font-medium text-gray-700'>{ship.district}</td>
                                        <td className='px-6 py-4 text-gray-700 font-bold'>{ship.price} TL</td>

                                        <td className='px-6 py-4 text-right'>

                                            <button onClick={() => dispatch(deleteShipping(ship._id))} className='p-2 text-gray-300 hover:text-red-500 transition-colors'><FaTrash size={16} /></button>

                                        </td>

                                    </tr>))}

                                </tbody>

                            </table>

                        </div>

                    </section>

                </div>

            </div>

        </div>

    );
};

export default CategoryAdmin;