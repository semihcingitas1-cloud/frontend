import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft, FaShareAlt, FaUser, FaEye } from 'react-icons/fa';
import { getBlogDetail, clearErrors } from '../redux/blogSlice';
import { toast } from 'react-toastify';

const BlogDetail = () => {

    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { blog, loading, error } = useSelector((state) => state.blogs);

    useEffect(() => {

        console.log("Slug gönderiliyor:", slug);
        dispatch(getBlogDetail(slug));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, error]);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    const shareHandler = () => {

        navigator.clipboard.writeText(window.location.href);
        toast.success("Link kopyalandı!");
    };

    return (

        <div className="bg-white min-h-screen pb-20">
            {/* Header / Hero Image */}
            <div className="relative h-[450px] w-full">
                <img 
                    src={blog?.mainImage?.url} 
                    alt={blog?.title} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full text-white">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="flex items-center gap-2 mb-6 text-sm hover:text-rose-400 transition-colors"
                        >
                            <FaArrowLeft /> Geri Dön
                        </button>
                        <span className="bg-rose-500 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block tracking-widest">
                            {blog?.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight">{blog?.title}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                {/* Meta Bilgiler */}
                <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8 border-b pb-6">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-rose-500" />
                        <span>{blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString('tr-TR') : ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaUser className="text-rose-500" />
                        <span>{blog?.author?.name || "Admin"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEye className="text-rose-500" />
                        <span>{blog?.views || 0} Görüntülenme</span>
                    </div>
                    <button 
                        onClick={shareHandler}
                        className="ml-auto flex items-center gap-2 text-gray-800 font-bold border px-4 py-2 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <FaShareAlt /> Paylaş
                    </button>
                </div>

                {/* İçerik Alanı */}
                <div className="prose prose-lg max-w-none text-gray-800">
                    <div 
                        className="text-lg leading-loose"
                        dangerouslySetInnerHTML={{ __html: blog?.content }} 
                    />

                    {/* Backend modelindeki 'gallery' alanını kontrol ediyoruz */}
                    {blog?.gallery && blog.gallery.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
                            {blog.gallery.map((img, idx) => (
                                <img key={idx} src={img.url} className="rounded-3xl shadow-xl w-full h-72 object-cover" alt="Galeri" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Yorumlar Bölümü - Backend 'comments' olarak döner */}
                <div className="mt-20 border-t pt-10">
                    <h3 className="text-3xl font-bold mb-10 text-gray-900">
                        Okuyucu Yorumları ({blog?.comments?.length || 0})
                    </h3>
                    <div className="space-y-8">
                        {blog?.comments && blog.comments.map((comment) => (
                            <div key={comment._id} className="flex gap-4 p-6 bg-rose-50/30 rounded-[30px] border border-rose-100">
                                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-600 font-bold shrink-0 uppercase">
                                    {comment.name ? comment.name[0] : "?"}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-gray-900">{comment.name}</h4>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('tr-TR') : ""}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                        {(!blog?.comments || blog.comments.length === 0) && (
                            <p className="text-gray-400 italic">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;