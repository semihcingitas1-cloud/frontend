'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const PaymentForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { carts, totalAmount } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    
    const shippingCost = totalAmount > 5000 ? 0 : 500;
    const finalTotal = totalAmount + shippingCost;

    const [isFlipped, setIsFlipped] = useState(false);
    const [holderName, setHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);

    const [cardData, setCardData] = useState({ name: '', number: '', exp: '', cvv: '' });

    const getCardType = (number) => {

        if (number.startsWith('4')) return 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg';
        if (number.startsWith('5')) return 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg';
        if (number.startsWith('9')) return 'https://upload.wikimedia.org/wikipedia/commons/b/b3/TROY_Logo.png';
        return null;
    };

    const handleInputChange = (e) => {

        const { name, value, placeholder } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));

        if (name === 'name') setHolderName(value);
        if (name === 'number') setCardNumber(value);
        if (name === 'cvv') setCvc(value);
        if (name === 'exp') {

            if (placeholder === 'MM') setExpireMonth(value);
            if (placeholder === 'YY') setExpireYear(value);
        }
    };


    const handlePayment = async () => {

        if (carts.length === 0) return alert("Sepetiniz boş!");
        setLoading(true);
        const nameParts = holderName.trim().split(' ');
        const firstName = nameParts[0] || user?.user?.name || 'Ad';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : (user?.user?.surname || 'Soyad');

        const activeAddress = user?.user?.addresses?.[0] || {};

        const iyzicoItems = carts.map(item => ({

            id: item.id || item._id,
            name: item.name,
            category1: 'Genel',
            itemType: 'PHYSICAL',
            price: (item.price * item.quantity).toFixed(2)
        }));

        if (shippingCost > 0) {

            iyzicoItems.push({

                id: 'SHIPPING',
                name: 'Kargo Ücreti',
                category1: 'Lojistik',
                itemType: 'VIRTUAL',
                price: shippingCost.toFixed(2)
            });
        };

        const paymentData = {

            price: finalTotal.toFixed(2),
            paidPrice: finalTotal.toFixed(2),
            currency: 'TRY',
            basketId: 'B' + Math.floor(Math.random() * 100000),
            paymentCard: {

                cardHolderName: holderName,
                cardNumber: cardNumber.replace(/\s/g, ''),
                expireMonth: expireMonth,
                expireYear: expireYear,
                cvc: cvc,
                registerCard: '0'
            },
            buyer: {

                id: user?.user?._id,
                name: firstName,
                surname: lastName,
                gsmNumber: user?.user?.phone,
                email: user?.user?.email,
                identityNumber: '11111111111',
                lastLoginDate: '2025-12-20 14:56:30',
                registrationDate: '2025-12-20 14:56:30',
                registrationAddress: activeAddress.address,
                ip: '85.34.78.112',
                city: activeAddress.city,
                country: 'Turkey',
                zipCode: activeAddress.zipCode || '34732',
            },
            shippingAddress: {
                contactName: holderName,
                city: activeAddress.city,
                country: 'Turkey',
                address: activeAddress.address,
                zipCode: activeAddress.zipCode || '34732',
            },
            billingAddress: {
                contactName: holderName,
                city: activeAddress.city,
                country: 'Turkey',
                address: activeAddress.address,
                zipCode: activeAddress.zipCode || '34732',
            },
            basketItems: iyzicoItems, 
        };

        try {

            const res = await axios.post('https://backend-d72l.onrender.com/api/payment/', paymentData);
            
            if (res.data.status === 'success') {

                navigate('/paymentsuccess', { state: { paymentData: res.data } });
                dispatch(clearCart());
            } else {

                alert("Ödeme başarısız: " + res.data.errorMessage);
            }
        } catch (error) {
            alert(error.response?.data?.errorMessage || "Ödeme hatası!");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className='max-w-md mx-auto space-y-6 p-4'>

            <div className="group w-full h-52 [perspective:1000px]">

                <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-2xl [backface-visibility:hidden]">

                        <div className='flex justify-between items-start'>

                            <div className='w-12 h-8 bg-yellow-400 rounded-md opacity-80 shadow-inner'></div>
                            {getCardType(cardNumber) && ( <img src={getCardType(cardNumber)} alt="card-type" className="h-8 object-contain bg-white/10 p-1 rounded" /> )}

                        </div>

                        <div className='mt-10 text-2xl tracking-widest font-mono'>{cardNumber.replace(/(\d{4})/g, '$1 ').trim() || '**** **** **** ****'}</div>

                        <div className='mt-8 flex justify-between items-end'>

                            <div className='max-w-[150px]'>

                                <p className='text-[10px] uppercase opacity-50'>Kart Sahibi</p>
                                <p className='tracking-wide uppercase truncate text-sm font-semibold'>{holderName || 'AD SOYAD'}</p>

                            </div>

                            <div className="text-right">

                                <p className='text-[10px] uppercase opacity-50'>Son Kullanma</p>
                                <p className="font-semibold text-sm">{expireMonth || 'MM'}/{expireYear || 'YY'}</p>

                            </div>

                        </div>

                    </div>

                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl text-white shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between py-6">

                        <div className="w-full h-10 bg-black opacity-80 mt-2"></div>

                        <div className="px-6">

                            <p className="text-[8px] uppercase mb-1 text-right">Güvenlik Kodu</p>
                            <div className="w-full h-10 bg-white rounded flex items-center justify-end px-4 text-black font-mono italic">{cvc || '***'}</div>

                        </div>

                        <div className="px-6 flex justify-between items-center opacity-30">

                            <div className="text-[10px]">Flora Haven</div>
                            <div className="h-6 w-10 bg-white/20 rounded"></div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='grid grid-cols-2 gap-4'>

                <input name="name" onChange={handleInputChange} value={holderName} className='col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none' placeholder='Kart Üzerindeki İsim' />    
                <input name="number" onChange={handleInputChange} value={cardNumber} maxLength="16" className='col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none' placeholder='Kart Numarası' />    
                <input name="exp" onChange={handleInputChange} value={expireMonth} maxLength="2" className='p-3 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none' placeholder='MM' />
                <input name="exp" onChange={handleInputChange} value={expireYear} maxLength="2" className='p-3 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none' placeholder='YY' />
                <input name="cvv" onChange={handleInputChange} onFocus={() => setIsFlipped(true)} onBlur={() => setIsFlipped(false)} value={cvc} maxLength="3" className='col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none' placeholder='CVV' />
                <button onClick={handlePayment} disabled={loading} className="col-span-2 bg-rose-500 hover:bg-rose-600 transition-colors text-white p-4 rounded-lg font-bold shadow-lg">{loading ? 'İşlem Yapılıyor...' : `${finalTotal.toLocaleString()} ₺ Öde`}</button>

            </div>

        </div>

    );
};


export default PaymentForm;
