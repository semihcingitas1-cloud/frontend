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
import { MapPin, Receipt, Truck, User, Mail, Phone } from 'lucide-react';

const Detail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuth } = useSelector(state => state.user); 
    const { loading, product } = useSelector(state => state.products);
    const oldPrice = Number(product?.product?.oldPrice);
    const currentPrice = Number(product?.product?.price);

    const [quantity, setQuantitity] = useState(1);
    const [noteContent, setNoteContent] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('Aşk');
    const [shouldGenerateNote, setShouldGenerateNote] = useState(false);

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [images, setImages] = useState([]);

    const discountRate = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

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

    var settings = {

        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const reviewSliderSettings = { dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false };

    const [shippingInfo, setShippingInfo] = useState({
        firstName: user?.name?.split(' ')[0] || "",
        lastName: user?.name?.split(' ')[1] || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        district: "",
        zipCode: "",
        invoiceType: "individual",
        taxNumber: "",
        taxOffice: "",
        companyName: "",
        isSameAsBilling: true
    });

    const handleChange = (e) => {

        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const konyaDistricts = [

        { name: "Selçuklu", price: 0, isCenter: true },
        { name: "Meram", price: 0, isCenter: true },
        { name: "Karatay", price: 0, isCenter: true },
        { name: "Akşehir", price: 45, isCenter: false },
        { name: "Beyşehir", price: 40, isCenter: false },
        { name: "Ereğli", price: 50, isCenter: false },
        { name: "Seydişehir", price: 40, isCenter: false },
        { name: "Cihanbeyli", price: 45, isCenter: false },
        { name: "Kulu", price: 45, isCenter: false },
        { name: "Ilgın", price: 35, isCenter: false },
        { name: "Kadınhanı", price: 30, isCenter: false },
        { name: "Sarayönü", price: 30, isCenter: false },
        { name: "Karapınar", price: 40, isCenter: false },
        { name: "Çumra", price: 30, isCenter: false },
        { name: "Doğanhisar", price: 45, isCenter: false },
        { name: "Hüyük", price: 45, isCenter: false },
        { name: "Bozkır", price: 50, isCenter: false },
        { name: "Hadim", price: 55, isCenter: false },
        { name: "Taşkent", price: 60, isCenter: false },
        { name: "Güneysınır", price: 40, isCenter: false },
        { name: "Emirgazi", price: 50, isCenter: false },
        { name: "Halkapınar", price: 60, isCenter: false },
        { name: "Derebucak", price: 55, isCenter: false },
        { name: "Tuzlukçu", price: 45, isCenter: false },
        { name: "Yalıhüyük", price: 50, isCenter: false },
        { name: "Altınekin", price: 35, isCenter: false },
        { name: "Ahırlı", price: 50, isCenter: false },
        { name: "Derbent", price: 35, isCenter: false },
        { name: "Yunak", price: 50, isCenter: false },
        { name: "Çeltik", price: 55, isCenter: false }
    ];

    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const handleDistrictChange = (e) => {

        const districtName = e.target.value;
        const districtObj = konyaDistricts.find(d => d.name === districtName);

        if (districtObj) {

            setSelectedDistrict(districtObj);
            setShippingInfo({ ...shippingInfo, district: districtName });
        } else {
            setSelectedDistrict(null);
        }
    };

    return (

        <div className='max-w-7xl mx-auto px-4 mb-20'>

            {loading ? ( <div className='w-full flex justify-center py-20'>

                <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-rose-400 animate-spin"></div>

            </div>) : (<>

                <div className='my-10 w-full flex flex-col md:flex-row gap-12'>

                    <div className='w-full md:w-1/2'>

                        {discountRate > 0 && ( <div className="flex items-center gap-3">

                            <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">%{discountRate} İNDİRİM</span>

                        </div>)}

                        <Slider className='w-full mb-5' {...settings}>

                            {product?.product?.images?.map((image, i) => (

                                <img className='rounded-3xl h-[550px] w-full object-cover shadow-xl' key={i} src={image.url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/")} alt={product?.product?.name} loading={i === 0 ? "eager" : "lazy"} fetchpriority={i === 0 ? "high" : "low"}/>
                            ))}

                        </Slider>

                    </div>

                    <div className='flex flex-col space-y-6 flex-1'>

                        <div className='text-4xl font-extrabold text-gray-700 leading-tight'>{product?.product?.name}</div>
                        <div className='text-gray-600 text-lg leading-relaxed'>{product?.product?.description}</div>
                        <div className='flex items-center justify-between'>

                            <div className='flex'>

                                {discountRate > 0 && <span className="text-gray-400 line-through text-xl">{oldPrice} ₺</span>}
                                <div className='text-5xl font-black text-rose-500'>{product?.product?.price?.toLocaleString()} ₺</div>

                            </div>

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

                {!isAuth && ( <div>

                    <div>

                        <div className="max-w-6xl mx-auto p-4 md:p-10 flex flex-col md:flex-row gap-10">

                            <div className="flex-1 space-y-8">

                                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">

                                    <div className="flex items-center gap-3 mb-6 text-rose-500">

                                        <User size={24} />
                                        <h2 className="text-xl font-bold uppercase tracking-wide">İletişim Bilgileri</h2>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <input name="firstName" onChange={handleChange} className="input-style" placeholder="Adınız" />
                                        <input name="lastName" onChange={handleChange} className="input-style" placeholder="Soyadınız" />
                                        <input name="email" onChange={handleChange} className="input-style" placeholder="E-posta Adresiniz" />
                                        <input name="phone" onChange={handleChange} className="input-style" placeholder="Telefon Numaranız" />

                                    </div>

                                </section>

                                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">

                                    <div className="flex items-center gap-3 mb-6 text-rose-500">

                                        <MapPin size={24} />
                                        <h2 className="text-xl font-bold uppercase tracking-wide">Teslimat Adresi</h2>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div className="md:col-span-2"><textarea name="address" onChange={handleChange} className="input-style h-24" placeholder="Sokak, Mahalle ve Bina Detayları..." /></div>
                                        <input name="city" onChange={handleChange} className="input-style" placeholder="Şehir" />

                                        <select name="district" onChange={handleDistrictChange} className="input-style" placeholder="İlçe">

                                            {konyaDistricts.map((districs, index) => (

                                                <option key={index} value={districs.name}>{districs.name}</option>
                                            ))}

                                        </select>

                                    </div>

                                </section>

                                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">

                                    <div className="flex items-center justify-between mb-6">

                                        <div className="flex items-center gap-3 text-rose-500">

                                            <Receipt size={24} />
                                            <h2 className="text-xl font-bold uppercase tracking-wide">Fatura Bilgileri</h2>

                                        </div>

                                        <select name="invoiceType" onChange={handleChange} className="bg-rose-50 text-rose-600 font-bold p-2 rounded-xl outline-none border-none text-sm">

                                            <option value="individual">Bireysel</option>
                                            <option value="corporate">Kurumsal</option>

                                        </select>

                                    </div>

                                    {shippingInfo.invoiceType === "corporate" ? (

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">

                                            <input name="companyName" onChange={handleChange} className="input-style md:col-span-2" placeholder="Şirket Tam Ünvanı" />
                                            <input name="taxNumber" onChange={handleChange} className="input-style" placeholder="Vergi Numarası" />
                                            <input name="taxOffice" onChange={handleChange} className="input-style" placeholder="Vergi Dairesi" />

                                        </div>

                                    ) : ( <p className="text-gray-500 italic text-sm">Adınıza bireysel fatura düzenlenecektir.</p>)}

                                </section>

                            </div>

                            <div className="w-full md:w-[350px]">

                                <div className="text-gray-700 p-8 rounded-md border sticky top-16">

                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Truck size={20} /> Sipariş Özeti</h3>

                                    <div className="space-y-4 mb-6 border-b border-gray-700 pb-6 text-sm text-gray-600">

                                        <div className="flex justify-between"><span>Ara Toplam</span><span>{product?.product?.price} ₺</span></div>
                                        <div className="flex justify-between text-emerald-400"><span>Kargo ({selectedDistrict?.name || "Seçilmedi"})</span><span>{selectedDistrict ? (selectedDistrict.price === 0 ? "Ücretsiz" : `${selectedDistrict.price} ₺`) : "0 ₺"}</span></div>

                                    </div>

                                    <div className="flex justify-between text-2xl font-black mb-8">

                                        <span>Toplam</span>
                                        <span className="text-rose-500">{(product?.product?.price)+(selectedDistrict?.price || 0)} ₺</span>

                                    </div>

                                    <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl transition-all">Ödemeye Geç</button>

                                </div>

                            </div>

                            <style>{`

                                .input-style {

                                    width: 100%;
                                    padding: 1rem;
                                    background-color: #f8fafc;
                                    border: 1px solid #e2e8f0;
                                    border-radius: 1.25rem;
                                    outline: none;
                                    transition: all 0.3s;
                                }

                                .input-style:focus {

                                    background-color: white;
                                    border-color: #f43f5e;
                                    box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.1);
                                }

                            `}</style>
 
                        </div>

                    </div>

                    <hr className='my-16 border-gray-100' />

                </div>)}

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
