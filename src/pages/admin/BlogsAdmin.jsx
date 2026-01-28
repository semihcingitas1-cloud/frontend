import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAdminBlogs, createAdminBlog, deleteAdminBlog, updateAdminBlog, clearErrors } from '../../redux/blogSlice';
import { openModalFunc, openUpdateModalFunc } from '../../redux/generalSlice';

import AdminPanel from '../../layout/AdminPanel';

import Input from '../../components/Input';
import Modal from '../../components/Modal';

import { CiCircleRemove, CiMemoPad, CiSearch, CiEdit, CiCamera } from 'react-icons/ci';
import { FaRegNewspaper } from 'react-icons/fa';

import { toast } from 'react-toastify';

const BlogsAdmin = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState({ title: "", content: "", summary: "", readTime: "", status: "published", images: [] });
    const [updateData, setUpdateData] = useState({ title: "", content: "", summary: "", images: [] });

    const { adminBlogs, loading, error } = useSelector(state => state.blogs);
    const { openModal, openUpdateModal } = useSelector(state => state.general);

    useEffect(() => {

        dispatch(getAdminBlogs());

        if (error) {

            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error]);

    const openUpdateModalFunc = (id, e) => {

        e.stopPropagation();
    };

    const deleteHandler = (id) => {

        if (window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) {

            dispatch(deleteAdminBlog(id)).then((res) => {

                if(res.payload.data.success) {

                    toast.success("Blog başarıyla silindi");
                }

            });
        }
    };

    const filteredBlogs = Array.isArray(adminBlogs) ? adminBlogs.filter(blog => 

        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const totalViews = filteredBlogs.reduce((acc, curr) => acc + (curr.views || 0), 0);

    const blogHandle2 = (e) => {

        if (e.target.name === 'images') {

            const files = Array.from(e.target.files);

            files.forEach((file) => {

                const reader = new FileReader();

                reader.onload = () => {

                    if (reader.readyState === 2) {

                        setData((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
                    }
                };

                reader.readAsDataURL(file);
            });

        } else {

            setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

        }

    };

    const blogHandle = (e) => {
    if (e.target.name === "images") {
        const files = Array.from(e.target.files);
        
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setData((prev) => ({
                        ...prev,
                        images: [...prev.images, reader.result] // Base64 olarak ekler
                    }));
                }
            };
            reader.readAsDataURL(file);
        });
    } else {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }
};

    const removeImage = (index) => {

        const filteredImages = data.images.filter((_, i) => i !== index);
        setData({ ...data, images: filteredImages });
    };

    const moveImage = (index, direction) => {

        const newImages = [...data.images];
        const targetIndex = direction === 'left' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newImages.length) return;

        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        setData({ ...data, images: newImages });
    };

