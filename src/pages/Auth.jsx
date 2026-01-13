import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, register } from '../redux/userSlice.js';

import { Mail, Lock, User, Phone, Flower } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

const AuthPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuth } = useSelector(state => state.user);

    const [isLogin, setIsLogin] = useState(true);
    const [signUp, setSignUp] = useState(true);
    const [data, setData] = useState({name: "", email: "", phone: "", password: "", avatar: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"});
    const [preview, setPreview] = useState('https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg');

    const registerFunc = () => {

        dispatch(register(data));
    };

    const loginFunc = () => {

        dispatch(login(data));
    };

    const handleChange = (e) => {

        if (e.target.name === 'avatar') {

            const file = e.target.files[0];

            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {

                if (reader.readyState === 2) {

                    setData(prev => ({ ...prev, avatar: reader.result }));
                    setPreview(reader.result);
                }
            };

            reader.readAsDataURL(file);

        } else {

            setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }

    };

    useEffect(() => {

        if(isAuth){

            navigate('/');
        }
    },[isAuth]);

  return (

    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">

        <div className="relative max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px]">
        
            <div className="relative w-full h-full flex min-h-[600px]">

                <div className="w-1/2 p-8 md:p-12 flex flex-col justify-center">

                    <h2 className="text-3xl font-bold text-rose-500 mb-6 text-center">Hesap Oluştur</h2>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                        <div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={20} /><input onChange={handleChange} value={data.name} name='name' type="text" placeholder="Ad Soyad" className="input-style" /></div>
                        <div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={20} /><input onChange={handleChange} value={data.email} name='email' type="email" placeholder="E-posta" className="input-style" /></div>
                        <div className="relative"><Phone className="absolute left-3 top-3 text-gray-400" size={20} /><input onChange={handleChange} value={data.phone} name='phone' type="tel" placeholder="Telefon" className="input-style" /></div>
                        <div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={20} /><input onChange={handleChange} value={data.password} name='password' type="password" placeholder="Şifre" className="input-style" /></div>
                        <button onClick={registerFunc} className="btn-style">Kayıt Ol</button>

                    </form>

                </div>

                <div className="w-1/2 p-8 md:p-12 flex flex-col justify-center">

                    <h2 className="text-3xl font-bold text-rose-500 mb-6 text-center">Giriş Yap</h2>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                        <div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={20} /><input onChange={handleChange} value={data.email} name='email' type="email" placeholder="E-posta" className="input-style" /></div>
                        <div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={20} /><input onChange={handleChange} value={data.password} name='password' type="password" placeholder="Şifre" className="input-style" /></div>
                        <div className="text-right"><div onClick={() => navigate('/forgotpassword')} className="text-xs text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">Şifremi Unuttum</div></div>
                        <button onClick={loginFunc} className="btn-style">Giriş Yap</button>

                    </form>

                </div>

            </div>

            <div className={`absolute top-0 h-full w-1/2 bg-rose-500 z-10 transition-all duration-700 ease-in-out flex flex-col justify-center items-center text-white text-center p-12 shadow-2xl ${isLogin ? 'translate-x-0 rounded-r-[100px]' : 'translate-x-full rounded-l-[100px]'}`} style={{ pointerEvents: 'none' }}>

                <div className="pointer-events-auto flex flex-col items-center">

                    <div className="bg-white/20 p-4 rounded-full mb-6 italic"><Flower size={48} /></div>

                        <h2 className="text-3xl font-bold mb-4">{isLogin ? "Merhaba!" : "Hoş Geldin!"}</h2>
                        <p className="text-rose-100 mb-8 italic">{isLogin ? "Kayıt ol ve keşfetmeye başla." : "Kaldığın yerden devam et."}</p>
                        <button onClick={() => setIsLogin(!isLogin)} className="border-2 border-white px-10 py-2 rounded-full font-bold hover:bg-white hover:text-rose-500 transition-all active:scale-95" >{isLogin ? "Kayıt Ol" : "Giriş Yap"}</button>

                    </div>

                </div>

            </div>

            <style>{`

                .input-style {

                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 2.5rem;
                    background-color: #f9fafb;
                    border: 1px solid #f3f4f6;
                    border-radius: 0.75rem;
                    outline: none;
                    transition: all 0.2s;
                }

                .input-style:focus {

                    ring: 2px;
                    ring-color: #f43f5e;
                }

                .btn-style {

                    width: 100%;
                    background-color: #f43f5e;
                    color: white;
                    font-weight: bold;
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    margin-top: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(244, 63, 94, 0.2);
                    transition: all 0.2s;
                }

                .btn-style:hover {

                    background-color: #e11d48;
                }

                .btn-style:active {

                    transform: scale(0.95);
                }

            `}</style>

        </div>

    );
};

export default AuthPage;