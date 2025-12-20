import React, { useState } from 'react';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentAccept = () => {

    const navigate = useNavigate();

    const { totalAmount } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const shippingCost = totalAmount > 5000 ? 0 : 500; 

    const handlePayment = () => {

        if (!selectedAddress) {

            alert("Lütfen bir teslimat adresi seçiniz.");
            return;
        }
        if (!isAgreed) {

            alert("Lütfen sözleşmeleri onaylayınız.");
            return;
        }
        
        console.log("Ödeme işlemine geçiliyor...", {

            address: selectedAddress,
            amount: totalAmount + shippingCost
        });

        const fullAddress = user?.user?.addresses?.find(addr => addr._id === selectedAddress);

        return (navigate('/payment'), {

            state: { totalPrice: totalAmount + shippingCost,
                address: fullAddress,
                user: user?.user
            }
        });
    };

    return (

        <div className='w-[280px] p-4 bg-white border rounded-xl shadow-sm space-y-6 sticky top-24'>

            <div className='text-xl font-bold text-gray-800 border-b pb-2'>Sipariş Özeti</div>

            <div className='space-y-2'>

                <div className='font-semibold text-gray-700 flex justify-between'>

                    <span>Teslimat Adresi:</span>

                </div>
                
                <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} className='w-full p-2 outline-none border-gray-300 border rounded-lg text-sm focus:border-green-500 transition' >

                    <option value="">Adres Seçiniz...</option>

                    {user?.user?.addresses?.length > 0 ? (

                        user.user.addresses.map((addr, index) => (
                        
                            <option key={index} value={addr._id}>{addr.title} - {addr.city}</option>
                        ))

                    ) : ( <option disabled>Kayıtlı adres bulunamadı</option> )}

                </select>
                
                {user?.user?.addresses?.length === 0 && (

                    <p className='text-xs text-red-500'>Profilinizden adres eklemelisiniz.</p>
                )}

            </div>

            <div className='flex flex-col gap-3'>

                <div className='flex items-start gap-2'>

                    <input type="checkbox" id="policy" className='mt-1 cursor-pointer' onChange={(e) => setIsAgreed(e.target.checked)} />
                    <label htmlFor="policy" className='text-xs text-gray-600 cursor-pointer leading-tight'>İade Politikasını okudum, onaylıyorum.</label>

                </div>

                <div className='flex items-start gap-2'>

                    <input type="checkbox" id="policy" className='mt-1 cursor-pointer' onChange={(e) => setIsAgreed(e.target.checked)} />
                    <label htmlFor="policy" className='text-xs text-gray-600 cursor-pointer leading-tight'> Mesafeli Satış Sözleşmesini okudum, onaylıyorum.</label>

                </div>

            </div>

            <div className='pt-4 border-t space-y-2'>

                <div className='flex justify-between text-gray-600'>

                    <span>Sepet Tutarı:</span>
                    <span>{totalAmount.toLocaleString()} ₺</span>

                </div>

                <div className='flex justify-between text-gray-600'>

                    <span>Kargo Ücreti:</span>
                    <span>{shippingCost === 0 ? "Ücretsiz" : `${shippingCost} ₺`}</span>

                </div>

                <div className='flex justify-between text-lg font-bold text-green-600 pt-2'>

                    <span>Toplam:</span>
                    <span>{(totalAmount + shippingCost).toLocaleString()} ₺</span>

                </div>

                <div className='pt-4'>

                    <Button text={'Ödemeye Geç'} width={'100%'} onClick={handlePayment}disabled={!isAgreed || !selectedAddress}/>

                </div>

            </div>

        </div>

    );
};

export default PaymentAccept;