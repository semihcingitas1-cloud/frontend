import React from 'react';
import { PiScrollLight, PiInfoLight, PiShieldCheckLight } from "react-icons/pi";

const SalesAgreement = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
                
                {/* Başlık Bölümü */}
                <div className="bg-rose-50 p-8 border-b border-rose-100 text-center">
                    <PiScrollLight size={48} className="text-rose-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Mesafeli Satış Sözleşmesi</h1>
                </div>

                <div className="p-8 md:p-12 space-y-8 text-gray-700 text-sm leading-relaxed">
                    
                    {/* 1. TARAFLAR */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 border-b-2 border-rose-200 pb-2 mb-4 uppercase">1. Taraflar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-rose-600 mb-3 underline">SATICI BİLGİLERİ</h3>
                                <div className="space-y-1">
                                    <p><strong>Ticari Ünvanı:</strong> [Site Adınız] İnternet Hizmetleri A.Ş.</p>
                                    <p><strong>Adresi:</strong> [Şirket Açık Adresi]</p>
                                    <p><strong>Telefon 1:</strong> [Numara 1]</p>
                                    <p><strong>Telefon 2:</strong> [Numara 2]</p>
                                    <p><strong>E-posta:</strong> [E-posta Adresi]</p>
                                    <p><strong>Fax:</strong> [Fax Numarası]</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-rose-600 mb-3 underline">ALICI BİLGİLERİ</h3>
                                <p className="italic text-gray-400 text-xs mb-3">Sipariş sırasında beyan edilen bilgiler esas alınır.</p>
                                <div className="space-y-1">
                                    <p><strong>Ad/Soyad:</strong> [Alıcı Adı]</p>
                                    <p><strong>Telefon:</strong> [Alıcı Telefon]</p>
                                    <p><strong>E-posta:</strong> [Alıcı E-posta]</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2 & 3. KONU VE KURULMA */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 border-b-2 border-rose-200 pb-2 mb-4 uppercase">2. Sözleşmenin Konusu ve Kapsamı</h2>
                        <p className="mb-4">
                            İşbu Mesafeli Satış Sözleşmesi yukarıda bilgileri yer alan Alıcı ile Satıcı arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde elektronik ortam üzerinden kurulmuştur. Sözleşme konusu ürünlerin teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca tarafların hak ve yükümlülükleri düzenlenmektedir.
                        </p>
                        <h2 className="text-lg font-bold text-gray-900 border-b-2 border-rose-200 pb-2 mb-4 uppercase">3. Sözleşmenin Kurulması</h2>
                        <p><strong>3.1-</strong> Alıcı Sözleşme’yi okuduğunu, anladığını, haklarının ve yükümlülüklerinin bilincinde olduğunu; tüm şartları kendi özgür iradesi ile kabul ettiğini kabul ve beyan eder.</p>
                        <p><strong>3.2-</strong> Taraflar, Sözleşme hükümlerinin haksız şart teşkil etmediğini ve menfaatler dengesi bakımından bir haksızlık teşkil etmediğini kabul eder.</p>
                    </section>

                    {/* 4 & 5. ÜRÜN VE TESLİMAT SÜRESİ */}
                    <section className="bg-rose-50/30 p-6 rounded-2xl border border-rose-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase flex items-center gap-2">
                            <PiInfoLight size={20} className="text-rose-500" />
                            4. Sözleşme Konusu Ürün ve Teslimat
                        </h2>
                        <p className="mb-2"><strong>Toplam Fiyat (Vergiler Dahil):</strong> [Sipariş Özetinde Belirtilen Tutar] TL</p>
                        <p className="mb-2"><strong>İade Taşıyıcısı:</strong> Kargo</p>
                        <p className="mb-4"><strong>Cayma Bildirim Adresi:</strong> [Şirket Mail/Adres]</p>
                        <div className="border-t border-rose-100 pt-4">
                            <h3 className="font-bold mb-1 uppercase">5. Ürün Teslimat Süresi</h3>
                            <p className="text-rose-800 font-medium italic underline">Çiçek ürünleri, sipariş sırasında seçilen tarih ve saat dilimi içerisinde teslim edilecektir.</p>
                        </div>
                    </section>

                    {/* 6. GENEL HÜKÜMLER */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 border-b-2 border-rose-200 pb-2 mb-4 uppercase">6. Genel Hükümler</h2>
                        <div className="space-y-3 text-xs md:text-sm text-gray-600">
                            <p><strong>6.1.</strong> Alıcı, ürünün temel nitelikleri, fiyatı ve ödeme şekli ile teslimata ilişkin tüm ön bilgileri okuyup teyit ettiğini beyan eder.</p>
                            <p><strong>6.2.</strong> Ürün, yasal 30 günlük süreyi aşmamak kaydıyla Alıcı veya gösterdiği adresteki kişi/kuruluşa teslim edilir. Gecikme halinde Alıcı sözleşmeyi feshedebilir.</p>
                            <p><strong>6.3.</strong> Teslim edilecek kişinin teslimatı kabul etmemesinden Satıcı sorumlu tutulamaz.</p>
                            <p><strong>6.4.</strong> Satıcı, ürünün sağlam, eksiksiz ve siparişe uygun tesliminden sorumludur.</p>
                            <p><strong>6.5.</strong> Ürün bedelinin ödenmemesi veya banka kayıtlarında iptal edilmesi halinde Satıcı’nın teslim yükümlülüğü sona erer.</p>
                            <p><strong>6.6.</strong> İfa imkansızlığı durumunda Satıcı 3 gün içinde bildirim yapıp 14 gün içinde bedel iadesi sağlar.</p>
                            <p><strong>6.7.</strong> Satıcı, taşıyıcıya teslim edilene kadar oluşan hasarlardan sorumludur.</p>
                            <p><strong>6.8.</strong> Aksi belirtilmedikçe teslimat masrafları Alıcı’ya aittir.</p>
                            <p><strong>6.9.</strong> Yeniden satış amaçlı toplu alımlarda Satıcı’nın siparişi iptal etme hakkı saklıdır.</p>
                        </div>
                    </section>

                    {/* 7. CAYMA HAKKI (ÖZEL KRİTİK BÖLÜM) */}
                    <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase">7. Cayma Hakkı</h2>
                        <p className="mb-3 text-xs md:text-sm">Tüketici, 14 gün içerisinde gerekçe göstermeksizin cayma hakkını kullanabilir.</p>
                        <div className="bg-white p-4 rounded-xl border-l-4 border-amber-500 text-[12px] md:text-xs text-gray-800">
                            <p className="font-bold mb-2">ÖNEMLİ İSTİSNA (7.2 ve 7.7 maddeleri uyarınca):</p>
                            <p className="mb-2">Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların (<strong>Canlı Çiçek, Gıda vb.</strong>) teslimine ilişkin sözleşmelerde <strong>CAYMA HAKKI KULLANILAMAZ.</strong></p>
                            <p>Ayrıca tüketicinin özel istekleri doğrultusunda hazırlanan (Kişiye özel tasarım, isim yazılı ürünler) ürünlerde de iade kabul edilmemektedir.</p>
                        </div>
                    </section>

                    {/* 8 & 9. DELİL VE MAHKEME */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="font-bold text-gray-900 uppercase mb-2">8. Delil Sözleşmesi</h2>
                            <p className="text-xs text-gray-500">Satıcı kayıtları (sunucu, bilgisayar kayıtları vb.) HMK 193 uyarınca kesin delil teşkil eder.</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 uppercase mb-2">9. Yetkili Mahkeme</h2>
                            <p className="text-xs text-gray-500">Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.</p>
                        </div>
                    </section>

                </div>

                {/* Alt Onay Bilgisi */}
                <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold text-sm mb-1">
                        <PiShieldCheckLight size={20} />
                        Elektronik Olarak Teyit Edilmiştir
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                        İşbu sözleşme taraflarca okunup kabul edilmiş olup <br /> 6502 sayılı kanun hükümleri geçerlidir.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SalesAgreement;