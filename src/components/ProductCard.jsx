import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { data, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { deleteAdminProduct, updateAdminProduct } from '../redux/productSlice';
import { toggleFavorite } from '../redux/favoriteSlice';
import { openUpdateModalFunc } from '../redux/generalSlice';

import { CiPercent, CiDiscount1, CiEdit, CiEraser, CiHeart, CiStar } from "react-icons/ci";
import { IoIosHeart, IoMdEye } from "react-icons/io";

const ProductCard = ({product, edit}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const favoriteList = useSelector(state => state.favorite.favorites) || [];

    const [isDiscountModal, setIsDiscountModal] = useState(false);
    const [newPrice, setNewPrice] = useState("");

    const isFavorite = favoriteList.some(item => item._id === product?._id);

    var settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        cssEase: "linear",
        arrows: false
    };


    const handleFavoriteClick = (e) => {

        e.stopPropagation();
        dispatch(toggleFavorite(product));
    };

    const deleteHandler = (id, e) => {

        e.stopPropagation();
        if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {

            dispatch(deleteAdminProduct(id));
        }
    };

    const updateHandler = (id, e) => {

        e.stopPropagation();
        dispatch(openUpdateModalFunc(id));
    };

    const discountHandler = (id, e, newPrice) => {

        e.stopPropagation();

        if (!newPrice || newPrice <= 0) {

            alert("Lütfen geçerli bir fiyat giriniz.");
            return;
        }


        if (Number(newPrice) >= product.price) {

            alert("İndirimli fiyat, mevcut fiyattan küçük olmalıdır!");
            return;
        }


        dispatch(updateAdminProduct({ 

            id: id, 
            productData: { oldPrice: product.price, price: Number(newPrice) } 
        }))
        .unwrap()
        .then(() => {

            alert("İndirim başarıyla uygulandı!");
            setIsDiscountModal(false);
            setNewPrice("");
        })
        .catch((err) => {

            alert("Bir hata oluştu: " + err);
        });
    };

    const removeDiscountHandler = (id, e) => {

        e.stopPropagation();

        if (window.confirm("İndirimi kaldırmak ve eski fiyata geri dönmek istediğinize emin misiniz?")) {

            dispatch(updateAdminProduct({

                id: id,
                productData: { 

                    price: product.oldPrice,
                    oldPrice: 0
                }
            }))
            .unwrap()
            .then(() => {

                alert("İndirim başarıyla kaldırıldı!");
                setIsDiscountModal(false);
                setNewPrice("");
            })
            .catch((err) => alert("Hata: " + err));
        }
    };

    const discountRate = product?.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return (
  
        <div onClick={() => navigate(`/product/${product?._id}`)} className={`w-[250px] ${edit ? "h-[450px]" : "h-[420px]"} border-2 border-gray-100 hover:shadow-lg shadow-gray-400 rounded group relative`}>

            {isDiscountModal && ( <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={(e) => { e.stopPropagation(); setIsDiscountModal(false); }}>

                <div className="bg-white w-full max-w-[360px] rounded-[2rem] shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()} >

                    <div className="bg-rose-500 p-8 text-white text-center">

                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md"> <CiPercent size={40} className="text-white" /> </div>
                        <h3 className="text-2xl font-black tracking-tight">Hızlı İndirim</h3>
                        <p className="text-orange-100 text-sm mt-1 opacity-90 truncate">{product?.name}</p>

                    </div>

                    <div className="p-8 space-y-6">

                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">

                            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Eski Fiyat</span>
                            <span className="text-gray-400 line-through font-bold text-lg">{product?.price} ₺</span>

                        </div>

                        <div className="space-y-3">

                            <label className="text-sm font-bold text-gray-700 ml-1">Yeni İndirimli Fiyat</label>
    
                            <div className="relative">

                                <input autoFocus type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Yeni fiyatı girin..." className="w-full pl-5 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-black text-xl text-gray-800"/>
                                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-gray-400 text-xl">₺</span>

                            </div>

                        </div>

                        <div className="flex gap-3 pt-2">

                            <button onClick={() => setIsDiscountModal(false)} className="flex-1 py-4 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all active:scale-95">İptal</button>
                            <button onClick={(e) => discountHandler(product?._id, e, newPrice)} className="flex-1 py-4 px-4 bg-rose-500 hover:from-rose-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95">Onayla</button>

                        </div>

                        {product?.oldPrice > 0 && ( <button onClick={(e) => removeDiscountHandler(product?._id, e)} className="w-full py-3 px-4 border-2 border-rose-100 text-rose-500 font-bold rounded-2xl hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center justify-center gap-2"><CiEraser size={20} /> İndirimi Tamamen Bitir</button>)}

                    </div>

                </div>

            </div> )}

            {discountRate > 0 && ( <div className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg animate-bounce">

                %{discountRate} İndirim
            </div>)}

            <Slider className='w-full mb-5' {...settings}>

                {product?.images?.map((image, i) => (

                   <img className='w-full h-[300px] object-cover' key={i} src={image.url.replace("/upload/", "/upload/f_auto,q_auto,w_600/")} alt={product?.product?.name} title={product?.product?.name} loading={i === 0 ? "eager" : "lazy"} fetchpriority={i === 0 ? "high" : "low"} />
                ))}

            </Slider>

            {product?.stock > 0 ? <div></div> : <div className='w-full flex items-center justify-center text-red-600 text-xl bg-slate-100 absolute top-0'>Stokta Yok</div>}

            <div className='p-1 relative left-2 -top-14 w-min flex gap-2'>

                <div className='p-1 bg-slate-50 flex items-center gap-1 text-sm rounded-lg'><CiStar size={20} color='yellow' />{product?.rating}</div>
                {edit && <div className='p-1 bg-slate-50 flex items-center gap-1 text-sm rounded-lg'><IoMdEye size={20} color='gray' />{product?.views}</div>}

            </div>

            <div onClick={handleFavoriteClick} className='top-1 right-1 absolute cursor-pointer'>{isFavorite ? <IoIosHeart size={30} className='p-1 text-rose-500 border-white border-2 rounded-full' /> : <CiHeart size={30} className='text-white p-1 bg-rose-500 rounded-full' />}</div>
            <div className='text-center transform transition-transform duration-300 translate-y-1 group-hover:-translate-y-3'>{product?.name}</div>
            <div className='text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-3'>{product?.price} ₺</div>
            {!edit && <div className='text-green-400 text-center opacity-0 -translate-y-3 group-hover:opacity-100 transition-opacity duration-300'>Aynı gün Teslimat</div>}

            {edit && <div className='w-full bottom-1 flex items-center justify-around absolute'>

                <div onClick={(e) => {e.stopPropagation();setIsDiscountModal(true);}}><CiDiscount1 size={35} className='hover:bg-red-600 hover:text-white hover:border-none transition duration-300 rounded-full p-1 border' /></div>
                <div onClick={(e) => updateHandler(product?._id, e)}><CiEdit size={35} className='hover:bg-gray-500 hover:text-white hover:border-none transition duration-300 rounded-full p-1 border' /></div>
                <div onClick={(e) => deleteHandler(product?._id, e)}><CiEraser size={35} className='hover:bg-red-500 hover:text-white transition duration-300 rounded-full p-1 border' /></div>

            </div>}

        </div>
    );
};

export default ProductCard;