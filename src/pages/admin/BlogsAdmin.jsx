import React from 'react';
import { CiCamera, CiCircleRemove, CiMemoPad, CiSearch, CiEdit, CiBoxList } from 'react-icons/ci';
import { FaRegNewspaper } from 'react-icons/fa';
import AdminPanel from '../../layout/AdminPanel';

const dummyBlogs = [

    { id: 1, title: "Evde Bakımı En Kolay 5 Çiçek", category: "Bakım Rehberi", date: "24 Mayıs 2024", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000" },
    { id: 2, title: "Salon Bitkileri İçin Işık Rehberi", category: "Dekorasyon", date: "12 Haziran 2024", image: "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1000" }
];

const BlogsAdmin = () => {

    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-[#FAFAFA]'>

            <AdminPanel />

            <div className='flex-1 p-4 sm:p-8 overflow-x-hidden'>
                <div className='max-w-7xl mx-auto'>
                    
                    <div className="bg-white rounded-[30px] border border-gray-100 p-6 mb-10 flex flex-col sm:flex-row justify-between items-center shadow-sm gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-rose-500 p-4 rounded-2xl text-white shadow-lg shadow-rose-100">
                                <FaRegNewspaper size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Blog Yönetimi</h1>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-0.5">İçerik Strateji Paneli</p>
                            </div>
                        </div>
                        
                        <button className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-rose-100 active:scale-95">
                            <CiMemoPad size={24} /> Yeni Yazı Ekle
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:border-rose-200 transition-all">
                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Toplam İçerik</p>
                            <h2 className="text-5xl font-black text-gray-800 mt-2 group-hover:text-rose-500 transition-colors">24</h2>
                        </div>
                        <div className="bg-white p-8 rounded-[35px] border border-l-8 border-l-rose-500 shadow-sm">
                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Okunma Sayısı</p>
                            <h2 className="text-5xl font-black text-gray-800 mt-2">1.2K</h2>
                        </div>
                        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm">
                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Aktif Kategoriler</p>
                            <h2 className="text-5xl font-black text-gray-800 mt-2">8</h2>
                        </div>
                    </div>

                    {/* Filtreleme ve Arama */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex-1 relative group">
                            <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={24} />
                            <input 
                                type="text" 
                                placeholder="Başlık veya anahtar kelime ile ara..." 
                                className="w-full bg-white border border-gray-100 p-4 pl-14 rounded-[20px] shadow-sm focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm font-medium"
                            />
                        </div>
                        <select className="bg-white border border-gray-100 px-8 py-4 rounded-[20px] shadow-sm text-gray-500 font-bold text-sm outline-none cursor-pointer hover:border-rose-200 transition-all">
                            <option>Tüm Kategoriler</option>
                            <option>Bakım Rehberi</option>
                            <option>Dekorasyon</option>
                        </select>
                    </div>

                    {/* Blog Listesi (Kart Görünümü) */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {dummyBlogs.map((blog, i) => (
                            <div key={i} className="group bg-white p-4 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-rose-100/40 transition-all duration-500 relative">
                                <div className="relative h-56 w-full mb-5 overflow-hidden rounded-[30px] shadow-inner">
                                    <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-2xl text-[10px] font-black text-rose-600 uppercase tracking-wider shadow-xl">{blog.category}</span>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{blog.date}</span>
                                    </div>
                                    <h3 className="font-black text-gray-800 text-base line-clamp-2 h-12 leading-tight mb-6 group-hover:text-rose-600 transition-colors">{blog.title}</h3>
                                    
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3.5 rounded-[18px] text-[11px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 uppercase">
                                            <CiEdit size={18} /> Düzenle
                                        </button>
                                        <button className="bg-rose-50 text-rose-600 p-3.5 rounded-[18px] hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95">
                                            <CiCircleRemove size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sayfalama */}
                    <div className="mt-16 flex justify-center gap-3">
                        <button className="w-14 h-14 rounded-2xl bg-rose-500 text-white shadow-xl shadow-rose-200 flex items-center justify-center font-black transition-transform active:scale-90">1</button>
                        <button className="w-14 h-14 rounded-2xl bg-white text-gray-400 shadow-sm border border-gray-100 flex items-center justify-center font-black hover:bg-rose-50 hover:text-rose-500 transition-all">2</button>
                        <button className="w-14 h-14 rounded-2xl bg-white text-gray-400 shadow-sm border border-gray-100 flex items-center justify-center font-black hover:bg-rose-50 hover:text-rose-500 transition-all">3</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsAdmin;