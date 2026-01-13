import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAllCategories } from '../redux/categorySlice';

import { Menu, X, ChevronDown } from 'lucide-react';

const HeaderSticky = ({ setCategory }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { categories } = useSelector(state => state.category);

    useEffect(() => {

        dispatch(getAllCategories());
    },[dispatch]);

    const handleCategoryClick = (category) => {

        if (typeof setCategory === 'function') {

            setCategory(category.name);
        }

        setIsOpen(false);
        navigate(`/products?category=${encodeURIComponent(category.name)}`); 
    };

    return (

        <div className='sticky top-0 z-20 w-full bg-rose-500 border-b-2 border-black text-white'>

            <div className='md:hidden flex items-center justify-between px-4 py-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>

                <span className='font-bold uppercase tracking-wider text-sm'>Kategoriler</span>

                <div className='flex items-center gap-2'>{isOpen ? <X size={24} /> : <Menu size={24} />}</div>

            </div>

            <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full bg-rose-500`}>

                {categories.length > 6 && (<div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='py-3 px-6 flex items-center justify-center md:justify-start gap-2 cursor-pointer hover:bg-rose-600 border-b border-rose-400 md:border-b-0 md:border-r md:border-rose-400 last:border-0 transition-all text-sm font-medium group'><ChevronDown size={18} className="group-hover:text-white transition-transform group-hover:rotate-180" />Tümü</div>)}

                {isDropdownOpen && ( <div>

                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>

                    <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-fadeInUp">

                        <div className="px-4 py-2 border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tüm Kategoriler</div>

                        <div className="max-h-64 overflow-y-auto custom-scrollbar">

                            {categories.map((cat, index) => ( <div key={index} onClick={() => { setIsDropdownOpen(false);}} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 cursor-pointer flex items-center gap-3 transition-colors">

                                <div className="w-1.5 h-1.5 rounded-full bg-rose-200"></div>
                                {cat.name}
                            </div>))}

                        </div>

                    </div>

                </div>)}

                {categories.slice(0, 6).map((category) => ( <div onClick={() => handleCategoryClick(category)} key={category._id} className='py-3 px-6 cursor-pointer hover:bg-rose-600 border-b border-rose-400 md:border-b-0 md:border-r md:border-rose-400 last:border-0 transition-colors text-center md:text-left text-sm'>

                    {category.name}
                </div>))}

            </div>

        </div>

    );
};

export default HeaderSticky;