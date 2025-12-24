import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiHeart, CiShoppingCart, CiTrash, CiSearch, CiStar } from "react-icons/ci";
import { removeFromFavorites, clearFavorites } from '../redux/favoriteSlice';
import { addToCart } from '../redux/cartSlice';
import Button from '../components/Button';

const Favorites = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { favorites } = useSelector(state => state.favorite);

    const handleDelete = (id) => {

        dispatch(removeFromFavorites(id));
    };

    const handleClearAll = () => {

        if (window.confirm("Tüm favorilerinizi silmek istediğinize emin misiniz?")) {

            dispatch(clearFavorites());
        }
    };

    const handleAddToCart = (item) => {

        dispatch(addToCart({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.images[0],
            quantity: 1
        }));
    };

    return (
        <div className='max-w-7xl mx-auto p-5 min-h-screen'>

            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6'>

                <div>

                    <div className='flex items-center gap-2 text-rose-500 mb-1'>

                        <CiHeart size={24} />
                        <span className='text-xs font-black uppercase tracking-widest'>Senin Seçimlerin</span>

                    </div>
                    <h2 className='text-4xl font-black text-slate-800 tracking-tight'>Favorilerim</h2>

                </div>

                {favorites.length > 0 && (<div className='flex gap-3'>

                    <button onClick={handleClearAll} className='px-6 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all'>Tümünü Temizle</button>
                    <button onClick={() => {}} className='px-6 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-all'>Tümünü Sepete Ekle</button>

                </div>)}

            </div>

            {favorites && favorites.length > 0 ? ( <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>

                {favorites.map((item) => ( <div key={item._id} className='group bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 relative'>

                    <div className='relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-5 cursor-pointer' onClick={() => navigate(`/product/${item._id}`)}>

                        <img src={item.images?.[0]?.url} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' />

                        <div className='absolute top-4 right-4'>

                            <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }} className='w-10 h-10 bg-white/90 backdrop-blur-md text-rose-500 rounded-full flex items-center justify-center shadow-sm hover:bg-rose-500 hover:text-white transition-all'><CiTrash size={20} /></button>

                        </div>

                        {item.rating && ( <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-black shadow-sm'>

                            <CiStar size={15} className='text-amber-500' /> {item.rating}

                        </div> )}

                    </div>

                    <div className='px-2'>

                        <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>{item.category}</span>
                        <h3 className='text-lg font-bold text-slate-800 mb-1 line-clamp-1 group-hover:text-rose-500 transition-colors'>{item.name}</h3>
                        <p className='text-2xl font-black text-slate-900 mb-4'>{item.price} ₺</p>
                    </div>

                    <div className='flex gap-2'>

                        <button onClick={() => handleAddToCart(item)} className='flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95'><CiShoppingCart size={20} />Sepete Ekle</button>

                    </div>

                </div>))}

            </div>) : (

            <div className='w-full py-32 flex flex-col items-center justify-center'>

                <div className='p-12 border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center gap-6 bg-slate-50/30'>

                    <CiHeart size={80} className='text-slate-200' />

                    <div className='text-center'>

                        <h3 className='text-3xl font-black text-slate-300'>Liste Boş</h3>
                        <p className='text-slate-400 font-medium'>Henüz hiçbir ürünü favorilerine eklemedin.</p>

                    </div>

                    <div className='flex gap-3'>

                        <Button text={'Ana Sayfa'} onClick={() => navigate('/')} />
                        <Button text={'Ürünleri İncele'} onClick={() => navigate('/products')} />

                    </div>

                </div>

            </div>)}

        </div>

    );
};

export default Favorites;