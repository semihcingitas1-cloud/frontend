import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, createCategory, deleteCategory, clearStatus } from '../../redux/categorySlice';
import AdminPanel from '../../layout/AdminPanel';
import { FaPlus, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Veya kendi alert sistemin

const CategoryAdmin = () => {
    const dispatch = useDispatch();
    const { categories, success, error } = useSelector(state => state.category);
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(getAllCategories());
        
        if (success) {
            toast.success("Kategori eklendi!");
            setName("");
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

    const deleteHandler = (id) => {
        if(window.confirm("Bu kategoriyi silmek istediğine emin misin?")) {
            dispatch(deleteCategory(id));
        }
    };

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <AdminPanel />
            <div className='flex-1 p-8'>
                <div className='max-w-4xl'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3'>
                        <FaFolderOpen className='text-rose-500' /> Kategori Yönetimi
                    </h1>

                    {/* KATEGORİ EKLEME FORMU */}
                    <form onSubmit={submitHandler} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10'>
                        <label className='block text-sm font-semibold text-gray-600 mb-2'>Yeni Kategori Adı</label>
                        <div className='flex gap-4'>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Örn: Telefon, Aksesuar..."
                                className='flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all'
                            />
                            <button type="submit" className='bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95'>
                                <FaPlus /> Ekle
                            </button>
                        </div>
                    </form>

                    {/* LİSTELEME */}
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <table className='w-full text-left'>
                            <thead className='bg-gray-50 border-b border-gray-100'>
                                <tr>
                                    <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase'>Kategori Adı</th>
                                    <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase'>Tarih</th>
                                    <th className='px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right'>İşlem</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-50'>
                                {categories && categories.map(cat => (
                                    <tr key={cat._id} className='hover:bg-gray-50/50 transition-colors'>
                                        <td className='px-6 py-4 font-medium text-gray-700'>{cat.name}</td>
                                        <td className='px-6 py-4 text-gray-400 text-sm'>
                                            {new Date(cat.createdAt).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <button 
                                                onClick={() => deleteHandler(cat._id)}
                                                className='p-2 text-gray-300 hover:text-red-500 transition-colors'
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {categories.length === 0 && (
                            <div className='p-10 text-center text-gray-400'>Henüz kategori eklenmemiş.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryAdmin;