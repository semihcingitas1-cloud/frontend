import React from 'react';
import { PiArrowCounterClockwiseLight, PiWarningCircleBold, PiTruckLight, PiCheckCircleLight } from "react-icons/pi";

const ReturnPolicy = () => {

    return (

        <div className="bg-gray-50 min-h-screen py-12 px-4">

            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
                
                <div className="bg-rose-50 p-8 border-b border-rose-100 text-center">

                    <PiArrowCounterClockwiseLight size={48} className="text-rose-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">İade ve İptal Politikası</h1>
                    <p className="text-gray-500 text-sm mt-2">Müşteri memnuniyeti ve yasal haklarınız bizim için önemlidir.</p>

                </div>

                <div className="p-8 md:p-12 space-y-8 text-gray-700 text-sm leading-relaxed">
                    
                    <section>

                        <p className="mb-6">
                            6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca; Tüketici, satın aldığı malı teslim tarihinden itibaren **on dört (14) gün** içerisinde herhangi bir gerekçe göstermeksizin ve hiçbir hukuki/cezai sorumluluk üstlenmeksizin cayma hakkını kullanabilir.
                        </p>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">

                            <h3 className="font-bold text-gray-800 uppercase flex items-center gap-2">

                                <PiCheckCircleLight size={20} className="text-emerald-500" />
                                Süreç Başlangıcı Esasları

                            </h3>

                            <ul className="space-y-2 ml-2">

                                <li><strong>a)</strong> Tek siparişle ayrı ayrı teslim edilen ürünlerde; son ürünün teslim alındığı gün,</li>
                                <li><strong>b)</strong> Birden fazla parçadan oluşan ürünlerde; son parçanın teslim alındığı gün,</li>
                                <li><strong>c)</strong> Düzenli teslimat yapılan sözleşmelerde; ilk ürünün teslim alındığı gün esas alınır.</li>

                            </ul>

                        </div>

                    </section>

                    <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">

                        <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">

                            <PiWarningCircleBold size={24} className="text-amber-600" />
                            1. Cayma Hakkının Kullanılamayacağı Haller

                        </h2>

                        <p className="mb-4 font-semibold text-amber-800">Aşağıdaki durumlarda Tüketici cayma hakkını kullanamaz:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] md:text-xs text-amber-900/80">

                            <p><strong>(i)</strong> Kişisel ihtiyaçlar doğrultusunda hazırlanan mallar.</p>
                            <p className="bg-white/50 p-2 rounded-lg border border-amber-200 text-amber-900 font-bold">(ii) Çabuk bozulabilen veya son kullanma tarihi geçebilecek mallar (Canlı Çiçek vb.).</p>
                            <p><strong>(iii)</strong> Hijyen açısından iadesi uygun olmayan ürünler.</p>
                            <p><strong>(vi)</strong> Gazete, dergi gibi süreli yayınlar.</p>
                            <p><strong>(vii)</strong> Belirli bir tarihte yapılması gereken yiyecek-içecek tedariki.</p>
                            <p><strong>(viii)</strong> Elektronik ortamda anında ifa edilen hizmetler.</p>

                        </div>

                        <p className="mt-4 text-[11px] italic">* Mesafeli Sözleşmeler Yönetmeliği Madde 15/1-a gereği kişiye özel ürünlerde de cayma hakkı bulunmamaktadır.</p>

                    </section>

                    <section className="space-y-4">

                        <h2 className="text-lg font-bold text-gray-900 border-b-2 border-rose-200 pb-2 uppercase">Geri Ödeme ve İade Süreci</h2>
                        
                        <div className="flex gap-4 items-start">

                            <div className="bg-rose-100 text-rose-600 p-2 rounded-lg font-bold">2</div>
                            <p>Cayma bildiriminin ulaşmasından itibaren en geç **on dört (14) gün** içerisinde toplam bedel hiçbir masraf yansıtılmaksızın iade edilir.</p>

                        </div>

                        <div className="flex gap-4 items-start">

                            <div className="bg-rose-100 text-rose-600 p-2 rounded-lg font-bold">3</div>
                            <p>Tüketici, ürünü teknik özelliklerine ve kullanım talimatlarına uygun kullandığı sürece meydana gelen değişikliklerden sorumlu değildir.</p>

                        </div>

                        <div className="flex gap-4 items-start">

                            <div className="bg-rose-100 text-rose-600 p-2 rounded-lg font-bold">4</div>

                            <div className="space-y-2">

                                <p>İade kargo bedeli, Satıcı'nın anlaşmalı kargo şirketi ile gönderildiği sürece **Satıcı'ya aittir.**</p>
                                <p className="text-xs text-gray-400 italic flex items-center gap-1"><PiTruckLight /> Farklı bir kargo şirketi tercih edilmesi durumunda hasar sorumluluğu Alıcı'ya aittir.</p>

                            </div>

                        </div>

                        <div className="flex gap-4 items-start">

                            <div className="bg-rose-100 text-rose-600 p-2 rounded-lg font-bold">5</div>
                            <p>Tüketici, cayma bildiriminden itibaren **on (10) gün** içinde malı Satıcı’ya geri göndermekle yükümlüdür.</p>

                        </div>

                    </section>

                </div>

                <div className="bg-gray-50 p-8 text-center border-t border-gray-100">

                    <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">İşbu politika 6502 Sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği <br /> standartlarına uygun olarak hazırlanmıştır.</p>

                </div>

            </div>

        </div>
    );
};

export default ReturnPolicy;