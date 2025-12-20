import React, { useState } from 'react';
import AdminPanel from '../../layout/AdminPanel';
import { 
  User, Lock, Bell, Globe, Camera, Save, ShieldCheck, 
  Instagram, Phone, Mail, CheckCircle2, 
  Clock, MapPin, Store, CreditCard, Activity, AlertCircle,
  Hash, Image as ImageIcon
} from 'lucide-react';

const SettingsAdmin = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const tabs = [
    { id: 'profil', name: 'Profil Ayarları', icon: <User size={20} /> },
    { id: 'guvenlik', name: 'Güvenlik', icon: <Lock size={20} /> },
    { id: 'bildirim', name: 'Bildirimler', icon: <Bell size={20} /> },
    { id: 'site', name: 'Site Ayarları', icon: <Globe size={20} /> },
    { id: 'magaza', name: 'Mağaza & Ödeme', icon: <Store size={20} /> },
  ];

  return (
    <div className='flex min-h-screen bg-[#FDFCFB] font-sans'>
      {/* SOL MENÜ (Layout'tan gelen sabit sidebar) */}
      <AdminPanel />
      
      {/* ANA İÇERİK ALANI */}
      <div className="flex-1 p-4 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* 1. ÜST BİLGİ VE SİSTEM DURUMU ÇUBUĞU */}
          <div className="bg-white rounded-[2.5rem] p-6 mb-8 border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-6 transition-all hover:shadow-md">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-rose-50 rounded-[1.2rem] flex items-center justify-center text-rose-500 shadow-inner">
                <Activity size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Kontrol Merkezi</h1>
                <p className="text-xs text-green-500 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span> Veritabanı Bağlı (Postgres)
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:block text-right border-r border-gray-100 pr-6">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Son Yedekleme</p>
                <p className="text-sm font-bold text-gray-700">Bugün, 04:20</p>
              </div>
              <button className="bg-rose-50 text-rose-500 p-4 rounded-2xl hover:bg-rose-100 transition-all group">
                <AlertCircle size={22} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* 2. SOL NAVİGASYON (TABS) */}
            <div className="w-full lg:w-72 space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.8rem] font-black transition-all duration-500 group ${
                    activeTab === tab.id 
                    ? 'bg-rose-500 text-white shadow-2xl shadow-rose-200 -translate-y-1' 
                    : 'bg-white text-gray-400 hover:bg-rose-50 hover:text-rose-500 border border-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4 text-sm tracking-wide">
                    {tab.icon}
                    {tab.name}
                  </div>
                  <CheckCircle2 size={16} className={`transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>

            {/* 3. ANA AYAR PANELİ (DİNAMİK İÇERİK) */}
            <div className="flex-1 bg-white rounded-[3.5rem] shadow-sm border border-gray-50 p-8 md:p-12 relative">
              
              {/* PROFİL AYARLARI */}
              {activeTab === 'profil' && (
                <div className="animate-fadeIn space-y-10">
                  <div className="flex flex-col sm:flex-row items-center gap-10">
                    <div className="relative group">
                      <div className="w-36 h-36 rounded-[2.5rem] bg-rose-50 border-[6px] border-white shadow-2xl overflow-hidden rotate-2 group-hover:rotate-0 transition-all duration-500">
                        <img src="https://via.placeholder.com/150" alt="Admin" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform" />
                      </div>
                      <label className="absolute -bottom-3 -right-3 bg-gray-900 p-4 rounded-2xl text-white cursor-pointer hover:bg-rose-600 transition-all shadow-xl">
                        <Camera size={20} />
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-3xl font-black text-gray-800">Profil Bilgileri</h2>
                      <p className="text-gray-400 font-medium mt-1">Yönetici kimliğinizi ve erişim bilgilerinizi güncelleyin.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Tam Ad Soyad</label>
                      <input type="text" className="input-field" placeholder="Admin Adı" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">E-Posta Adresi</label>
                      <input type="email" className="input-field" placeholder="admin@cicekci.com" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Admin Notları / Biyografi</label>
                      <textarea className="input-field min-h-[120px] resize-none" placeholder="Kısa bir açıklama ekleyin..."></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* MAĞAZA VE ÖDEME AYARLARI */}
              {activeTab === 'magaza' && (
                <div className="animate-fadeIn space-y-10">
                  <div className="flex items-center justify-between bg-gray-50 p-6 rounded-[2rem]">
                    <div>
                      <h2 className="text-xl font-black text-gray-800">Dijital & Fiziksel Mağaza</h2>
                      <p className="text-sm text-gray-500">Satış kanallarınızın durumunu yönetin.</p>
                    </div>
                    <button 
                      onClick={() => setIsStoreOpen(!isStoreOpen)}
                      className={`px-8 py-3 rounded-2xl font-black text-xs tracking-tighter transition-all shadow-sm ${isStoreOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {isStoreOpen ? 'MAĞAZA ŞU AN AÇIK' : 'MAĞAZA ŞU AN KAPALI'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <h3 className="font-bold text-gray-700 flex items-center gap-2"><Clock size={18} className="text-rose-500" /> Çalışma Saatleri</h3>
                       <div className="space-y-3">
                         <input type="text" className="input-field py-3 text-sm" defaultValue="Hafta İçi: 09:00 - 22:00" />
                         <input type="text" className="input-field py-3 text-sm" defaultValue="Hafta Sonu: 10:00 - 18:00" />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <h3 className="font-bold text-gray-700 flex items-center gap-2"><CreditCard size={18} className="text-rose-500" /> Ödeme Altyapısı</h3>
                       <select className="input-field py-4 appearance-none cursor-pointer font-bold text-rose-500">
                          <option>Iyzico API (Aktif)</option>
                          <option>PayTR Entegrasyonu</option>
                          <option>Banka Havalesi / EFT</option>
                       </select>
                    </div>
                  </div>
                </div>
              )}

              {/* BİLDİRİM AYARLARI */}
              {activeTab === 'bildirim' && (
                <div className="animate-fadeIn space-y-8">
                  <h2 className="text-2xl font-black text-gray-800">Akıllı Bildirimler</h2>
                  <div className="grid gap-4">
                    {[
                      { t: "Yeni Sipariş", d: "Sipariş geldiğinde tarayıcıda sesli uyarı ver.", check: true },
                      { t: "Stok Uyarısı", d: "Ürün stoğu 5'in altına düştüğünde mail at.", check: true },
                      { t: "Yeni Üyelik", d: "Yeni bir müşteri kayıt olduğunda bildirim gönder.", check: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-[#FDFCFB] border border-gray-50 rounded-[2rem] hover:border-rose-100 transition-colors">
                        <div>
                          <p className="font-black text-gray-800">{item.t}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.d}</p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 cursor-pointer">
                           <input type="checkbox" className="sr-only peer" defaultChecked={item.check} />
                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SİTE AYARLARI */}
              {activeTab === 'site' && (
                <div className="animate-fadeIn space-y-10">
                  <div className="p-10 border-4 border-dashed border-gray-50 rounded-[3rem] text-center group hover:border-rose-100 transition-all">
                    <div className="w-20 h-20 bg-rose-50 rounded-3xl mx-auto flex items-center justify-center text-rose-500 mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon size={32} />
                    </div>
                    <p className="font-black text-gray-800">Ana Site Logosu</p>
                    <p className="text-xs text-gray-400 mb-4">Önerilen boyut: 200x50px PNG</p>
                    <button className="text-rose-500 text-sm font-black uppercase tracking-widest border-b-2 border-rose-500 pb-1">Yeni Logo Yükle</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Instagram className="absolute left-5 top-5 text-gray-300" size={20} />
                      <input type="text" className="input-field pl-14" placeholder="Instagram Adresi" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-5 top-5 text-gray-300" size={20} />
                      <input type="text" className="input-field pl-14" placeholder="Müşteri Destek Hattı" />
                    </div>
                  </div>
                </div>
              )}

              {/* GÜVENLİK AYARLARI */}
              {activeTab === 'guvenlik' && (
                <div className="animate-fadeIn space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
                      <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 italic">Erişim Güvenliği</h2>
                  </div>
                  <div className="space-y-5 max-w-md">
                    <input type="password" placeholder="Mevcut Şifreniz" className="input-field" />
                    <input type="password" placeholder="Yeni Şifre Belirleyin" className="input-field" />
                    <input type="password" placeholder="Yeni Şifre (Tekrar)" className="input-field" />
                    <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 text-amber-700">
                       <AlertCircle size={20} className="shrink-0" />
                       <p className="text-xs font-bold leading-relaxed">Güvenlik için şifrenizi her 3 ayda bir değiştirmenizi öneririz.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ALT AKSİYON ÇUBUĞU (SABİT) */}
              <div className="mt-16 pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-full">
                  <Hash size={14} className="text-rose-400" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Admin UID: NV-2025-001</span>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button className="flex-1 md:px-10 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all uppercase">Vazgeç</button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-gray-900 text-white px-12 py-5 rounded-[1.8rem] font-black hover:bg-rose-500 transition-all duration-500 shadow-2xl active:scale-95 group">
                    <Save size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                    <span className="uppercase tracking-widest text-sm">Ayarları Güncelle</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL STYLES & ANIMATIONS */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background-color: #F9FAFB;
          border: 2px solid transparent;
          border-radius: 1.5rem;
          outline: none;
          font-weight: 600;
          color: #374151;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-field:focus {
          background-color: white;
          border-color: #FDA4AF;
          box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SettingsAdmin;