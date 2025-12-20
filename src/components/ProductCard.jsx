import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { CiEdit, CiEraser, CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { deleteAdminProduct, updateAdminProduct } from '../redux/productSlice';

const ProductCard = ({product, edit}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    var settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        cssEase: "linear"
    };

    const deleteHandler = (id, e) => {

        e.stopPropagation();
        if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {

            dispatch(deleteAdminProduct(id));
        }
    };

    const updateHandler = (id, e) => {

        e.stopPropagation();
        navigate(`/admin/update/${id}`);
    };

    return (
  
        <div onClick={() => navigate(`/product/${product?._id}`)} className='w-[250px] h-[420px] border-2 border-gray-100 hover:shadow-lg shadow-gray-400 rounded group relative'>

            <Slider className='w-full mb-5' {...settings}>

                {product?.images?.map((image, i) => (

                   <img className='w-full h-[300px]' key={i} src={image.url} />
                ))}

            </Slider>

            {product?.stock > 0 ? <div></div> : <div className='w-full flex items-center justify-center text-red-600 text-xl bg-slate-100 absolute top-0'>Stokta Yok</div>}
            <div onClick={() => {navigate('/favorite')}} className='top-1 right-1 p-1 absolute text-white bg-rose-400 rounded-full cursor-pointer'><CiHeart size={25} /></div>
            <div className='text-center transform transition-transform duration-300 translate-y-4 group-hover:-translate-y-0'>{product?.name}</div>
            <div className='text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>{product?.price} ₺</div>
            {!edit && <div className='text-green-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Aynı gün Teslimat</div>}

            {edit && <div className='w-full flex items-center justify-around'>

                <div onClick={(e) => {updateHandler(product?._id, e)}}><CiEdit size={35} className='hover:bg-gray-500 hover:text-white hover:border-none transition duration-300 rounded-full p-1 border' /></div>
                <div onClick={(e) => deleteHandler(product?._id, e)}><CiEraser size={35} className='hover:bg-red-500 hover:text-white transition duration-300 rounded-full p-1 border' /></div>

            </div>}

        </div>
    );
};

export default ProductCard;