import './App.css';
import {useEffect, useRef} from 'react'
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";


export default function AddUser() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const phoneInput = useRef(null);
    const phoneErrorMsg = useRef(null);
    const phoneLbl = useRef(null);
    let phone;
    const onSubmit = data => {
        data.phone = phoneInput.current.value;

        axios.postForm('http://localhost:8888/api.php?action=addUser', data).then(response => {
            console.log(response,"response");
         Swal.fire({
            title: 'Başarılı!',
            text: response.data.message,
            icon: 'success',
         })
        }).catch(error => {
            console.log(error,"error");
            Swal.fire({
                title: 'Hata!',
                text: error.response.data.message,
                icon: 'error',
            })
        })

    };

    const validPhoneNumber = () => {
        if (phone.isValidNumber()) {
            phoneInput.current.classList.add("border-gray-300");
            phoneInput.current.classList.remove("border-red-500");
            reset();
            return true;
        } else {
            phoneInput.current.classList.remove("border-gray-300");
            phoneInput.current.classList.add("border-red-500");
            phoneLbl.current.classList.add("text-red-500");
            const errorCode = phone.getValidationError();
            phoneErrorMsg.current.innerHTML = errorMap[errorCode];
            phoneErrorMsg.current.classList.remove("hidden");
            return false;
        }
    }
    const reset = function () {
        phoneInput.current.classList.remove("border-red-500");
        phoneInput.current.classList.add("border-gray-300");
        phoneLbl.current.classList.remove("text-red-500");
        phoneErrorMsg.current.innerHTML = "";
        phoneErrorMsg.current.classList.add("hidden");
    };

    const errorMap = ["Hatalı Numara", "Hatalı Ülke Kodu", "Girilen Numara Kısa", "Girilen Numara Uzun", "Hatalı Numara", "Hatalı Numara"];


    useEffect(() => {
        //eslint-disable-next-line
        phone = intlTelInput(phoneInput.current, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            preferredCountries: ['tr', 'us', 'gb', 'ca', 'au'],
            nationalMode: false,
            formatOnDisplay: false,
        });
    });
    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                if (validPhoneNumber()) {
                    onSubmit(data)
                }

            }, () => {
                validPhoneNumber();
            })}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
                        <h1 className="text-2xl font-bold">Kullanıcı Ekle</h1>
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div>
                            <label htmlFor="fullName"
                                   className={"block text-sm font-medium text-gray-700" + (errors.fullName ? " text-red-500" : "")}>
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                {...register('fullName', {required: "Bu Alan Gereklidir."})}
                                className={"mt-1 block w-full flex-1 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " + (errors.fullName ? "border-red-500" : "border-gray-300")}
                            />
                            {errors.fullName && (
                                <div className="inline-flex text-sm text-red-500">
                                    {errors.fullName.message}
                                </div>
                            )}
                        </div>


                        <div>
                            <label htmlFor="email"
                                   className={"block text-sm font-medium text-gray-700" + (errors.email ? " text-red-500" : "")}>
                                E-Posta
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                {...register('email', {
                                    required: "Bu Alan Gereklidir.",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Geçersiz E-Posta Adresi"
                                    }
                                })}
                                className={"mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " + (errors.email ? "border-red-500" : "border-gray-300")}
                            />
                            {errors.email && (
                                <div className="inline-flex text-sm text-red-500">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" ref={phoneLbl}
                                   className="block text-sm font-medium text-gray-700">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                ref={phoneInput}
                                onChange={validPhoneNumber}
                                placeholder=""
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <span ref={phoneErrorMsg} className="hidden mb-3 text-sm text-red-500"></span>
                        </div>

                        <div>
                            <label htmlFor="address"
                                   className={"block text-sm font-medium text-gray-700" + (errors.address ? " text-red-500" : "")}>
                                Adres
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows={3}
                                {...register('address', {
                                    required: "Bu Alan Gereklidir."
                                })}
                                className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" + (errors.address ? " border-red-500" : "")}
                            />

                            {errors.address && (
                                <div className="inline-flex text-sm text-red-500">
                                    {errors.address.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Kaydet
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}