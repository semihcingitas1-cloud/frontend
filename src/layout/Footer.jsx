import React from 'react';

import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter, FaPinterestP, FaReddit } from "react-icons/fa6";

const Footer = () => {

    return (

        <footer className='w-full flex flex-col lg:flex-row items-start justify-between p-6 lg:p-10 border-t-2 border-black gap-10'>

            <div className='flex flex-col items-center w-full lg:w-1/2 space-y-10'>

                <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4'>

                    <div className='text-center sm:text-left'>

                        <h3 className='font-bold text-lg mb-4 border-b-2 border-rose-500 inline-block sm:block'>Kurumsal</h3>

                        <ul className='space-y-2 text-gray-600'>

                            <li><a href="/" className='hover:text-rose-500 transition'>Anasayfa</a></li>
                            <li><a href="/" className='hover:text-rose-500 transition'>Sıkça Sorulan Sorular</a></li>
                            <li><a href="/" className='hover:text-rose-500 transition'>Hakkımızda</a></li>
                            <li><a href="/" className='hover:text-rose-500 transition'>Ödeme Bildirimi</a></li>
                            <li><a href="/" className='hover:text-rose-500 transition'>Bize Ulaşın</a></li>

                        </ul>

                    </div>

                    <div className='text-center sm:text-left'>

                        <h3 className='font-bold text-lg mb-4 border-b-2 border-rose-500 inline-block sm:block'>Gizlilik</h3>

                        <ul className='space-y-2 text-gray-600'>

                            <li><a href="/" className='hover:text-rose-500 transition'>Mesafeli Satış Sözleşmesi</a></li>
                            <li><a href="/" className='hover:text-rose-500 transition'>Gizlilik Sözleşmesi</a></li>
                            <li><a href="/" className='hover:text-rose-500 transition'>İade Politikası</a></li>

                        </ul>

                    </div>

                    <div className='text-center sm:text-left'>

                        <h3 className='font-bold text-lg mb-4 border-b-2 border-rose-500 inline-block sm:block'>İletişim</h3>
                        <ul className='space-y-2 text-gray-600'>

                            <li><a href="tel:+905511335410" className='hover:text-rose-500 transition'>+90 551 133 54 10</a></li>
                            <li><a href="mailto:info@semihcingitas.com" className='hover:text-rose-500 transition break-words'>info@semihcingitas.com</a></li>

                        </ul>

                    </div>

                </div>

                <div className='w-full flex flex-col items-center gap-6'>

                    <div className='text-xl md:text-2xl font-medium text-center'>Bizi Sosyal Medyada Takip Edin</div>

                    <div className='flex flex-wrap justify-center gap-3 md:gap-4 max-w-lg'>

                        {[
                            { icon: <FaFacebookF />, color: 'hover:bg-facebook' },
                            { icon: <FaXTwitter />, color: 'hover:bg-twitter' },
                            { icon: <FaInstagram />, color: 'hover:bg-instagram' },
                            { icon: <FaPinterestP />, color: 'hover:bg-pinterest' },
                            { icon: <FaReddit />, color: 'hover:bg-reddit' },
                            { icon: <FaSnapchatGhost />, color: 'hover:bg-snapchat' },
                            { icon: <FaLinkedinIn />, color: 'hover:bg-linkedin' },
                            { icon: <FaWhatsapp />, color: 'hover:bg-whatssapp' },
                        ].map((social, index) => (
                            <div key={index} className={`text-2xl md:text-3xl p-2 cursor-pointer rounded border-2 border-black transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}>
                                {social.icon}
                            </div>
                        ))}

                    </div>

                </div>

            </div>

            <div className='w-full lg:w-1/2 flex flex-col items-center gap-4'>

                <div className='text-md md:text-lg font-medium text-center bg-gray-100 p-3 rounded-lg w-full'> 📍 Emlak Konut Dükkanları B/2 No:46 Merkez/Nevşehir </div>

                <div className='w-full overflow-hidden rounded-xl border-2 border-gray-600 shadow-lg'>

                    <iframe className='w-full h-64 lg:h-80' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.46!2d34.71!3d38.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDM3JzEyLjAiTiAzNMKwNDInMzYuMCJF!5e0!3m2!1str!2str!4v1625000000000!5m2!1str!2str' loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Adres Haritası"></iframe>

                </div>

            </div>

        </footer>

    );
};


export default Footer;
