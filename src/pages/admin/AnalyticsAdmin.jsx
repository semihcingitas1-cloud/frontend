import React from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    BarChart, Bar, PieChart, Pie, Cell, Legend, ComposedChart, Line
} from 'recharts';
import AdminPanel from '../../layout/AdminPanel';
import { 
    FaChartBar, FaCalendarCheck, FaUsers, FaWallet, 
    FaArrowUp, FaArrowDown, FaFilter, FaMapMarkerAlt, 
    FaShoppingCart, FaExclamationTriangle, FaChartLine,
    FaMobileAlt, FaDesktop, FaBoxOpen, FaHistory
} from 'react-icons/fa';

const AnalyticsAdmin = () => {

    const monthlySales = [
        { ay: 'Oca', satis: 12000, kar: 4000, hedef: 10000 },
        { ay: 'Şub', satis: 15000, kar: 5500, hedef: 14000 },
        { ay: 'Mar', satis: 11000, kar: 3800, hedef: 15000 },
        { ay: 'Nis', satis: 19000, kar: 7200, hedef: 17000 },
        { ay: 'May', satis: 24000, kar: 9800, hedef: 20000 },
        { ay: 'Haz', satis: 21000, kar: 8100, hedef: 22000 },
    ];

    const categoryStats = [
        { name: 'İç Mekan Bitkileri', value: 45, color: '#10b981' },
        { name: 'Dış Mekan Bitkileri', value: 25, color: '#3b82f6' },
        { name: 'Bahçe Ekipmanları', value: 20, color: '#f59e0b' },
        { name: 'Aksesuar', value: 10, color: '#f43f5e' },
    ];

    const topProducts = [
        { name: 'Orkide (Lila)', miktar: 85, gelir: 12750 },
        { name: 'Paşa Kılıcı', miktar: 72, gelir: 8640 },
        { name: 'Aloe Vera', miktar: 64, gelir: 3200 },
        { name: 'Antoryum', miktar: 58, gelir: 11600 },
    ];

    const funnelData = [
        { step: 'Ziyaretçi', value: 5000, fill: '#94a3b8' },
        { step: 'Ürün İnceleme', value: 2800, fill: '#6366f1' },
        { step: 'Sepete Ekleme', value: 1200, fill: '#f59e0b' },
        { step: 'Ödeme Sayfası', value: 600, fill: '#f43f5e' },
        { step: 'Satın Alma', value: 180, fill: '#10b981' },
    ];

    const cityData = [
        { city: 'İstanbul', sales: 450 }, { city: 'Ankara', sales: 320 }, { city: 'İzmir', sales: 210 }, { city: 'Bursa', sales: 150 }, { city: 'Antalya', sales: 120 },
    ];

    const heatmapData = [
        { hour: '00-04', pzt: 10, sal: 5, car: 8, per: 12, cum: 15, cmt: 25, paz: 30 },
        { hour: '04-08', pzt: 5, sal: 3, car: 4, per: 5, cum: 8, cmt: 12, paz: 10 },
        { hour: '08-12', pzt: 45, sal: 50, car: 48, per: 55, cum: 60, cmt: 40, paz: 35 },
        { hour: '12-16', pzt: 80, sal: 85, car: 75, per: 90, cum: 95, cmt: 110, paz: 120 },
        { hour: '16-20', pzt: 120, sal: 110, car: 115, per: 130, cum: 140, cmt: 160, paz: 180 },
        { hour: '20-00', pzt: 150, sal: 140, car: 160, per: 170, cum: 190, cmt: 210, paz: 230 },
    ];

    const retentionData = [
        { ay: 'Oca', yeni: 400, sadik: 200 },
        { ay: 'Şub', yeni: 300, sadik: 280 },
        { ay: 'Mar', yeni: 500, sadik: 320 },
        { ay: 'Nis', yeni: 450, sadik: 410 },
        { ay: 'May', yeni: 600, sadik: 520 },
        { ay: 'Haz', yeni: 550, sadik: 590 },
    ];

    const deviceData = [
        { name: 'Mobil', value: 65, color: '#6366f1' },
        { name: 'Masaüstü', value: 30, color: '#94a3b8' },
        { name: 'Tablet', value: 5, color: '#cbd5e1' },
    ];

    return (
        <div className='flex gap-0 bg-slate-50 min-h-screen'>
            <AdminPanel />

            <div className='flex-1 p-8 overflow-auto'>
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">MASTER ANALYTICS v3.0</h1>
                        <p className="text-slate-500 font-medium uppercase text-xs tracking-widest">Gelişmiş Mağaza Öngörüleri ve Kullanıcı Projeksiyonu</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50"><FaFilter /> Filtrele</button>
                        <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all">Dışa Aktar (.CSV)</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { title: 'Ort. Sepet Tutarı', value: '₺450', trend: '+8.2%', icon: <FaWallet />, color: 'text-blue-600' },
                        { title: 'Dönüşüm Oranı', value: '%3.4', trend: '+1.5%', icon: <FaChartBar />, color: 'text-emerald-600' },
                        { title: 'Müşteri Ömür Boyu Değeri', value: '₺2,840', trend: '+12%', icon: <FaUsers />, color: 'text-purple-600' },
                        { title: 'Sepet Terk Oranı', value: '%64', trend: '+2.4%', icon: <FaExclamationTriangle />, color: 'text-rose-600' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-slate-50 ${item.color} text-xl`}>{item.icon}</div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{item.trend}</span>
                            </div>
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.title}</h3>
                            <p className="text-2xl font-black text-slate-800">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* 1. Sıra Grafikler: Gelir & Kategori */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><FaChartLine className="text-blue-500"/> Gelir & Hedef Analizi</h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={monthlySales}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="ay" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                    <Area type="monotone" dataKey="satis" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" />
                                    <Line type="monotone" dataKey="hedef" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Kategori Popülerliği</h3>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={categoryStats} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                                        {categoryStats.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 mt-4">
                            {categoryStats.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div><span className="text-slate-500 font-medium">{item.name}</span></div>
                                    <span className="font-bold">%{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* YENİ EKLENEN: Müşteri Sadakati & Cihaz Dağılımı */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><FaHistory className="text-indigo-500"/> Müşteri Elde Tutma (Retention)</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={retentionData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="ay" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="sadik" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                                    <Area type="monotone" dataKey="yeni" stackId="1" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.4} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 text-left">Cihaz Analizi</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={deviceData} innerRadius={60} outerRadius={80} dataKey="value">
                                        {deviceData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-around mt-6 font-bold text-xs uppercase text-slate-500 tracking-tighter">
                            <div className="flex flex-col gap-1"><FaMobileAlt className="mx-auto text-xl text-indigo-500"/>Mobil %65</div>
                            <div className="flex flex-col gap-1"><FaDesktop className="mx-auto text-xl text-slate-400"/>Desktop %30</div>
                        </div>
                    </div>
                </div>

                {/* 2. Sıra Grafikler: Funnel & City (KORUNDU) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><FaShoppingCart className="text-orange-500"/> Satış Hunisi (Dönüşüm)</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="step" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} width={100} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                                        {funnelData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><FaMapMarkerAlt className="text-rose-500"/> En Çok Satış Yapılan Şehirler</h3>
                        <div className="space-y-5">
                            {cityData.map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-sm font-bold text-slate-700"><span>{item.city}</span><span>{item.sales} Sipariş</span></div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-rose-500 h-full rounded-full" style={{width: `${(item.sales / 500) * 100}%`}}></div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Sıra: Sipariş Isı Haritası (KORUNDU) */}
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white mb-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-3"><FaCalendarCheck className="text-rose-400" /> Sipariş Yoğunluk Matrisi</h3>
                        <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full italic">Koyu renkler yüksek yoğunluğu temsil eder</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-center text-xs border-separate border-spacing-1">
                            <thead><tr className="text-slate-500 uppercase tracking-widest font-black"><th>SAAT</th><th>PZT</th><th>SAL</th><th>ÇAR</th><th>PER</th><th>CUM</th><th>CMT</th><th>PAZ</th></tr></thead>
                            <tbody>
                                {heatmapData.map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-2 font-bold text-slate-400 text-left">{row.hour}</td>
                                        {[row.pzt, row.sal, row.car, row.per, row.cum, row.cmt, row.paz].map((val, idx) => (
                                            <td key={idx} className="p-3 rounded-lg transition-all hover:scale-110" style={{backgroundColor: `rgba(244, 63, 94, ${val / 250})`, color: val > 150 ? 'white' : '#94a3b8'}}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* En Çok Satan Ürünler & Stok Alarmları (GELİŞTİRİLDİ) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">En Çok Satan Ürünler (Miktar)</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topProducts} layout="vertical" margin={{ left: 40 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 500}} />
                                    <Tooltip cursor={{fill: '#f8fafc'}} />
                                    <Bar dataKey="miktar" fill="#f43f5e" radius={[0, 10, 10, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><FaBoxOpen className="text-amber-500"/> Kritik Stok & İade Uyarıları</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Lila Orkide', reason: 'Kritik Stok (3 Adet Kaldı)', type: 'stock' },
                                { name: 'Aloe Vera', reason: 'Yüksek İade Oranı (%12)', type: 'return' },
                                { name: 'Paşa Kılıcı', reason: 'Favorilere Ekleme Artıyor', type: 'trend' },
                                { name: 'Bahçe Makası', reason: 'Stok Tükendi', type: 'stock' },
                            ].map((alert, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${alert.type === 'stock' ? 'bg-rose-500' : alert.type === 'return' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{alert.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{alert.reason}</p>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">Yönet</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsAdmin;