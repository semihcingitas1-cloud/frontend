import React, { useState } from 'react';
import { PiPhoneLight, PiEnvelopeLight, PiMapPinLight, PiClockLight, PiTelegramLogoLight } from "react-icons/pi";

const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("Form Gönderildi:", formData);
        alert("Mesajınız başarıyla iletildi! En kısa sürede size döneceğiz.");
    };

    const contactInfo = [

        {
            icon: <PiPhoneLight size={28} />,
            title: "Telefon",
            detail: "+90 (551) 133 54 10",
            subDetail: "Hafta içi 09:00 - 19:00"
        },
        {
            icon: <PiEnvelopeLight size={28} />,
            title: "E-posta",
            detail: "destek@ciceksiteniz.com",
            subDetail: "7/24 mail atabilirsiniz"
        },
        {
            icon: <PiMapPinLight size={28} />,
            title: "Adres",
            detail: "Çiçek Sokak, No:12/A",
            subDetail: "Meram, Konya"
        }
    ];

    return (

        <div className="bg-white min-h-screen">

            <div className="bg-rose-50 py-16 px-4">

                <div className="max-w-6xl mx-auto text-center">

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Bizimle İletişime Geçin</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto italic">
                        "Sevdiklerinize göndereceğiniz çiçekler hakkında bir sorunuz mu var? 
                        Ekibimiz size yardımcı olmak için burada."
                    </p>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 mb-20">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-1 space-y-6">

                        {contactInfo.map((item, index) => ( <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-all">

                            <div className="text-rose-500 bg-rose-50 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-700 font-medium">{item.detail}</p>
                            <p className="text-gray-400 text-xs mt-1">{item.subDetail}</p>

                        </div>))}

                    </div>

                    <div className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-gray-50">

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2">

                                    <label className="text-sm font-semibold text-gray-700 ml-1">Adınız Soyadınız</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all" placeholder="Ali Yılmaz" onChange={(e) => setFormData({...formData, name: e.target.value})}/>

                                </div>

                                <div className="space-y-2">

                                    <label className="text-sm font-semibold text-gray-700 ml-1">E-posta Adresiniz</label>
                                    <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all" placeholder="ali@ornek.com" onChange={(e) => setFormData({...formData, email: e.target.value})}/>

                                </div>

                            </div>

                            <div className="space-y-2">

                                <label className="text-sm font-semibold text-gray-700 ml-1">Konu</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all" placeholder="Nasıl yardımcı olabiliriz?" onChange={(e) => setFormData({...formData, subject: e.target.value})}/>

                            </div>

                            <div className="space-y-2">

                                <label className="text-sm font-semibold text-gray-700 ml-1">Mesajınız</label>
                                <textarea rows="5" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all resize-none" placeholder="Sorunuzu veya talebinizi buraya yazın..." onChange={(e) => setFormData({...formData, message: e.target.value})} ></textarea>

                            </div>
                            <button type="submit" className="w-full bg-rose-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-rose-600 transition shadow-lg shadow-rose-200 flex items-center justify-center gap-2"><PiTelegramLogoLight size={24} /> Mesajı Gönder</button>

                        </form>

                    </div>

                </div>

                <div className="mt-20 rounded-3xl overflow-hidden shadow-sm border-8 border-white h-[450px]">

                    <iframe title="Mağaza Konumu" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49867.21553031633!2d34.667565795891875!3d38.63275972582536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152a6e4566fe8181%3A0x59d53f1bc98af56c!2zTmV2xZ9laGlyLCBOZXbFn2VoaXIgTWVya2V6L05ldsWfZWhpcg!5e0!3m2!1str!2str!4v1768669549109!5m2!1str!2str" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>

                </div>

            </div>

        </div>

    );
};

export default ContactPage;