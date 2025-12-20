import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Slider from 'react-slick';
import { Rating } from 'react-simple-star-rating';
import HomeSlider from '../layout/HomeSlider';

const Home = () => {

    const dispatch = useDispatch();

    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {

        dispatch(getProducts({ keyword: "" }));
    }, [dispatch]);

    var settings = {

        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 15000,
        pauseOnHover: true,
        cssEase: "linear"
    };

    return (

        <div>

            <HomeSlider />

            <div className=''>

                {

                    loading ? <div className='w-full flex justify-center'><div className={`w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-rose-400 animate-spinner`}></div></div> : <div>

                        {

                            products?.products && <div className='m-10 flex items-center justify-center gap-5 flex-wrap'>

                                {

                                    products?.products?.map((product, i) => (

                                        <ProductCard product={product} key={i} />
                                    ))

                                }

                            </div>

                        }

                    </div>

                }

            </div>

        </div>
    );
};

export default Home;