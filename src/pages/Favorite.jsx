import React from 'react';
import { BsCartDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import Button from '../components/Button'
import { Navigate, useNavigate } from 'react-router-dom';

const Favorite = () => {

    const { carts } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteItem = (id) => {

        dispatch(removeFromCart(id))
    }

    return (

        <div className='min-h-screen'>

            {

                carts?.length > 0 ? <div>

                    {
                    
                        carts?.map((cart, i) => (

                            <div className='flex items-center justify-between border-b mb-2 p-3' key={i}>

                                <div className='w-1/3 flex items-center justify-between'>

                                    <img className='w-1/6' src={cart?.image?.url} alt="" />
                                    <div>{cart?.name}</div>

                                </div>

                                <div className='w-1/4 flex items-center justify-between'>

                                    <div>{cart?.price} ₺</div>
                                    <BsCartDash className='p-2 bg-red-500 rounded-md text-white' onClick={() => deleteItem(cart?.id)} size={40} />

                                </div>

                            </div>
                        ))

                    }

                </div> : <div className='w-full min-h-screen -mt-10 flex items-center justify-center'>

                    <div className='p-5 border flex flex-col items-center justify-center gap-5'>

                        <div className='text-5xl text-red-400'>Favori ürün yok</div>

                        <div className='flex gap-3'>

                            <Button text={'Ana Sayfa'} onClick={() => navigate('/')} />
                            <Button text={'Alışverişe Devam Et'} onClick={() => navigate('/products')} />

                        </div>

                    </div>

                </div>

            }

        </div>
    );
};

export default Favorite;