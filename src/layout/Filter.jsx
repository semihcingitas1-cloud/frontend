import React from 'react';

const Filter = ({setPrice, setRating, setCategory}) => {

    const categoryList = [ 'Buketler', 'Saksı Çiçekleri', 'Ters Fanus', 'Kutu Arajman', 'Ters Fanus', 'Cenaze', 'Terarayum' ];
    const ratigList = [ 1, 2, 3, 4, 5 ];

    return (

        <div className='w-2/12 pt-4 p-4 space-y-3 border'>

            <div>Filtreleme</div>

            <hr />

            <div className='space-y-2'>

                <div>Fiyat</div>

                <div className='flex items-center gap-3'>

                <input onChange={e => setPrice(prev => ({...prev, min: e.target.value}))} className='border w-16 p-1 outline-none' type="number" placeholder='Min' />
                    <input onChange={e => setPrice(prev => ({...prev, max: e.target.value}))} className='border w-16 p-1 outline-none' type="number" placeholder='Max' />

                </div>

            </div>

            <hr />

            <div className='space-y-2'>

                <div>Category</div>

                <div className='text-sm space-y-1'>

                    {

                        categoryList.map((category, i) => (

                            <div onClick={() => setCategory(category)} key={i} className='cursor-pointer hover:bg-gray-100'>{category}</div>
                        ))

                    }

                </div>

            </div>

            <hr />

            <div className='space-y-2'>

                <div>Puan</div>

                <div className='flex gap-1 text-lg'>

                    {

                        ratigList.map((rating, i) => (

                            <div className=' w-7 text-center cursor-pointer rounded-md hover:bg-gray-200' onClick={() => setRating(rating)} key={i}>{rating}</div>
                        ))

                    }

                </div>

            </div>

        </div>
    );
};

export default Filter;