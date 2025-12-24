import React, { useState } from 'react';
import { Filter as FilterIcon, X } from 'lucide-react';

const Filter = ({ setPrice, setRating, setCategory }) => {

    const [isOpen, setIsOpen] = useState(false);

    const categoryList = ['Buketler', 'Saksı Çiçekleri', 'Ters Fanus', 'Kutu Arajman', 'Cenaze', 'Terarayum'];
    const ratingList = [1, 2, 3, 4, 5];

    return (

        <div className="sticky top-30 z-10">

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center gap-2 bg-gray-100 p-2 rounded-md mb-4 w-full justify-center border">

                <FilterIcon size={20} />
                <span>Filtrele</span>

            </button>

            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-outfixed md:relative left-0 z-10 md:z-auto w-full md:w-64 h-full md:h-auto bg-white p-4 space-y-4 border-r md:border shadow-xl md:shadow-none`}>
                
                <div className="flex items-center justify-between md:hidden mb-4">

                    <span className="font-bold text-lg">Filtrele</span>
                    <button onClick={() => setIsOpen(false)}><X size={24} /></button>

                </div>

                <div className="hidden md:block font-semibold border-b pb-2">Filtreleme</div>

                <div className='space-y-2'>

                    <div className="font-medium">Fiyat</div>

                    <div className='flex items-center gap-2'>

                        <input onChange={e => setPrice(prev => ({...prev, min: e.target.value}))} className='border w-full md:w-20 p-2 outline-none rounded text-sm' type="number" placeholder='Min' />
                        <input onChange={e => setPrice(prev => ({...prev, max: e.target.value}))} className='border w-full md:w-20 p-2 outline-none rounded text-sm' type="number" placeholder='Max' />

                    </div>

                </div>

                <hr />

                <div className='space-y-2'>

                    <div className="font-medium">Kategori</div>

                    <div className='text-sm space-y-1'>

                        {categoryList.map((category, i) => ( <div onClick={() => {setCategory(category); if(window.innerWidth < 768) setIsOpen(false);}} key={i} className={`p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors`}>

                            {category}
                        </div>))}

                    </div>

                </div>

                <hr />

                <div className='space-y-2'>

                    <div className="font-medium">Puan</div>

                    <div className='flex gap-2 flex-wrap'>

                        {ratingList.map((rating, i) => ( <div className='w-8 h-8 flex items-center justify-center border cursor-pointer rounded-md hover:bg-rose-100 hover:border-rose-400 transition-all' onClick={() => { setRating(rating); if(window.innerWidth < 768) setIsOpen(false); }} key={i}>

                            {rating}

                        </div> ))}

                    </div>

                </div>

                <button onClick={() => setIsOpen(false)} className="md:hidden w-full bg-black text-white py-3 rounded-lg mt-4 font-semibold">Filtreleri Uygula</button>

            </div>

            {isOpen && (<div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden"/>)}

        </div>

    );
};

export default Filter;
