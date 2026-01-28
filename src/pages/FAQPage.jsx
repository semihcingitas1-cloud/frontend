import React, { useState } from 'react';
import { PiCaretDownBold, PiQuestionLight, PiTruckLight, PiFlowerLight, PiShieldCheckLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const FAQPage = () => {

    const navigate = useNavigate();

    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            icon: <PiTruckLight size={24} />,
            question: "Aynı gün teslimat yapıyor musunuz?",
            answer: "Evet, saat 16:00'ya kadar verdiğiniz siparişleri aynı gün içinde özenle teslim ediyoruz. Özel günler ve yoğunluk durumlarında saat dilimleri değişiklik gösterebilir."
        },
        {
            icon: <PiFlowerLight size={24} />,
            question: "Çiçeklerim ne kadar süre taze kalır?",
            answer: "Çiçeklerimiz günlük olarak mezattan seçilir. Bakım talimatlarına (su değişimi ve sap kesimi) uyulduğu takdirde çiçekleriniz ortalama 5-7 gün boyunca tazeliğini korur."
        },
        {
            icon: <PiShieldCheckLight size={24} />,
            question: "Siparişimde kart notu ekleyebilir miyim?",
            answer: "Kesinlikle! Sipariş adımlarında 'Not Ekle' butonuna tıklayarak sevdiklerinize iletmek istediğiniz mesajı yazabilirsiniz. Notunuz özel zarfında şık bir kartla iletilir."
        },
        {
            icon: <PiQuestionLight size={24} />,
            question: "Ödeme seçenekleriniz nelerdir?",
            answer: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm işlemleriniz 256-bit SSL güvenlik sertifikası ile korunmaktadır."
        },
        {
            icon: <PiFlowerLight size={24} />,
            question: "Görseldeki ürünün aynısı mı gider?",
            answer: "Doğal ürünler oldukları için mevsimsel olarak çiçeklerin tomurcuk yapısı veya renk tonları çok küçük farklılıklar gösterebilir. Ancak aranjman tasarımı ve değeri görseldeki ile %100 aynı kalır."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Size Nasıl Yardımcı Olabiliriz?</h2>
                <p className="text-gray-500">Aklınıza takılan soruların yanıtlarını aşağıda bulabilirsiniz.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-rose-50/30"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-rose-500 bg-rose-50 p-2 rounded-lg">
                                    {faq.icon}
                                </div>
                                <span className="font-semibold text-gray-700">{faq.question}</span>
                            </div>
                            <PiCaretDownBold 
                                className={`text-rose-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                            />
                        </button>
                        
                        <div 
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
                        >
                            <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center bg-rose-50 rounded-3xl p-8 border border-rose-100">

                <h3 className="text-lg font-bold text-gray-800 mb-2">Başka bir sorunuz mu var?</h3>
                <p className="text-gray-600 text-sm mb-6">Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyar.</p>
                <button onClick={() => navigate('/contact')} className="bg-rose-500 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-600 transition shadow-lg shadow-rose-200">Bize Ulaşın</button>

            </div>

        </div>

    );
};

export default FAQPage;