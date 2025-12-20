import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/userSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import { IoMailOutline } from "react-icons/io5";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.user);

    const handleSubmit = () => {
        if (email) {
            dispatch(forgotPassword(email));
        } else {
            alert('Lütfen e-posta adresinizi giriniz.');
        }
    };

    return (
        <div className='min-h-[85vh] flex items-center justify-center bg-gray-50/50 px-4'>

            <div className='w-full max-w-md flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100'>
                
                {/* Yumuşak Rose İkon Alanı */}
                <div className='bg-rose-50 p-4 rounded-2xl mb-6 text-rose-500'>
                    <IoMailOutline size={45} />
                </div>

                <h2 className='text-2xl font-bold mb-3 text-gray-800 tracking-tight'>
                    Şifremi Unuttum
                </h2>
                
                <p className='text-gray-500 text-sm text-center mb-8 leading-relaxed px-2'>
                    Endişelenmeyin! E-posta adresinizi girerek şifrenizi sıfırlamanız için size bir bağlantı gönderebiliriz.
                </p>

                <div className='w-full space-y-5'>
                    <div className='w-full'>
                        <Input 
                            placeholder={'E-posta adresiniz'} 
                            onChange={(e) => setEmail(e.target.value)} 
                            name={'email'} 
                            id={'email'} 
                            type={'email'} 
                            value={email} />
                    </div>

                    <div className='pt-2'>
                        <Button 
                            text={loading ? 'Gönderiliyor...' : 'Bağlantı Gönder'} 
                            onClick={handleSubmit} 
                            disabled={loading}
                            // Yumuşak geçişli rose butonu
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-rose-200 transition-all duration-300 transform hover:-translate-y-0.5"
                        />
                    </div>
                </div>

                <button 
                    onClick={() => window.history.back()} 
                    className='mt-8 text-sm font-medium text-gray-400 hover:text-rose-500 transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-rose-300'
                >
                    Giriş sayfasına dön
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;