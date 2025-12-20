import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { getAllSliders } from '../redux/sliderSlice';

const HomeSlider = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sliders, loading } = useSelector(state => state.slider);

    useEffect(() => {

        dispatch(getAllSliders());
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

    const sliderItem = [

        {

            name: 'slide1',
            url: 'https://evacicekevi.com/assets/images/statics/nevsehir-cicekcileri.jpg',
            navigation: '/slider1'

        },
        {

            name: 'slide2',
            url: 'https://evacicekevi.com/assets/images/statics/nevsehir-cicek-gonder.jpg',
            navigation: '/slider2'

        },
        {

            name: 'slide3',
            url: 'https://evacicekevi.com/assets/images/statics/nevsehir-cicekcisi.jpg',
            navigation: '/slider3'

        },
        {

            name: 'slide4',
            url: 'https://evacicekevi.com/assets/images/statics/nevsehir-ucuz-cicek.jpg',
            navigation: '/slider4'

        },

    ];

    

    return (
<div className='flex items-center justify-center my-6'>
            <div className='w-full lg:w-11/12 overflow-hidden rounded-2xl shadow-lg'>
                {loading ? (
                    <div className='w-full flex justify-center h-64 items-center bg-gray-50'>
                        <div className={`w-12 h-12 rounded-full border-4 border-gray-200 border-t-rose-400 animate-spin`}></div>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {sliders && sliders.map((item, i) => (
                            <div 
                                key={item._id} 
                                className='outline-none cursor-pointer'
                                onClick={() => navigate(item.link)} // Admin panelinde verdiğin linke gider
                            >
                                <img 
                                    className='w-full object-cover max-h-[500px]' 
                                    src={item.image.url} // Cloudinary'den gelen URL
                                    alt={item.title || "Kampanya"} 
                                    loading={i === 0 ? "eager" : "lazy"} 
                                />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>

        </div>

    );
};

export default HomeSlider;