import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { getAllSliders } from '../redux/sliderSlice';

const HomeSlider = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { sliders, loading } = useSelector(state => state.slider);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {

        dispatch(getAllSliders());
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

        <div className='flex items-center justify-center my-6'>

            <div className='w-full lg:w-11/12 overflow-hidden rounded-2xl shadow-lg min-h-[250px] md:min-h-[450px] lg:min-h-[500px]'>

                {loading ? (

                    <div className='w-full flex justify-center h-64 items-center bg-gray-50'>

                        <div className={`w-12 h-12 rounded-full border-4 border-gray-200 border-t-rose-400 animate-spin`}></div>

                    </div>

                    ) : (

                    <Slider {...settings}>

                        {sliders && sliders.map((item, i) => ( <div key={item._id} className='outline-none cursor-pointer' onClick={() => navigate(item.link)}>

                            <img className='w-full object-cover max-h-[500px]' src={isMobile ? item.image.url.replace("/upload/", "/upload/f_auto,q_auto,w_600/") : item.image.url.replace("/upload/", "/upload/f_auto,q_auto,w_1600/")} alt={item.title || "Kampanya"} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "low"}/>
                        </div>))}

                    </Slider>
                )}

            </div>

        </div>

    );
};

export default HomeSlider;
