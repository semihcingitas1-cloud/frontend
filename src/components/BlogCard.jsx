import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { deleteAdminBlog } from '../redux/blogSlice'; 

import { CiEdit, CiEraser } from "react-icons/ci";

const BlogCard = ({ post, edit }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDetailGo = () => {

        navigate(`/blog/${post?.slug}`);
    };

    const deleteHandler = (id, e) => {

        e.stopPropagation();

        if (window.confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {

            dispatch(deleteAdminBlog(id));
        }
    };

    const updateHandler = (id, e) => {

        e.stopPropagation();
        navigate(`/admin/blogupdate/${id}`);
    };

    const settings = {

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

    return (

        <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

            <div className="relative overflow-hidden h-56">

                <Slider className='w-full mb-5' {...settings}>

                    {post?.images?.map((image, i) => (

                        <img key={i} src={image?.url} alt={post?.title} className="w-full h-full object-cover"/>
                    ))}

                </Slider>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-rose-500 text-xs font-bold uppercase tracking-wider">{post.category}</div>

            </div>

            <div className="p-6 flex flex-col flex-grow">

                <span className="text-gray-400 text-sm mb-2">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : post.date}
                </span>

                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-500 transition-colors">
                    {post.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                <button onClick={() => handleDetailGo()} className="mt-auto w-full py-3 bg-white border border-rose-400 text-rose-400 font-semibold rounded-lg hover:bg-rose-400 hover:text-white transition-all duration-300">
                    Devamını Oku →
                </button>

            </div>

            {edit && ( <div className='w-full flex items-center justify-around py-3 bg-gray-50 border-t'>

                <div onClick={(e) => updateHandler(post?._id, e)} className="cursor-pointer"><CiEdit size={35} className='hover:bg-gray-500 hover:text-white transition duration-300 rounded-full p-1 border' /></div>
                <div onClick={(e) => deleteHandler(post?._id, e)} className="cursor-pointer"><CiEraser size={35} className='hover:bg-red-500 hover:text-white transition duration-300 rounded-full p-1 border' /></div>
            </div>)}

        </div>

    );
};

export default BlogCard;