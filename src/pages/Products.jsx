import React, { useEffect, useState } from 'react';
import Filter from '../layout/Filter';
import HeaderSticky from '../layout/HeaderSticky';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/productSlice';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const Products = () => {

    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    const { keyword } = useSelector(state => state.general);
    const [price, setPrice] = useState({min: 0, max: 30000});
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState("");
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 8;
    const currentItems = products?.products?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products?.products?.length / 8);


    const handlePageClick = (event) => {

        const newOffset = (event.selected * 8) % products?.products?.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {

        dispatch(getProducts({keyword, price, rating, category}));
    }, [dispatch, keyword, price, rating, category]);

    return (
  
        <div>

            <div className='flex justify-between'>

                <Filter setPrice={setPrice} setRating={setRating} setCategory={setCategory} />

                <div className='w-10/12'>

                    {

                        loading ? <div className='w-full flex justify-center'><div className={`w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-rose-400 animate-spinner`}></div></div> : <div>

                            {

                                products?.products && <div className='m-10 flex items-center justify-center gap-5 flex-wrap'>

                                    {

                                        currentItems?.map((product, i) => (

                                            <ProductCard product={product} key={i} />
                                        ))

                                    }

                                </div>

                            }

                        </div>

                    }

                </div>

            </div>

            <div>

                <ReactPaginate className='w-full p-2 bg-rose-400 text-xl text-white flex justify-center gap-5' breakLabel="..." nextLabel="Sonraki >" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="< Önceki" renderOnZeroPageCount={null} />

            </div>

        </div>
    );
};

export default Products;