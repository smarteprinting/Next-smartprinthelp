"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

import { saveShippingAddress } from '../redux/actions/cartActions';
import api from '../lib/api';
import { Loader2, ShieldCheck, Truck, CreditCard, ChevronRight, Lock } from 'lucide-react';
import SEO from './common/SEO';

const Checkout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [province, setProvince] = useState(shippingAddress.state || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const [step, setStep] = useState(1);
    const [shippingRates, setShippingRates] = useState([]);
    const [distance, setDistance] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ratesFetched, setRatesFetched] = useState(false);
    const [clover, setClover] = useState(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    useEffect(() => {
        const mountCloverElements = () => {
            setTimeout(() => {
                const numberEl = document.querySelector('#card-number');
                const dateEl = document.querySelector('#card-date');
                const cvvEl = document.querySelector('#card-cvv');
                const zipEl = document.querySelector('#card-postal-code');

                // Check if containers exist and are empty
                if (numberEl && !numberEl.hasChildNodes()) {
                    const cloverInstance = new window.Clover(process.env.NEXT_PUBLIC_CLOVER_PUBLIC_KEY);
                    const elements = cloverInstance.elements();

                    const styles = {
                        body: {
                            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: '14px',
                            color: '#334155', // slate-700
                            fontWeight: '500',
                            margin: '0',
                            padding: '0',
                            width: '100%'
                        },
                        input: {
                            padding: '0',
                            margin: '0',
                            width: '100%'
                        },
                        'input::placeholder': {
                            color: '#94a3b8' // slate-400
                        }
                    };

                    const cardNumber = elements.create('CARD_NUMBER', { styles });
                    const cardDate = elements.create('CARD_DATE', { styles });
                    const cardCvv = elements.create('CARD_CVV', { styles });
                    const cardPostalCode = elements.create('CARD_POSTAL_CODE', { styles });

                    cardNumber.mount('#card-number');
                    cardDate.mount('#card-date');
                    cardCvv.mount('#card-cvv');
                    cardPostalCode.mount('#card-postal-code');

                    setClover(cloverInstance);
                }
            }, 100);
        };

        if (!userInfo || cartItems.length === 0) {
            router.push('/cart');
        } else if (step === 2) {
            if (window.Clover) {
                mountCloverElements();
                return;
            }

            let script = document.getElementById('clover-sdk');
            if (!script) {
                script = document.createElement('script');
                script.id = 'clover-sdk';
                script.src = 'https://checkout.clover.com/sdk.js';
                script.defer = true;
                document.body.appendChild(script);
            }

            script.addEventListener('load', mountCloverElements, { once: true });
        }
    }, [userInfo, cartItems, router, step]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = 0;
    const shippingPrice = selectedRate ? Number(selectedRate.rate) : 0;
    const totalPrice = subtotal + taxPrice + shippingPrice;

    const submitShippingHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, state: province, phone }));

        if (shippingRates.length === 0) {
            try {
                setLoading(true);
                const { data } = await api.post(
                    `/shipping`,
                    { address, city, postalCode, country, state: province, phone, cartItems }
                );
                
                const rates = data.rates || (Array.isArray(data) ? data : []);
                setDistance(data.distance || null);

                                // Deduplicate by carrier + service, keep cheapest of each
                                const uniqueMap = {};
                                rates.forEach(rate => {
                                    const key = `${rate.carrier}_${rate.service}`;
                                    if (!uniqueMap[key] || Number(rate.rate) < Number(uniqueMap[key].rate)) {
                                        uniqueMap[key] = rate;
                                    }
                                });
                                // Sort by price and show up to 4 best options
                                const bestRates = Object.values(uniqueMap)
                                    .sort((a, b) => Number(a.rate) - Number(b.rate))
                                    .slice(0, 4);
                                setShippingRates(bestRates);
                                setRatesFetched(true);
                                if (bestRates.length > 0) setSelectedRate(bestRates[0]);
            } catch (error) {
                alert(error.response?.data?.message || 'Error fetching shipping rates');
            } finally {
                setLoading(false);
            }
        } else {
            if (!selectedRate) {
                alert('Please select a shipping method');
                return;
            }
            setStep(2);
        }
    };

    // ✅ CLOVER PAYMENT
    const initPayment = async () => {
        try {
            setLoading(true);

            if (!clover) {
                alert('Clover not initialized');
                setLoading(false);
                return;
            }

            const result = await clover.createToken();
            if (result.errors) {
                 alert('Payment Error: ' + Object.values(result.errors).join(', '));
                 setLoading(false);
                 return;
            }
            if (!result.token) {
                 alert('Failed to create payment token. Please check your card details.');
                 setLoading(false);
                 return;
            }

            // 1. Create order
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { 
                    address, 
                    city, 
                    postalCode, 
                    country, 
                    phone, 
                    state: province,
                    shippingMethod: selectedRate ? `${selectedRate.carrier} ${selectedRate.service}` : ''
                },
                paymentMethod: 'Clover',
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            const { data: createdOrder } = await api.post(
                `/orders`,
                orderData
            );

            // 2. Clover payment (backend)
            await api.post(
                `/orders/clover/pay`,
                {
                    amount: totalPrice,
                    orderId: createdOrder._id,
                    source: result.token
                }
            );

            router.push('/profile');

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Clover payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-12">
            <SEO title="Checkout" description="Complete your order securely. Enter shipping details and payment information." canonical="/checkout" />
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4">

                {/* Progress */}
                <div className="flex items-center justify-center mb-12 space-x-4">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                                step >= s ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
                            }`}>
                                {s}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-3">
                        {step === 1 ? (
                            <form onSubmit={submitShippingHandler} className="bg-gradient-to-br from-white to-blue-50/30 p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-lg shadow-blue-100/30 border-2 border-slate-100 backdrop-blur-sm">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#EF4056] mb-8 flex flex-col sm:flex-row items-center gap-3 text-left">
                                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                        <Truck size={20} className="text-[#EF4056]" />
                                    </div>
                                    Billing details
                                </h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Street Address</label>
                                        <input 
                                            value={address} 
                                            onChange={(e) => { setAddress(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                            required 
                                            placeholder="123 Main St" 
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">City</label>
                                            <input 
                                                value={city} 
                                                onChange={(e) => { setCity(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required 
                                                placeholder="New York" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">State / Province</label>
                                            <input 
                                                value={province} 
                                                onChange={(e) => { setProvince(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required
                                                placeholder="NY" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Postal Code</label>
                                            <input 
                                                value={postalCode} 
                                                onChange={(e) => { setPostalCode(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required 
                                                placeholder="10001" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Country</label>
                                            <select 
                                                value={country} 
                                                onChange={(e) => { setCountry(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#EF4056] focus:border-transparent outline-none transition-all font-medium text-slate-700 max-h-48 overflow-y-auto"
                                            >
                                                <option value="" disabled>Select your country</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CV">Cape Verde</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CG">Congo</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czech Republic</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KR">Korea, South</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="KN">Saint Kitts and Nevis</option>
                                                <option value="LC">Saint Lucia</option>
                                                <option value="VC">Saint Vincent and the Grenadines</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="ST">Sao Tome and Principe</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SZ">Swaziland</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="TV">Tuvalu</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VA">Vatican City</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Phone Number</label>
                                            <input 
                                                value={phone} 
                                                onChange={(e) => setPhone(e.target.value)} 
                                                required 
                                                placeholder="+1 (555) 000-0000" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {(ratesFetched && (country === 'US' || country === 'CA')) ? (
                                    <div className="mt-8 p-6 bg-rose-50 border border-rose-200 rounded-xl text-center">
                                        <div className="text-lg font-extrabold text-[#EF4056]">Free shipping at your location!</div>
                                    </div>
                                ) : (
                                    shippingRates.length > 0 && (
                                        <div className="mt-8 space-y-4">
                                            <div className="flex justify-between items-end">
                                                <h3 className="text-lg font-bold text-slate-900">Select Shipping Method</h3>
                                                {distance && (
                                                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                                        Distance: {distance} miles
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-3">
                                                {shippingRates.map((rate) => (
                                                    <button 
                                                        type="button"
                                                        key={rate.id}
                                                        onClick={() => setSelectedRate(rate)}
                                                        className={`w-full p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center transition-all flex-wrap sm:flex-nowrap ${
                                                            selectedRate?.id === rate.id 
                                                                ? 'border-slate-900 bg-slate-50' 
                                                                : 'border-slate-100 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-bold text-slate-900 break-words whitespace-normal text-sm sm:text-base">{rate.service}</div>
                                                            <div className="text-xs text-slate-500 break-words whitespace-normal">{rate.carrier} • {rate.delivery_days ? `${rate.delivery_days} days` : 'Standard'}</div>
                                                        </div>
                                                        <div className="font-bold text-slate-900 text-right mt-2 sm:mt-0 min-w-[80px]">
                                                            ${Number(rate.rate).toFixed(2)} {rate.currency}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}

                                {shippingRates.length === 0 && !loading && !ratesFetched && (
                                     <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm border border-yellow-200">
                                        Please enter your address above and click Calculate Shipping to see available rates.
                                     </div>
                                )}

                                {shippingRates.length === 0 && !loading && ratesFetched && (
                                     <div className="mt-8 p-4 bg-red-50 text-red-800 rounded-xl text-sm border border-red-200">
                                        No shipping rates available for this address. Please verify your address details and try again.
                                     </div>
                                )}

                                <button type="submit" disabled={loading} className="w-full mt-10 bg-[#EF4056] text-white py-4 rounded-2xl font-extrabold uppercase text-base tracking-wider hover:shadow-lg hover:shadow-rose-200/50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-wait hover:bg-[#d93548]">
                                    {loading ? (
                                        <><Loader2 className="animate-spin text-[#EF4056]" /> <span>Calculating...</span></>
                                    ) : (
                                        shippingRates.length > 0 ? (
                                            <><span>Proceed to Payment</span> <ChevronRight size={16} className="text-[#EF4056]" /></>
                                        ) : (
                                            <><span>Calculate Shipping</span> <Truck size={16} className="text-[#EF4056]" /></>
                                        )
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-gradient-to-br from-white to-blue-50/30 p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-lg shadow-blue-100/30 border-2 border-slate-100 backdrop-blur-sm space-y-6 sm:space-y-8">
                                {/* Payment Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                                <CreditCard size={20} className="text-[#EF4056]" />
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#EF4056]">Payment</h2>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-600 whitespace-nowrap">
                                        Edit Shipping
                                    </button>
                                </div>

                                {/* Card Payment Section */}
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pay with Card</label>
                                        <div className="flex gap-2">
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">VISA</div>
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">MC</div>
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">AMEX</div>
                                        </div>
                                    </div>

                                    {/* Card Number */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Card Number</label>
                                        <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                            <div id="card-number" className="w-full h-[22px]"></div>
                                        </div>
                                    </div>

                                    {/* Expiry, CVV, Zip - Responsive Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Expiry</label>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-date" className="w-full h-[22px]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">CVV</label>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-cvv" className="w-full h-[22px]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Zip Code</label>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-postal-code" className="w-full h-[22px]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium px-1 mt-2">
                                        <Lock size={10} />
                                        <span>Instant Payment Processing. No OTP required for supported cards.</span>
                                    </div>

                                    {/* Terms & Conditions Checkbox */}
                                    <div className="mt-6 p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={agreeToTerms}
                                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                                className="w-5 h-5 mt-0.5 accent-[#EF4056] cursor-pointer rounded border-gray-300 focus:ring-2 focus:ring-[#EF4056]"
                                            />
                                            <span className="text-xs leading-relaxed text-gray-700 font-medium group-hover:text-gray-900">
                                                By placing your order, you confirm that you have read and agree to our <a href="/terms-and-conditions" target="_blank" className="text-[#EF4056] hover:text-red-700 underline font-semibold">Terms & Conditions</a> and understand how your personal information is collected and used as described in our <a href="/privacy-policy" target="_blank" className="text-[#EF4056] hover:text-red-700 underline font-semibold">Privacy Policy</a>.
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={initPayment}
                                    disabled={loading || !agreeToTerms}
                                    className="w-full mt-6 bg-[#EF4056] text-white py-4 rounded-2xl font-extrabold uppercase text-base tracking-wider hover:shadow-lg hover:shadow-rose-200/50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d93548]"
                                >
                                    {loading ? <Loader2 className="animate-spin text-[#EF4056]" size={18} /> : <><span>Pay Now</span> <ShieldCheck size={18} className="text-white" /></>}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl h-fit shadow-lg">
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Your order</h3>
                        <div className="space-y-4 font-semibold">
                            <div className="flex justify-between py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="text-gray-900 font-extrabold">${subtotal.toFixed(2)}</span>
                            </div>
                            {distance && (
                                <div className="flex justify-between py-3 px-4 bg-rose-50 rounded-xl border border-rose-100">
                                    <span className="text-[#EF4056] font-semibold">Distance</span>
                                    <span className="text-[#EF4056] font-extrabold">{distance} miles</span>
                                </div>
                            )}
                            <div className="flex justify-between py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
                                <span className="text-gray-700">Tax</span>
                                <span className="text-gray-900 font-extrabold">${taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
                                <span className="text-gray-700">Shipping</span>
                                <span className="text-gray-900 font-extrabold">${shippingPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="my-6 h-[2px] bg-gradient-to-r from-rose-200 via-transparent to-rose-200" />
                        <div className="flex justify-between items-center">
                            <span className="font-extrabold text-gray-700 text-lg">Total</span>
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#EF4056]">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-8 font-medium leading-relaxed px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                            🔒 Payments are securely processed via Clover (PCI-DSS compliant).
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
