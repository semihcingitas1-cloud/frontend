import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderSticky = ({ setCategory }) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const categoryList = ['Buketler', 'Saksı Çiçekleri', 'Ters Fanus', 'Kutu Arajman', 'Cenaze', 'Terarayum', 'Güller'];

    const handleCategoryClick = (category) => {

        setCategory(category);
        setIsOpen(false);
        navigate(`/products?category=${category}`); 
    };

    return (

        <div className='sticky top-0 z-20 w-full bg-rose-500 border-b-2 border-black text-white'>

            <div className='md:hidden flex items-center justify-between px-4 py-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>

                <span className='font-bold uppercase tracking-wider text-sm'>Kategoriler</span>

                <div className='flex items-center gap-2'>{isOpen ? <X size={24} /> : <Menu size={24} />}</div>

            </div>

            <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full bg-rose-500`}>

                {categoryList.map((category, i) => ( <div onClick={() => handleCategoryClick(category)} key={i} className='py-3 px-6 cursor-pointer hover:bg-rose-600 border-b border-rose-400 md:border-b-0 md:border-r md:border-rose-400 last:border-0 transition-colors text-center md:text-left text-sm'>{category}</div>))}

            </div>

        </div>

    );
};

export default HeaderSticky;