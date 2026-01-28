import React from 'react';
import { PiHeartLight, PiPlantLight, PiTruckLight, PiUsersThreeLight } from "react-icons/pi";

const AboutPage = () => {

    const stats = [

        { icon: <PiPlantLight size={32} />, value: "10.000+", label: "Taze Çiçek" },
        { icon: <PiUsersThreeLight size={32} />, value: "5.000+", label: "Mutlu Müşteri" },
        { icon: <PiTruckLight size={32} />, value: "Aynı Gün", label: "Teslimat" },
        { icon: <PiHeartLight size={32} />, value: "%100", label: "Sevgiyle Hazırlık" },
    ];

    return (

        <div className="bg-white">

            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">

                <img src="https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?q=80&w=2070" alt="Flower Shop" className="absolute inset-0 w-full h-full object-cover brightness-50"/>

                <div className="relative z-10 text-center px-4">

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Bizim Hikayemiz</h1>
                    <p className="text-rose-100 text-lg md:text-xl max-w-2xl mx-auto italic">
                        "Doğanın en zarif renklerini, en taze halleriyle sevdiklerinize ulaştırıyoruz."
                    </p>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-4 py-20">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <div>

                        <span className="text-rose-500 font-bold tracking-widest uppercase text-sm">Biz Kimiz?</span>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">Tazeliği ve Mutluluğu Kapınıza Getiriyoruz</h2>

                        <div className="space-y-4 text-gray-600 leading-relaxed">

                            <p>
                                2010 yılında küçük bir çiçek atölyesi olarak başlayan yolculuğumuz, bugün binlerce insanın en özel anlarına eşlik eden bir tutkuya dönüştü. Biz sadece çiçek satmıyoruz; biz duyguları, özlemleri ve mutlulukları taşıyoruz.
                            </p>
                            <p>
                                <strong>Daima Taze:</strong> Çiçeklerimizi her sabah gün ağarırken mezattan bizzat seçiyor, tazeliğini yitirmeden özel korumalı araçlarımızla yola çıkarıyoruz.
                            </p>
                            <p>
                                <strong>Sanatsal Tasarım:</strong> Uzman florist ekibimiz, her aranjmanı bir sanat eseri gibi özenle, renk uyumuna ve çiçeklerin diline dikkat ederek hazırlıyor.
                            </p>

                        </div>

                    </div>

                    <div className="relative">

                        <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1760" className="rounded-3xl shadow-2xl z-10 relative" alt="Flower Arrangement"/>
                        <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-rose-100 rounded-3xl -z-0"></div>

                    </div>

                </div>

            </div>

            <div className="bg-rose-50 py-16">

                <div className="max-w-6xl mx-auto px-4">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                        {stats.map((stat, index) => ( <div key={index} className="text-center group">

                            <div className="text-rose-500 flex justify-center mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <div className="text-3xl font-black text-gray-800">{stat.value}</div>
                            <div className="text-gray-500 text-sm font-medium">{stat.label}</div>

                        </div> ))}

                    </div>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-4 py-24 text-center">

                <h2 className="text-3xl font-bold text-gray-800 mb-16">Bizi Farklı Kılan Değerlerimiz</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    <div className="p-8 rounded-3xl border border-gray-100 hover:border-rose-200 transition-colors">

                        <h3 className="text-xl font-bold mb-4 text-rose-500">Sürdürülebilirlik</h3>
                        <p className="text-gray-600 text-sm">Yerel üreticileri destekliyor, ambalajlarımızda geri dönüştürülebilir malzemeler kullanmaya özen gösteriyoruz.</p>

                    </div>

                    <div className="p-8 rounded-3xl border border-gray-100 hover:border-rose-200 transition-colors">

                        <h3 className="text-xl font-bold mb-4 text-rose-500">Özenli Teslimat</h3>
                        <p className="text-gray-600 text-sm">Çiçeklerinizi özel su tüpleri ve kutularla taşıyarak, kapınıza ulaştığında bile dalındaki tazeliğini korumasını sağlıyoruz.</p>

                    </div>

                    <div className="p-8 rounded-3xl border border-gray-100 hover:border-rose-200 transition-colors">

                        <h3 className="text-xl font-bold mb-4 text-rose-500">Müşteri Memnuniyeti</h3>
                        <p className="text-gray-600 text-sm">Siparişinizin her adımında sizi bilgilendiriyor, hazırlanan ürünün fotoğrafını sizinle paylaşıyoruz.</p>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default AboutPage;