import React from 'react';
import { BsCartDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import PaymentAccept from '../layout/PaymentAccept';
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus, CiCircleMinus, CiStickyNote, CiEraser } from "react-icons/ci";

const Cart = () => {

    const { carts } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteItem = (id) => {

        dispatch(removeFromCart(id));
    };

    const detailItem = (id) => {

        navigate(`/product/${id}`);
    };

    const decrement = (id, currentQty) => {

        if (currentQty > 1) {

            dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
        }
    };

    const increment = (id, currentQty) => {

        dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
    };

    return (

        <div className='max-w-7xl mx-auto p-5'>

            {carts?.length > 0 ? (

                <div className='flex flex-col lg:flex-row items-start gap-8'>

                    <div className='w-full lg:w-3/4 space-y-4'>

                        <h2 className='text-2xl font-bold mb-5'>Alışveriş Sepeti ({carts.length} Ürün)</h2>

                        {carts?.map((cart, i) => (

                            <div key={i} className='w-full border rounded-2xl p-4 bg-white shadow-sm'>

                                <div className='flex items-center justify-between'>

                                    <div onClick={() => detailItem(cart?.id)} className='flex items-center gap-4 cursor-pointer w-1/3'>

                                        <img className='w-20 h-20 object-cover rounded-lg' src={cart?.image?.url} alt="" />
                                        <div className='font-semibold text-gray-700'>{cart?.name}</div>

                                    </div>

                                    <div className='flex items-center gap-3'>

                                        <div onClick={() => decrement(cart.id, cart.quantity)} className='hover:bg-rose-100 text-rose-500 rounded-full cursor-pointer transition'><CiCircleMinus size={35} /></div>
                                        <div className='text-2xl font-bold w-8 text-center'>{cart?.quantity}</div>
                                        <div onClick={() => increment(cart.id, cart.quantity)} className='hover:bg-rose-100 text-rose-500 rounded-full cursor-pointer transition'><CiCirclePlus size={35} /></div>

                                    </div>

                                    <div className='flex items-center gap-6'>

                                        <div className='text-xl font-bold text-gray-800'>{(cart?.price) * (cart?.quantity)} ₺</div>
                                        <CiEraser className='p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer' onClick={() => deleteItem(cart?.id)} size={40} />

                                    </div>

                                </div>

                                {cart?.note && (<div className='mt-4 p-3 bg-green-50 border border-green-100 rounded-xl flex items-start gap-2'>

                                    <CiStickyNote size={20} className='text-green-600 mt-1 flex-shrink-0' />
                                    <div className='text-sm text-green-800'><span className='font-bold uppercase text-[10px] block'>Hediye Notunuz:</span>{cart.note}</div>

                                </div>)}

                            </div>

                        ))}

                    </div>

                    <div className='w-full lg:w-1/4'>

                        <PaymentAccept />

                    </div>

                </div>) : (<div className='w-full min-h-[60vh] flex items-center justify-center'>

                    <div className='p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-5 bg-gray-50'>

                        <div className='text-5xl text-gray-300'>Sepetiniz Boş</div>

                        <div className='flex gap-3'>

                            <Button text={'Ana Sayfa'} onClick={() => navigate('/')} />
                            <Button text={'Alışverişe Devam Et'} onClick={() => navigate('/products')} />

                        </div>

                    </div>

                </div>
            )}

        </div>

    );
};

export default Cart;