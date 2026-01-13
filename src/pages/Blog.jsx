import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import { getBlogs, clearErrors } from '../redux/blogSlice';
import { toast } from 'react-toastify';

const Blog = () => {

    const dispatch = useDispatch();

    const { blogs, adminBlogs, loading, error } = useSelector((state) => state.blogs);
    const activeBlogs = (blogs && blogs.length > 0) ? blogs : (adminBlogs?.blogs || []);

    useEffect(() => {
        dispatch(getBlogs());

        if (error) {

            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    {activeBlogs.map((post) => ( 
        <BlogCard key={post._id} post={post} />
    ))}

    console.log("Redux'tan gelen blogs:", blogs);

    return (

        <div className="bg-white min-h-screen">

            <div className="bg-rose-50 py-16 px-4 border-b border-rose-100">

                <div className="max-w-4xl mx-auto text-center">

                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Çiçek Rehberi & Blog</h1>
                    <p className="text-lg text-gray-600 italic">Doğanın güzelliklerini daha yakından tanıyın, sevdiklerinize anlamlı sürprizler hazırlayın.</p>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">

                {loading ? (

                    <div className="flex justify-center py-20">

                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>

                    </div>) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
                        {blogs && blogs.length > 0 ? (

                            blogs.map((post) => ( 
                                <BlogCard key={post._id} post={post} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-400 text-lg">Henüz bir blog yazısı yayınlanmadı.</p>
                            </div>
                        )}
                </div>)}

            </div>

            <div className="bg-gray-50 py-12 mt-12 border-t">
                <div className="max-w-xl mx-auto text-center px-4">
                    <h3 className="text-2xl font-bold text-gray-800">İpuçlarını Kaçırmayın</h3>
                    <p className="text-gray-500 mt-2">Yeni bakım rehberleri ve indirimlerden haberdar olmak için e-bültene kayıt olun.</p>
                    
                    <div className="mt-6 flex gap-2">
                        <input 
                            type="email" 
                            placeholder="E-posta adresiniz" 
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all shadow-sm" 
                        />
                        <button className="bg-rose-400 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-500 transition-colors shadow-md active:scale-95">
                            Kayıt Ol
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;