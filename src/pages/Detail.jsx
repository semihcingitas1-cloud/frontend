import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Button from '../components/Button';
import TextArea from '../components/TexrArea';
import Note from '../components/Note';
import { addReview, getProductDetail, deleteReview } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { CiCirclePlus, CiCircleMinus, CiChat1, CiCamera, CiEraser } from "react-icons/ci";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const Detail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user); 
    const { loading, product } = useSelector(state => state.products);

    const [quantity, setQuantitity] = useState(1);
    const [noteContent, setNoteContent] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('Aşk');
    const [shouldGenerateNote, setShouldGenerateNote] = useState(false);

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [images, setImages] = useState([]);

    useEffect(() => {

        if (id) {

            dispatch(getProductDetail(id));
        };
    }, [dispatch, id]);

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        files.forEach((file) => {

            const reader = new FileReader();

            reader.onload = () => {

                if (reader.readyState === 2) {

                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const renderStars = (rating = 0, size = 30) => {

        return (

            <div className='flex items-center'>

                {[1, 2, 3, 4, 5].map((index) => (

                    index <= rating ? 
                    <IoIosStar key={index} className='text-yellow-400' size={size} /> : 
                    <IoIosStarOutline key={index} className='text-gray-300' size={size} />

                ))}

            </div>
        );
    };

    const addBasket = () => {

        const data = {

            id: product?.product?._id,
            name: product?.product?.name,
            image: product?.product?.images?.[0],
            price: product?.product?.price,
            quantity: quantity,
            note: noteContent
        }

        dispatch(addToCart(data));
        navigate('/cart');

    };

    const submitReview = () => {

        if (comment.length < 5) {

            alert("Lütfen biraz daha uzun bir yorum yazın.");
            return;
        }

        const reviewData = {

            productId: id,
            comment: comment,
            rating: rating,
            images: images
        };

        dispatch(addReview(reviewData))
        .unwrap()
        .then((payload) => {

            if(payload.success) {

                dispatch(getProductDetail(id)); 
                setComment("");
                setImages([]);
                alert("Yorumunuz başarıyla eklendi!");
            }
        })
        .catch((error) => {

            console.error("Yorum hatası:", error);
            alert("Yorum eklenirken bir hata oluştu.");
        });
    };

    const handleDeleteReview = (reviewId) => {

        if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {

            dispatch(deleteReview({ productId: id, reviewId }))
                .unwrap()
                .then(() => {

                    alert("Yorum silindi.");
                    dispatch(getProductDetail(id)); 
                })
                .catch((err) => alert(err));
        }
    };

    var settings = { dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
    const reviewSliderSettings = { dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false };

    return (

        <div className='max-w-7xl mx-auto px-4 mb-20'>

            {loading ? ( <div className='w-full flex justify-center py-20'>

                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-rose-400 animate-spin"></div>

            </div>) : (<>

                <div className='my-10 w-full flex flex-col md:flex-row gap-12'>

                    <div className='w-full md:w-1/2'>

                        <Slider className='w-full mb-5' {...settings}>

                            {product?.product?.images?.map((image, i) => (
                                <img className='rounded-3xl h-[550px] w-full object-cover shadow-xl' key={i} src={image.url} alt="" />
                            ))}

                        </Slider>

                    </div>

                    <div className='flex flex-col space-y-6 flex-1'>

                        <div className='text-4xl font-extrabold text-gray-700 leading-tight'>{product?.product?.name}</div>
                        <div className='text-gray-600 text-lg leading-relaxed'>{product?.product?.description}</div>
                        <div className='flex items-center justify-between'>

                            <div className='text-5xl font-black text-rose-500'>{product?.product?.price?.toLocaleString()} ₺</div>
                            <div className='flex flex-col'>

                                {renderStars(product?.product?.rating, 24)}
                                <div>ürünün puanı: ({product?.product?.rating}/5)</div>

                            </div>

                        </div>

                        <div className='bg-green-50 p-6 rounded-3xl border border-green-100 space-y-4'>

                            <div className='flex items-center justify-between'>

                                <h3 className='font-bold text-green-800 flex items-center gap-2'><CiChat1 size={24} /> Hediye Notu Ekle</h3>

                                <div className='flex gap-2'>

                                    <select className='p-2 bg-white border border-green-200 rounded-lg outline-none text-sm' value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>

                                        <option value="Aşk">Aşk</option>
                                        <option value="Teşekkür">Teşekkür</option>
                                        <option value="Destek">Destek</option>
                                        <option value="Kutlama">Kutlama</option>

                                    </select>

                                    <button onClick={() => setShouldGenerateNote(true)} className='bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition'>AI Yaz</button>

                                </div>

                            </div>

                            <TextArea placeholder={'Mesajınızı buraya yazın...'} value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                            {shouldGenerateNote && <Note selectedTopic={selectedTopic} onNoteGenerated={(txt) => { setNoteContent(txt); setShouldGenerateNote(false); }} />}

                        </div>

                        <div className='flex items-center gap-4'>

                            <div className='flex items-center gap-4 bg-gray-50 border px-4 py-3 rounded-2xl'>

                                <CiCircleMinus onClick={() => quantity > 1 && setQuantitity(quantity - 1)} size={35} className='cursor-pointer text-gray-400 hover:text-rose-500' />
                                <span className='text-2xl font-bold w-6 text-center'>{quantity}</span>
                                <CiCirclePlus onClick={() => quantity < product?.product?.stock && setQuantitity(quantity + 1)} size={35} className='cursor-pointer text-gray-400 hover:text-rose-500' />

                            </div>

                            <Button width={"100%"} text={"Sepete Ekle"} onClick={addBasket} disabled={product?.product?.stock === 0} />

                        </div>

                    </div>

                </div>

                <hr className='my-16 border-gray-100' />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>

                    <div>

                        <h2 className='text-3xl font-bold mb-8 text-gray-800'>Müşteri Değerlendirmeleri</h2>
                        {product?.product?.reviews && product.product.reviews.length > 0 ? (

                            <div className='space-y-6'>

                                {product.product.reviews.map((rev, i) => (

                                    <div key={i} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-50 transition hover:shadow-md relative group'>

                                        {user?.user?.role === 'admin' && (

                                            <div className='absolute bottom-4 right-4'>

                                                <div onClick={() => handleDeleteReview(rev._id)}>

                                                    <CiEraser size={35} className='hover:bg-red-500 hover:text-white transition duration-300 rounded-full p-1 border cursor-pointer' />

                                                </div>

                                            </div>

                                        )}

                                        <div className='flex justify-between items-start mb-3'>

                                            <div className='font-bold text-gray-800'>{rev.name}</div>
                                            {renderStars(rev.rating, 16)}

                                        </div>

                                        <p className='text-gray-600 italic text-sm leading-relaxed mb-4'>"{rev.comment}"</p>
                                        
                                        {rev.images && rev.images.length > 0 && (

                                            <div className='w-full max-w-[200px]'>

                                                <Slider {...reviewSliderSettings}>

                                                    {rev.images.map((img, idx) => (

                                                        <img key={idx} src={img.url} className='w-full h-32 object-cover rounded-lg' alt="Yorum" />
                                                    ))}

                                                </Slider>

                                            </div>

                                        )}

                                    </div>

                                ))}

                            </div>) : (<div className='text-gray-400 italic bg-gray-50 p-10 rounded-2xl text-center border-2 border-dashed'>Bu ürün için henüz yorum yapılmamış.</div>

                        )}

                    </div>

                    <div className='bg-gray-50 p-8 rounded-3xl border border-gray-100'>

                        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Bir Değerlendirme Yaz</h2>

                        {user ? (<div className='flex flex-col gap-4'>

                            <div>

                                <label className='block text-sm font-medium text-gray-700 mb-2'>Puanınız:</label>

                                <div className='flex gap-1'>

                                    {[1, 2, 3, 4, 5].map(star => (

                                    <IoIosStar key={star} onClick={() => setRating(star)} size={30} className={`cursor-pointer transition ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} />

                                    ))}

                                    </div>

                                </div>

                                <div>

                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Fotoğraf Ekle:</label>

                                    <div className='flex items-center gap-4 flex-wrap'>

                                        <label className='cursor-pointer bg-white border-2 border-dashed border-gray-300 p-4 rounded-xl hover:border-rose-400 transition flex flex-col items-center gap-2'>

                                            <CiCamera size={24} className='text-gray-400'/>
                                            <span className='text-xs text-gray-400'>Seç</span>
                                            <input type="file" multiple accept="image/*" onChange={handleImageChange} className='hidden' />

                                        </label>

                                        {images.map((img, idx) => (

                                            <img key={idx} src={img} className='w-16 h-16 object-cover rounded-xl border' alt="önizleme" />

                                        ))}

                                    </div>

                                </div>

                                <div>

                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Yorumunuz:</label>
                                    <TextArea placeholder='Ürün hakkında görüşlerinizi paylaşın...' value={comment} onChange={(e) => setComment(e.target.value)} />

                                </div>

                                <Button text="Yorumu Gönder" onClick={submitReview} />

                            </div>

                            ) : (<div className='flex flex-col items-center justify-center text-center py-10 space-y-4'>

                                <div className='bg-white p-4 rounded-full shadow-inner'><CiChat1 size={40} className='text-gray-300'/></div>
                                <p className='text-gray-500'>Yorum yapabilmek için giriş yapmanız gerekmektedir.</p>
                                <button onClick={() => navigate('/login')} className='text-rose-500 font-bold hover:underline'>Giriş Yap / Üye Ol</button>

                            </div>

                        )}

                    </div>

                </div>

            </>)}

        </div>

    );
};

export default Detail;