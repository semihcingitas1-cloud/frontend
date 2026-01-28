import React from 'react';
import { PiCreditCardLight, PiBankLight, PiShieldCheckLight, PiClockCounterClockwiseLight, PiIdentificationCardLight } from "react-icons/pi";

const PaymentNotif = () => {

    const banks = [

        { name: "Ziraat Bankası", iban: "TR44 0001 0090 1051 1223 6050 01", owner: "Flora Haven Ltd. Şti." },
        { name: "Garanti BBVA", iban: "TR11 1111 1111 1111 1111 1111 11", owner: "Flora Haven Ltd. Şti." },
        { name: "İş Bankası", iban: "TR22 2222 2222 2222 2222 2222 22", owner: "Flora Haven Ltd. Şti." },
    ];

    return (

        <div className="bg-gray-50 min-h-screen py-16 px-4">

            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-16">

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Ödeme Seçenekleri</h1>
                    <p className="text-gray-500">Güvenli ödeme yöntemlerimizle alışverişinizi kolayca tamamlayın.</p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="space-y-6">

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

                            <div className="flex items-center gap-4 mb-6 text-rose-500">

                                <PiCreditCardLight size={40} />
                                <h2 className="text-xl font-bold text-gray-800">Kredi / Banka Kartı</h2>

                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Tüm bankaların kredi kartları ve banka kartları (Debit) ile ödemenizi gerçekleştirebilirsiniz. 
                                Bonus, Maximum, World gibi kartlara **vade farksız taksit** seçeneklerimiz mevcuttur.
                            </p>

                            <div className="flex gap-3 grayscale opacity-70">

                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-8" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-8" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-8" alt="Paypal" />

                            </div>

                        </div>

                        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">

                            <div className="flex items-start gap-4">

                                <PiShieldCheckLight size={32} className="text-emerald-600" />

                                <div>

                                    <h3 className="font-bold text-emerald-800">Güvenli Ödeme Altyapısı</h3>
                                    <p className="text-emerald-700 text-xs mt-1 leading-relaxed">
                                        Ödemeleriniz 256-bit SSL sertifikası ve 3D Secure güvenli ödeme onayı ile korunmaktadır. 
                                        Kart bilgileriniz sistemlerimizde asla saklanmaz.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

                        <div className="flex items-center gap-4 mb-6 text-rose-500">

                            <PiBankLight size={40} />
                            <h2 className="text-xl font-bold text-gray-800">Havale / EFT Bilgileri</h2>

                        </div>

                        <p className="text-gray-600 text-sm mb-6">

                            Siparişinizi oluşturduktan sonra aşağıdaki hesap numaralarımızdan herhangi birine ödeme yapabilirsiniz.

                        </p>
                        
                        <div className="space-y-4">

                            {banks.map((bank, index) => ( <div key={index} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-rose-200 transition-all">

                                <div className="text-sm font-bold text-gray-800">{bank.name}</div>
                                <div className="text-xs text-rose-600 font-mono mt-1 break-all uppercase">{bank.iban}</div>
                                <div className="text-[10px] text-gray-400 mt-1">{bank.owner}</div>

                            </div> ))}

                        </div>

                        <div className="mt-8 pt-6 border-t border-dashed border-gray-200">

                            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4">

                                <PiClockCounterClockwiseLight size={20} className="text-rose-500" />
                                Ödeme Bildirimi Süreci

                            </h3>

                            <ul className="text-xs text-gray-500 space-y-3">

                                <li className="flex gap-2">

                                    <span className="bg-rose-100 text-rose-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                                    <span>Havale/EFT açıklama kısmına **Sipariş Numaranızı** mutlaka yazınız.</span>

                                </li>

                                <li className="flex gap-2">

                                    <span className="bg-rose-100 text-rose-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                                    <span>Ödemeniz yaklaşık 30 dakika içerisinde onaylanacaktır.</span>

                                </li>

                                <li className="flex gap-2">

                                    <span className="bg-rose-100 text-rose-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                                    <span>Onaylandığında e-posta ve SMS ile bilgilendirme yapılacaktır.</span>

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

                <div className="mt-12 bg-white p-6 rounded-2xl flex items-center gap-4 border border-gray-100">

                    <div className="bg-rose-50 p-3 rounded-full text-rose-500"><PiIdentificationCardLight size={28} /></div>

                    <div>

                        <h4 className="font-bold text-gray-800 text-sm">Fatura Bilgisi</h4>
                        <p className="text-gray-500 text-xs mt-0.5">Tüm siparişleriniz e-fatura olarak hazırlanır ve e-posta adresinize gönderilir.</p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PaymentNotif;