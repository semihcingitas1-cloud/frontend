import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createOrder } from '../redux/orderSlice';
import { clearCart } from '../redux/cartSlice';

import PaymentForm from '../layout/PaymentForm';

import Button from '../components/Button';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { carts, totalAmount } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedAddress, setSelectedAddress] = useState( user?.user?.addresses?.[0] || null );

    const shippingPrice = selectedAddress?.shippingPrice || 0;
    const codFee = paymentMethod === 'cod' ? 50 : 0;
    const finalTotal = totalAmount + shippingPrice + codFee;

    const handleOrderSubmit = async () => {

        const orderData = {

            shippingInfo: selectedAddress,
            orderItems: carts.map(item => ({

                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image.url,
                product: item.id,
                note: item.note
            })),
            paymentInfo: {

                id: paymentMethod === 'card' ? "CARD_PAYMENT" : "CASH_ON_DELIVERY",
                status: "Succeeded"
            },
            itemsPrice: totalAmount,
            shippingPrice: shippingPrice + codFee,
            totalPrice: finalTotal,
            paymentMethod: paymentMethod
        };

        const result = await dispatch(createOrder(orderData));

        if (result.payload.success) {

            alert("Siparişiniz Hazır!");
            dispatch(clearCart());
            navigate('/orders/me');
        }
    };

    return (

        <div className='max-w-6xl mx-auto p-5 flex flex-col md:flex-row gap-8'>

            <div className='flex-1 space-y-6'>

                <h2 className='text-2xl font-bold'>Ödeme Yöntemi Seçin</h2>
                
                <div className='flex gap-4'>

                    <button onClick={() => setPaymentMethod('card')} className={`p-4 border rounded-xl flex-1 ${paymentMethod === 'card' ? 'border-pink-500 bg-pink-50' : ''}`}>Kredi Kartı</button>
                    <button onClick={() => setPaymentMethod('cod')} className={`p-4 border rounded-xl flex-1 ${paymentMethod === 'cod' ? 'border-pink-500 bg-pink-50' : ''}`}>Kapıda Ödeme</button>
                    <button onClick={() => setPaymentMethod('iban')} className={`p-4 border rounded-xl flex-1 ${paymentMethod === 'iban' ? 'border-pink-500 bg-pink-50' : ''}`}>IBAN / Havale</button>

                </div>

                {paymentMethod === 'card' && ( <PaymentForm /> )}

                {paymentMethod === 'iban' && (

                    <div className='space-y-5'>

                        <div className='p-6 bg-blue-50 border border-blue-200 rounded-xl space-y-2'>

                            <p className='font-bold'>TR44 0001 0090 1051 1223 6050 01</p>
                            <p className='text-sm text-gray-600'>Alıcı: Semih Mağazacılık A.Ş.</p>
                            <p className='text-xs text-red-500'>* Lütfen açıklama kısmına kullanıcı adınızı yazınız.</p>

                        </div>

                        <Button onClick={handleOrderSubmit} text="Siparişi Tamamla" width="100%" />

                    </div>

                )}

                {paymentMethod === 'cod' && (

                    <div className='space-y-5'>

                        <div className='p-6 bg-green-50 border border-green-200 rounded-xl'>

                            <p>Kapıda ödeme seçeneğinde <b>+50 ₺</b> işlem ücreti yansıtılabilir.</p>

                        </div>

                        <Button onClick={handleOrderSubmit} text="Siparişi Tamamla" width="100%" />

                    </div>
                )}

            </div>

            <div className='w-full md:w-80 h-fit p-6 border rounded-2xl bg-gray-50 space-y-4'>

                <h3 className='font-bold text-lg'>Sipariş Özeti</h3>

                <div className='space-y-2 max-h-60 overflow-y-auto'>

                    {carts.map(item => (

                        <div key={item.id} className='flex justify-between text-sm border-b pb-2'>

                            <span>{item.name} (x{item.quantity})</span>
                            <span>{item.price * item.quantity} ₺</span>

                        </div>

                    ))}

                </div>

                <div className='pt-4 space-y-2'>

                    <div className='flex justify-between'><span>Ara Toplam:</span><span>{totalAmount} ₺</span></div><div className='flex justify-between'><span>Kargo:</span><span>{shippingPrice} ₺</span></div>
                    {paymentMethod === 'cod' && ( <div className='flex justify-between text-sm text-gray-600'>

                        <span>Kapıda Ödeme Ücreti:</span>
                        <span>50 ₺</span>

                    </div> )}

                    <div className='flex justify-between font-bold text-xl text-pink-600 border-t pt-2'>

                        <span>Toplam:</span>
                        <span>{finalTotal} ₺</span>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Payment;