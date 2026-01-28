import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsersForMail, sendAdminMail, resetMailStatus } from '../../redux/mailSlice';
import { getAllUsersForSMS, sendAdminSMS } from '../../redux/smsSlice';

import AdminPanel from '../../layout/AdminPanel';

import { IoMdSend, IoMdPeople, IoMdDocument, IoMdMail, IoMdChatbubbles } from 'react-icons/io';
import { BiSearch, BiCheckDouble } from 'react-icons/bi';

import { toast } from 'sonner';

const MailAdmin = () => {

    const dispatch = useDispatch();

    const { users, loading, success, error } = useSelector(state => state.mail);

    const templates = {

        mail: [

            { id: 1, title: 'Hoşgeldin Mesajı', content: 'Ailemize hoş geldiniz! Sizin için %15 indirim kodunuz: FLORA15' },
            { id: 2, title: 'Çiçek Bakımı', content: 'Aldığınız çiçeklerin ömrünü uzatmak için suyunu her gün değiştirmeyi unutmayın.' },
            { id: 3, title: 'Kampanya Duyurusu', content: 'Hafta sonuna özel tüm buketlerde 1 alana 1 bedava fırsatını kaçırmayın!' },
        ],
        sms: [

            { id: 1, title: 'Kurye Bilgisi', content: 'Ciceginiz yola cikti! Kuryemiz Ahmet yaklasik 30 dk icinde adreste olacak.' },
            { id: 2, title: 'Indirim Hatirlatma', content: 'Sadece bugune ozel tum saksilarda %20 indirim! Kod: SMS20' },
        ]
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [isBulk, setIsBulk] = useState(false);
    const [sendMode, setSendMode] = useState('mail');
    const [mailData, setMailData] = useState({ subject: '', message: '' });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        dispatch(getAllUsersForMail());
    }, [dispatch]);

    useEffect(() => {

        if (success) {

            toast.success(isBulk ? 'Tüm kullanıcılara mail gönderildi!' : `${selectedUser?.name} kişisine mail gönderildi!`);
            setMailData({ subject: '', message: '' });
            dispatch(resetMailStatus());
        }

        if (error) {

            toast.error(error);
            dispatch(resetMailStatus());
        }
    }, [success, error, dispatch]);

    const filteredUsers = users?.filter(u => 

        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTemplateSelect = (content) => {

        setMailData({ ...mailData, message: content });
        toast.info("Şablon uygulandı");
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!isBulk && !selectedUser) return toast.error("Lütfen bir alıcı seçin!");

        if (sendMode === 'mail') {

            dispatch(sendAdminMail({ to: isBulk ? "all" : selectedUser.email, subject: mailData.subject, message: mailData.message, isBulk }));
        } else {

            dispatch(sendAdminSMS({ to: isBulk ? "all" : selectedUser.phone, message: mailData.message, isBulk }));
        }
    };

    return (

        <div className='flex flex-col lg:flex-row min-h-screen bg-[#f8fafc]'>

            <AdminPanel />

            <div className='flex-1 p-4 lg:p-8 grid grid-cols-1 xl:grid-cols-12 gap-6'>

                <div className='xl:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-[calc(100vh-100px)]'>

                    <div className='p-5 border-b border-slate-100 bg-slate-50/50'>

                        <h2 className='font-bold text-slate-800 flex items-center gap-2'><IoMdPeople className='text-rose-500' /> Kullanıcılar</h2>

                        <div className='relative mt-3'>

                            <BiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                            <input type="text" placeholder="Ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-400' />

                        </div>

                    </div>

                    <div className='flex-1 overflow-y-auto p-2 space-y-1'>

                        <button type="button" onClick={() => { setIsBulk(true); setSelectedUser(null); }} className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${isBulk ? 'bg-rose-500 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'}`} >

                            <BiCheckDouble className='text-xl' />

                            <div className='text-left'>

                                <p className='text-sm font-bold'>Tümüne Gönder</p>
                                <p className='text-[10px] opacity-70'>{users?.length || 0} Kullanıcı</p>

                            </div>

                        </button>

                        <div className='h-[1px] bg-slate-100 my-2 mx-3'></div>

                        {users?.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map(u => ( <button key={u._id} onClick={() => { setSelectedUser(u); setIsBulk(false); }} className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${selectedUser?._id === u._id ? 'bg-slate-800 text-white' : 'hover:bg-slate-50 text-slate-600'}`} >

                            <div className='w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs'>{u.name.charAt(0)}</div>

                            <div className='text-left overflow-hidden'>

                                <p className='text-sm font-semibold truncate'>{u.name}</p>
                                <p className='text-[10px] opacity-60 truncate'>{sendMode === 'mail' ? u.email : u.phone}</p>

                            </div>

                        </button> ))}

                    </div>

                </div>

                <div className='xl:col-span-9 space-y-6'>

                    <div className='flex gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit'>

                        <button onClick={() => setSendMode('mail')} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${sendMode === 'mail' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} ><IoMdMail /> E-Posta</button>
                        <button onClick={() => setSendMode('sms')} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${sendMode === 'sms' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} ><IoMdChatbubbles /> SMS (Netgsm)</button>

                    </div>

                    <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8'>

                        <form onSubmit={handleSubmit} className='space-y-6'>

                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6'>

                                <div>

                                    <h1 className='text-xl font-bold text-slate-800'>{sendMode === 'mail' ? '📧 E-Posta Paneli' : '📱 SMS Paneli'}</h1>
                                    <p className='text-xs text-slate-400'>{isBulk ? 'Tüm kullanıcılara ulaşır.' : `Alıcı: ${selectedUser?.name || 'Seçilmedi'}`}</p>

                                </div>

                                <button className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-2 text-white shadow-lg transition-all active:scale-95 ${sendMode === 'mail' ? 'bg-rose-500' : 'bg-blue-500'}`}>{loading ? 'Gönderiliyor...' : 'Şimdi Gönder'} <IoMdSend /></button>

                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>

                                <div className='lg:col-span-8 space-y-4'>

                                    {sendMode === 'mail' && ( <div className='group'>

                                        <label className='text-[10px] font-black text-slate-400 uppercase mb-1 block'>E-Posta Konusu</label>
                                        <input required value={mailData.subject} onChange={(e) => setMailData({...mailData, subject: e.target.value})} className='w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-rose-200 outline-none' placeholder="Konu başlığı..." />

                                    </div> )}

                                    <div className='group relative'>

                                        <label className='text-[10px] font-black text-slate-400 uppercase mb-1 block'>{sendMode === 'mail' ? 'Mesaj İçeriği' : 'SMS Metni'}</label>
                                        <textarea required rows={sendMode === 'mail' ? "10" : "5"} value={mailData.message} onChange={(e) => setMailData({...mailData, message: e.target.value})} className={`w-full p-4 bg-slate-50 rounded-2xl border border-transparent outline-none focus:ring-2 ${sendMode === 'mail' ? 'focus:ring-rose-500/10 focus:border-rose-200' : 'focus:ring-blue-500/10 focus:border-blue-200'}`} placeholder="Mesajınızı buraya yazın..." />

                                        {sendMode === 'sms' && ( <div className='absolute bottom-3 right-4 text-[10px] font-bold text-slate-400'>
                                            {mailData.message.length} / 160 Karakter

                                        </div>)}

                                    </div>

                                </div>

                                <div className='lg:col-span-4 space-y-4'>

                                    <h3 className='text-xs font-black text-slate-400 uppercase flex items-center gap-2'>

                                        <IoMdDocument className={sendMode === 'mail' ? 'text-rose-500' : 'text-blue-500'} /> 
                                        {sendMode === 'mail' ? 'Mail Şablonları' : 'SMS Şablonları'}

                                    </h3>

                                    <div className='grid grid-cols-1 gap-3'>

                                        {(sendMode === 'mail' ? templates.mail : templates.sms).map(t => ( <div key={t.id} onClick={() => handleTemplateSelect(t.content)} className={`p-4 border border-slate-100 rounded-2xl bg-slate-50/50 cursor-pointer transition-all hover:shadow-md ${sendMode === 'mail' ? 'hover:border-rose-200' : 'hover:border-blue-200'}`}>

                                            <p className={`text-sm font-bold ${sendMode === 'mail' ? 'text-rose-600' : 'text-blue-600'}`}>{t.title}</p>
                                            <p className='text-[11px] text-slate-500 line-clamp-2 mt-1'>{t.content}</p>

                                        </div>))}

                                    </div>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default MailAdmin;