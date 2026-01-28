import React from 'react';
import Map from './Map';

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
                            <li><a href="/sss" className='hover:text-rose-500 transition'>Sıkça Sorulan Sorular</a></li>
                            <li><a href="/about" className='hover:text-rose-500 transition'>Hakkımızda</a></li>
                            <li><a href="/paymentnotif" className='hover:text-rose-500 transition'>Ödeme Yolları</a></li>
                            <li><a href="/contact" className='hover:text-rose-500 transition'>Bize Ulaşın</a></li>

                        </ul>

                    </div>

                    <div className='text-center sm:text-left'>

                        <h3 className='font-bold text-lg mb-4 border-b-2 border-rose-500 inline-block sm:block'>Gizlilik</h3>

                        <ul className='space-y-2 text-gray-600'>

                            <li><a href="/mesafelisatis" className='hover:text-rose-500 transition'>Mesafeli Satış Sözleşmesi</a></li>
                            <li><a href="/gizliliksozlesmesi" className='hover:text-rose-500 transition'>Gizlilik Sözleşmesi</a></li>
                            <li><a href="/iadepolitikasi" className='hover:text-rose-500 transition'>İade Politikası</a></li>

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
                            { icon: <FaFacebookF />, color: 'hover:bg-facebook', link:'https://www.facebook.com/?locale=tr_TR' },
                            { icon: <FaXTwitter />, color: 'hover:bg-twitter', link:'https://x.com/?lang=tr' },
                            { icon: <FaInstagram />, color: 'hover:bg-instagram', link:'https://www.instagram.com/' },
                            { icon: <FaPinterestP />, color: 'hover:bg-pinterest', link:'https://tr.pinterest.com/' },
                            { icon: <FaReddit />, color: 'hover:bg-reddit', link:'https://www.reddit.com/' },
                            { icon: <FaSnapchatGhost />, color: 'hover:bg-snapchat', link:'https://www.snapchat.com/' },
                            { icon: <FaLinkedinIn />, color: 'hover:bg-linkedin', link:'https://www.linkedin.com/feed/' },
                            { icon: <FaWhatsapp />, color: 'hover:bg-whatssapp', link:'https://www.whatsapp.com/?lang=tr' },
                        ].map((social, index) => ( <div key={index} className={`text-2xl md:text-3xl p-2 cursor-pointer rounded border-2 border-black transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}>

                            <a href={social.link}>{social.icon}</a>

                        </div> ))}

                    </div>

                </div>

            </div>

            <Map />

        </footer>

    );
};


export default Footer;
