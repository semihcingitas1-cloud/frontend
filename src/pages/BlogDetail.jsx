import React from 'react';
import { FaCalendarAlt, FaTag, FaArrowLeft, FaShareAlt, FaUser } from 'react-icons/fa';

const BlogDetail = () => {
    // Statik Veri (Backend bağlamadan önce test etmen için)
    const post = {
        title: "Evde Bakımı En Kolay 5 Çiçek",
        category: "Bakım Rehberi",
        date: "24 Mayıs 2024",
        excerpt: "Bitki bakmaya yeni başlayanlar için ölmesi imkansız, bakımı kolay ve evinizi güzelleştirecek en iyi 5 bitkiyi seçtik.",
        content: `Bitki yetiştirmeye başlamak bazen korkutucu olabilir. Hangi bitki ne kadar ışık ister, ne zaman sulanmalı gibi sorular kafanızı karıştırabilir. Ancak bazı bitkiler vardır ki, ihmal edilmeye bile dayanıklıdır. 
        
        1. Paşa Kılıcı: Az ışıkta bile büyür, haftalarca su istemez.
        2. Aloe Vera: Hem şifalıdır hem de çok az ilgi bekler.
        3. Salon Yaprağı: Karanlık köşelerin en iyi dostudur.
        
        Bu rehberimizde bu bitkilerin neden bu kadar dayanıklı olduğunu ve küçük ipuçlarıyla nasıl devasa hale getirebileceğinizi anlatıyoruz.`,
        images: [
            { url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000" },
            { url: "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1000" }
        ],
        comments: [
            { id: 1, user: "Ayşe Yılmaz", text: "Çok faydalı bir yazı olmuş, teşekkürler!", date: "2 saat önce" },
            { id: 2, user: "Mehmet Demir", text: "Paşa kılıcı gerçekten çok dayanıklı, herkese tavsiye ederim.", date: "5 saat önce" }
        ]
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Üst Kısım: Resim ve Başlık */}
            <div className="relative h-[450px] w-full">
                <img 
                    src={post.images[0].url} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full text-white">
                        <button className="flex items-center gap-2 mb-6 text-sm hover:underline">
                            <FaArrowLeft /> Blog Listesine Dön
                        </button>
                        <span className="bg-rose-500 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight">{post.title}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                {/* Meta Bilgiler */}
                <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8 border-b pb-6">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-rose-500" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaUser className="text-rose-500" />
                        <span>Admin</span>
                    </div>
                    <button className="ml-auto flex items-center gap-2 text-gray-800 font-bold border px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
                        <FaShareAlt /> Paylaş
                    </button>
                </div>

                {/* İçerik */}
                <div className="prose prose-lg max-w-none text-gray-800">
                    <p className="text-2xl text-gray-500 leading-relaxed mb-8 italic border-l-8 border-rose-100 pl-6">
                        {post.excerpt}
                    </p>
                    <div className="whitespace-pre-line text-lg leading-loose">
                        {post.content}
                    </div>

                    {/* Ekstra Resimler */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
                        {post.images.map((img, idx) => (
                            <img key={idx} src={img.url} className="rounded-3xl shadow-xl w-full h-72 object-cover" alt="Detay" />
                        ))}
                    </div>
                </div>

                {/* Yorumlar Bölümü (Statik) */}
                <div className="mt-20 border-t pt-10">
                    <h3 className="text-3xl font-bold mb-10 text-gray-900">Okuyucu Yorumları ({post.comments.length})</h3>
                    <div className="space-y-8">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4 p-6 bg-rose-50/30 rounded-3xl border border-rose-100">
                                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-600 font-bold shrink-0">
                                    {comment.user[0]}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-gray-900">{comment.user}</h4>
                                        <span className="text-xs text-gray-400">{comment.date}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;