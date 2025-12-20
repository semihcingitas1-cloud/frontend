import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../redux/userSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import { IoLockOpenOutline } from "react-icons/io5";

const ResetPassword = () => {
    const { token } = useParams(); 
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.user); 

    const handleSubmit = () => {
        if (password.length < 6) {
            alert('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (token) {
            dispatch(resetPassword({ token, password })).then(result => {
                if (result.meta.requestStatus === 'fulfilled') {
                    alert('Şifreniz başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsunuz.');
                    navigate('/auth');
                }
            });
        } else {
            alert('Şifre sıfırlama tokeni bulunamadı veya geçersiz.');
        }
    };

    return (
        <div className='min-h-[85vh] flex items-center justify-center bg-gray-50/50 px-4'>
            {/* Yumuşak gölge, zarif sınırlar ve yuvarlatılmış köşeler */}
            <div className='w-full max-w-md flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100'>
                
                {/* Yumuşak Rose İkon Alanı - Kilit simgesi */}
                <div className='bg-rose-50 p-4 rounded-2xl mb-6 text-rose-500'>
                    <IoLockOpenOutline size={45} />
                </div>

                <h2 className='text-2xl font-bold mb-3 text-gray-800 tracking-tight text-center'>
                    Yeni Şifre Oluştur
                </h2>
                
                <p className='text-gray-500 text-sm text-center mb-8 leading-relaxed px-2'>
                    Lütfen hesabınız için yeni ve güvenli bir şifre belirleyin. En az 6 karakter kullanmayı unutmayın.
                </p>

                <div className='w-full space-y-5'>
                    <div className='w-full'>
                        <Input 
                            placeholder={'Yeni Şifreniz (En az 6 Karakter)'} 
                            onChange={(e) => setPassword(e.target.value)} 
                            name={'password'} 
                            id={'password'} 
                            type={'password'} 
                            value={password} 
                        />
                    </div>

                    <div className='pt-2'>
                        <Button 
                            text={loading ? 'Sıfırlanıyor...' : 'Şifreyi Güncelle'} 
                            onClick={handleSubmit} 
                            disabled={loading}
                            // ForgotPassword ile aynı buton stili
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-rose-200 transition-all duration-300 transform hover:-translate-y-0.5"
                        />
                    </div>
                </div>

                <div className='mt-8 flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest font-medium'>
                    <div className='w-8 h-[1px] bg-gray-200'></div>
                    Güvenli İşlem
                    <div className='w-8 h-[1px] bg-gray-200'></div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;