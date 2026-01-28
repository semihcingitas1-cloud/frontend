import React, { useState } from 'react';
import { PiShieldCheckLight, PiLockKeyLight, PiCookieLight, PiEyeLight, PiPhoneCallLight } from "react-icons/pi";

const PrivacyPolicy = () => {

    const [activeTab, setActiveTab] = useState('privacy');

    return (

        <div className="bg-gray-50 min-h-screen py-12 px-4">

            <div className="max-w-5xl mx-auto">
                
                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">

                    <button onClick={() => setActiveTab('privacy')} className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'privacy' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-500 hover:bg-gray-50'}`} >

                        <PiLockKeyLight size={24} /> Gizlilik Sözleşmesi

                    </button>

                    <button onClick={() => setActiveTab('kvkk')} className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'kvkk' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-500 hover:bg-gray-50'}`} >

                        <PiShieldCheckLight size={24} /> KVKK Aydınlatma Metni

                    </button>

                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {activeTab === 'privacy' ? ( <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">

                            <PiLockKeyLight className="text-rose-500" /> Gizlilik Sözleşmesi

                        </h2>

                        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">

                            <p className="bg-rose-50 p-4 rounded-xl text-rose-800 italic">
                                İşbu sözleşme Flora Haven İnternet Hizmetleri A.Ş. mülkiyetindeki www.ornekciceksitesi.com ziyaretçilerinin gizlilik haklarını korumak amacıyla hazırlanmıştır.
                            </p>

                            <section>
                                <h3 className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-widest">Veri İşleme ve Muhafaza</h3>
                                <p>6698 sayılı KVKK kapsamında; ad, soyad, e-posta, T.C. Kimlik No gibi verileriniz siparişlerin yönetimi, ödeme işlemleri, pazarlama faaliyetleri ve üyelik yönetimi amacıyla güvenli arşivlerimizde muhafaza edilebilir ve işlenebilir.</p>
                            </section>

                            <section className="flex gap-4 items-start bg-gray-50 p-6 rounded-2xl">

                                <PiCookieLight size={32} className="text-rose-500 shrink-0" />

                                <div>

                                    <h3 className="font-bold text-gray-800 mb-1">Çerez (Cookie) Kullanımı</h3>
                                    <p className="text-xs">Hizmetlerimizi bireyselleştirmek ve istatistiki bilgi toplamak amacıyla çerezler kullanılmaktadır. Tarayıcınızdan bunları kapatabilirsiniz ancak bu durum bazı teknik aksaklıklara yol açabilir.</p>

                                </div>

                            </section>

                            <section>

                                <h3 className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-widest">Ticari İletişim</h3>
                                <p>Mevzuata uygun olarak her türlü ürün tanıtımı, kampanya ve reklam amaçlı SMS, e-posta ve anlık bildirimler tarafınıza gönderilebilir. İstediğiniz an bu iletişimi durdurma hakkına sahipsiniz.</p>

                            </section>

                            <section className="border-t pt-6">

                                <h3 className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-widest">Fikri Mülkiyet</h3>
                                <p>Sitemizdeki her türlü bilgi, içerik ve tasarımın mülkiyet hakları, üçüncü kişilere ait olanlar hariç, tamamen [Site Adı]’na aittir.</p>

                            </section>

                        </div>

                    </div>

                    ) : ( <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"><PiShieldCheckLight className="text-emerald-500" /> KVKK Aydınlatma Metni</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">

                                <h4 className="font-bold text-emerald-900 mb-2">Yasal Dayanak</h4>
                                <p className="text-xs text-emerald-800 leading-normal">6698 Sayılı KVKK, 6563 Sayılı E-Ticaret Kanunu ve 6502 Sayılı Tüketici Kanunu kapsamında verileriniz yasal güvence altındadır.</p>

                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">

                                <h4 className="font-bold text-blue-900 mb-2">Veri Güvenliği</h4>
                                <p className="text-xs text-blue-800 leading-normal">Paylaştığınız veriler tamamen [Site Adı] kontrolü ve denetimi altındadır, izinsiz 3. şahıslarla paylaşılmaz.</p>

                            </div>

                        </div>

                        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">

                            <section>

                                <h3 className="font-bold text-gray-800 mb-4 underline">Veri İşleme Amaçlarımız</h3>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 list-disc ml-4">

                                    <li>Kimlik doğrulama işlemleri</li>
                                    <li>Sözleşme yükümlülüklerinin ifası</li>
                                    <li>Kampanya ve anket yönetimi</li>
                                    <li>Kamu güvenliği bilgilendirmeleri</li>
                                    <li>Müşteri memnuniyet analizi</li>
                                    <li>Yasal hakların kullanımı</li>

                                </ul>

                            </section>

                            <section className="bg-gray-900 text-gray-100 p-8 rounded-3xl">

                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><PiEyeLight className="text-rose-400" /> KVKK Kapsamındaki Haklarınız</h3>

                                <div className="text-[12px] grid grid-cols-1 md:grid-cols-2 gap-4 opacity-90">

                                    <p>• Veri işlenip işlenmediğini öğrenme</p>
                                    <p>• İşlenme amacına uygunluğu sorgulama</p>
                                    <p>• Eksik verilerin düzeltilmesini isteme</p>
                                    <p>• Verilerin silinmesini talep etme</p>
                                    <p>• Aktarılan 3. kişileri bilme</p>
                                    <p>• Zararın giderilmesini talep etme</p>

                                </div>

                            </section>

                        </div>

                    </div>)}

                    <div className="bg-gray-50 p-8 border-t border-gray-100">

                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                            <div className="flex items-center gap-4">

                                <div className="bg-white p-3 rounded-full shadow-sm">

                                    <PiPhoneCallLight size={24} className="text-rose-500" />

                                </div>

                                <div className="text-left">

                                    <h5 className="font-bold text-gray-800">Bize Ulaşın</h5>
                                    <p className="text-xs text-gray-500">info@florahaven.com | +90 (551) 133 54 10</p>

                                </div>

                            </div>

                            <div className="text-xs text-gray-400 max-w-xs text-center md:text-right">
                                Flora Haven İNTERNET HİZMETLERİ A.Ş. <br />
                                Köyceğiz / Meram / Konya
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default PrivacyPolicy;