const modalAddFunc = async () => {
    // Validasyonlar (Title, Content, Excerpt, Images)
    if (!data.title || !data.content || !data.excerpt || data.images.length === 0) {
        alert("Lütfen tüm zorunlu alanları ve kapak resmini doldurun!");
        return;
    }

    const formattedData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        tags: Array.isArray(data.tags) ? data.tags : [],
        isPublished: data.isPublished,
        mainImage: {
            public_id: `blog_${Date.now()}`,
            url: data.images[0]
        }
    };

    try {
        // unwrap() kullanarak hatayı catch bloğuna düşürebilirsin
        await dispatch(createAdminBlog(formattedData)).unwrap();
        
        // Başarılıysa temizle
        dispatch(openModalFunc());
        setData({ title: "", content: "", excerpt: "", tags: [], isPublished: false, images: [] });
        alert("Blog başarıyla eklendi!");
    } catch (err) {
        console.error("Hata detayı:", err);
        alert(`Hata oluştu: ${err.message || "Sunucu hatası"}`);
    }
};

    const modalUpFunc = (blog) => {

        dispatch(openUpdateModalFunc());
        setData({ _id: blog._id, title: blog.title, content: blog.content, summary: blog.summary || "", images: blog.images || [] });
    };


    const handleUpdateSubmit = () => {

        if (!data.title || !data.content) {

            alert("Başlık ve içerik boş bırakılamaz!");
            return;
        }

        dispatch(updateAdminBlog({ id: data._id, blogData: data }));
        dispatch(openUpdateModalFunc());
    };

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

    const content = (
    <div className='my-2 space-y-6 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar pb-4'>
        {/* Bölüm 1: Temel Bilgiler */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Blog İçeriği</h3>
            </div>

            <div className="space-y-3">
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Yazı Başlığı <span className="text-rose-500">*</span></label>
                    <Input 
                        onChange={blogHandle} 
                        name={'title'} 
                        placeholder={'Örn: Minimalist Yaşamın İpuçları'} 
                        type={'text'} 
                        value={data.title} 
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Kısa Özet (Excerpt) <span className="text-rose-500">*</span></label>
                    <textarea 
                        name="excerpt" 
                        onChange={blogHandle} 
                        value={data.excerpt} 
                        placeholder="Arama sonuçlarında ve listelerde görünecek kısa açıklama..." 
                        className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 transition-all min-h-[70px] text-sm bg-gray-50/50"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Ana İçerik <span className="text-rose-500">*</span></label>
                    <textarea 
                        name="content" 
                        onChange={blogHandle} 
                        value={data.content} 
                        placeholder="Blog yazısının detaylı içeriği buraya gelecek..." 
                        className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 transition-all min-h-[200px] text-sm bg-gray-50/50"
                    />
                </div>
            </div>
        </div>

        {/* Bölüm 2: Yayın ve Etiket Ayarları */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Ayarlar ve Etiketler</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Etiketler (Virgülle ayırın)</label>
                    <input 
                        type="text"
                        name="tags"
                        placeholder="teknoloji, yaşam, gezi"
                        onChange={(e) => setData({...data, tags: e.target.value.split(',')})}
                        className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50/50 text-sm transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Yayın Durumu</label>
                    <select 
                        name="isPublished" 
                        onChange={blogHandle} 
                        value={data.isPublished} 
                        className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50/50 text-sm cursor-pointer"
                    >
                        <option value={false}>Taslak (Draft)</option>
                        <option value={true}>Hemen Yayınla (Published)</option>
                    </select>
                </div>
            </div>
        </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">

                <div className="flex items-center justify-between mb-1">

                    <div className="flex items-center gap-2">

                        <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Yazı Görselleri</h3>

                    </div>

                    <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold uppercase">{data.images.length} Görsel</span>

                </div>

                <div className='flex items-center gap-4 flex-wrap p-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-rose-200 transition-colors'>

                    <label className='cursor-pointer bg-white border border-gray-200 w-24 h-24 rounded-2xl hover:bg-rose-50 hover:border-rose-300 transition-all flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 group'>

                        <div className="bg-rose-100 p-2 rounded-full group-hover:bg-rose-200"><CiCamera size={24} className='text-rose-600'/></div>
                        <span className='text-[10px] text-gray-500 font-bold uppercase'>Ekle</span>
                        <input type="file" multiple accept="image/*" onChange={blogHandle} name="images" className='hidden' />

                    </label>

                    {data.images.map((img, idx) => ( <div key={idx} className="relative group w-24 h-24 animate-fadeIn">

                        <img src={img} className={`w-full h-full object-cover rounded-2xl border-2 ${idx === 0 ? 'border-rose-500 ring-4 ring-rose-50' : 'border-white shadow-md'}`} alt="blog-galeri" />
                        {idx === 0 && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold z-10">KAPAK</div>}

                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1.5">

                            <button onClick={(e) => { e.preventDefault(); removeImage(idx); }} className="self-end bg-white text-rose-600 p-1 rounded-full"><CiCircleRemove size={18} /></button>

                        </div>

                    </div>))}

                </div>

            </div>
    </div>
);

    const updateContent = (

        <div className='my-2 space-y-6 max-h-[70vh] overflow-y-auto px-2 custom-scrollbar pb-6'>

            <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">

                <div className="flex items-center justify-between mb-1">

                    <div className="flex items-center gap-2">

                        <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Yazıyı Güncelle</h3>

                    </div>

                    <span className="text-[10px] font-black text-rose-400 bg-rose-50 px-3 py-1 rounded-full uppercase italic">SLUG: {data?.slug || "Oluşturuluyor..."}</span>

                </div>

                <div className="space-y-4">

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Başlık</label>
                        <Input onChange={handleChange} name={'title'} placeholder={'Yazı başlığını güncelleyin...'} type={'text'} value={data.title} />

                    </div>

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Ana İçerik (HTML destekli)</label>
                        <textarea name="content" onChange={handleChange} value={data.content} className="w-full border-2 border-gray-50 p-4 rounded-[1.8rem] outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all min-h-[200px] text-sm bg-gray-50/50 font-medium" placeholder="Blog içeriğini buraya yazın..."/>

                    </div>

                </div>

            </div>

            <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">

                <div className="flex items-center gap-2 mb-1">

                    <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Kategori & Ayarlar</h3>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Kategori</label>

                        <select name="category" onChange={handleChange} className="w-full border-2 border-gray-50 p-3.5 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50/50 text-sm font-bold text-gray-700">

                            <option value="">Kategori Seçiniz</option>

                        </select>

                    </div>

                    <div className="flex flex-col gap-1.5">

                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Durum</label>

                        <select name="status" onChange={handleChange} value={data.status} className="w-full border-2 border-gray-50 p-3.5 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50/50 text-sm font-bold text-gray-700">

                            <option value="published">Yayında</option>
                            <option value="draft">Taslak</option>

                        </select>

                    </div>

                </div>

            </div>

            <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">

                <div className="flex items-center justify-between mb-1">

                    <div className="flex items-center gap-2">

                        <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Galeri Düzenle</h3>

                    </div>

                    <span className="text-[10px] bg-rose-500 text-white px-3 py-1 rounded-full font-black uppercase shadow-lg shadow-rose-100">{data.images.length} GÖRSEL</span>

                </div>

                <div className='flex items-center gap-4 flex-wrap p-5 rounded-[2rem] bg-[#FDFCFB] border-2 border-dashed border-gray-100'>

                    <label className='cursor-pointer bg-white border border-gray-100 w-24 h-24 rounded-[1.5rem] hover:bg-rose-50 hover:border-rose-200 transition-all flex flex-col items-center justify-center gap-2 group shadow-sm'>

                        <div className="bg-rose-50 p-2.5 rounded-2xl group-hover:bg-rose-100"><CiCamera size={26} className='text-rose-500'/></div>
                        <span className='text-[9px] text-gray-400 font-black uppercase'>Yükle</span>
                        <input type="file" multiple accept="image/*" onChange={handleChange} name="images" className='hidden' />

                    </label>

                    {data.images.map((img, idx) => ( <div key={idx} className="relative group w-24 h-24">
 
                        <img src={img.url || img} className={`w-full h-full object-cover rounded-[1.5rem] border-2 transition-all ${idx === 0 ? 'border-rose-500 ring-4 ring-rose-50' : 'border-white shadow-md'}`} alt="update-blog" />
 
                        <div className="absolute inset-0 bg-black/50 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-between p-2">
 
                            <button onClick={(e) => { e.preventDefault(); removeImage(idx); }} className="self-end bg-white text-rose-600 p-1 rounded-full"><CiCircleRemove size={18} /></button>
 
                            <div className="flex gap-2 pb-1">
 
                                {idx !== 0 && <button onClick={(e) => { e.preventDefault(); moveImage(idx, 'left'); }} className="bg-white/90 p-1 rounded text-xs font-bold">←</button>}
                                {idx !== data.images.length - 1 && <button onClick={(e) => { e.preventDefault(); moveImage(idx, 'right'); }} className="bg-white/90 p-1 rounded text-xs font-bold">→</button>}
 
                            </div>
 
                        </div>
 
                    </div>))}
 
                </div>
 
            </div>

       </div>

    );

    return (

        <div className='flex flex-col md:flex-row min-h-screen'>

            <AdminPanel />

            <div className='flex-1 p-4 sm:p-8 overflow-x-hidden'>

                <div className='max-w-7xl mx-auto'>

                    <div className="bg-white p-6 mb-10 flex flex-col sm:flex-row justify-between items-center border-b gap-4">

                        <div className="flex items-center gap-4">

                            <div className="bg-rose-500 p-4 rounded-2xl text-white shadow-lg shadow-rose-100"><FaRegNewspaper size={28} /></div>

                            <div>

                                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Blog Yönetimi</h1>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-0.5">İçerik Strateji Paneli</p>

                            </div>

                        </div>

                        <div onClick={() => dispatch(openModalFunc())} className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-rose-100 active:scale-95 cursor-pointer"><CiMemoPad size={24} /> Yeni Yazı Ekle</div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:border-rose-200 transition-all">

                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Toplam İçerik</p>
                            <h2 className="text-5xl font-black text-gray-800 mt-2 group-hover:text-rose-500 transition-colors">{filteredBlogs.length}</h2>

                        </div>

                        <div className="bg-white p-8 rounded-[35px] border border-l-8 border-l-rose-500 shadow-sm">

                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Toplam İzlenme</p>
                            <h2 className="text-5xl font-black text-gray-800 mt-2">{totalViews}</h2>

                        </div>

                        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm">

                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Durum</p>
                            <h2 className="text-2xl font-black text-gray-800 mt-2">Aktif Yayın</h2>

                        </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">

                        <div className="flex-1 relative group">

                            <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={24} />
                            <input type="text" placeholder="Başlık veya anahtar kelime ile ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border border-gray-100 p-4 pl-14 rounded-[20px] shadow-sm focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm font-medium"/>

                        </div>

                    </div>

                    {loading ? (<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>) : (<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>

                        {filteredBlogs.map((blog) => ( <div key={blog._id} className="group bg-white p-4 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-rose-100/40 transition-all duration-500 relative">

                            <div className="relative h-56 w-full mb-5 overflow-hidden rounded-[30px] shadow-inner">

                                <img src={blog.mainImage?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                                <div className="absolute top-4 left-4"><span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-2xl text-[10px] font-black text-rose-600 uppercase tracking-wider shadow-xl">{blog.category}</span></div>

                            </div>

                            <div className="px-2">

                                <div className="flex items-center gap-2 mb-2">

                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{new Date(blog.createdAt).toLocaleDateString('tr-TR')}</span>

                                </div>

                                <h3 className="font-black text-gray-800 text-base line-clamp-2 h-12 leading-tight mb-6 group-hover:text-rose-600 transition-colors">{blog.title}</h3>

                                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">

                                    <div onClick={(e) => openUpdateModalFunc(blog?._id, e)} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3.5 rounded-[18px] text-[11px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 uppercase cursor-pointer">
                                        <CiEdit size={18} /> Düzenle
                                    </div>

                                    <div onClick={() => deleteHandler(blog._id)} className="bg-rose-50 text-rose-600 p-3.5 rounded-[18px] hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer">
                                        <CiCircleRemove size={24} />
                                    </div>

                                </div>

                            </div>

                        </div>))}

                    </div>)}

                    {openModal && (<Modal title={'Yeni Blog Ekle'} content={content} btnName={'Bloğu ekle Ekle'} onClick={modalAddFunc} func={openModalFunc} />)}
                    {openUpdateModal && (<Modal title={'Blog Güncelle'} content={updateContent} btnName={'Bloğu Güncelle'} onClick={modalUpFunc} func={openUpdateModalFunc} />)}

                </div>

            </div>

        </div>
    );
};

export default BlogsAdmin;