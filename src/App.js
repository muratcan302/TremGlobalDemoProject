import './App.css';
import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import 'intl-tel-input/build/css/intlTelInput.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import AddUser from "./AddUser";
import ListUser from "./ListUser";


export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="list-users" element={<ListUser />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    )
}


function Layout(){
    return (  <>
        <Popover className="relative bg-white">
            <div className="mx-auto max-w-7xl px-6">
                <div
                    className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/">
                            <span className="text-2xl">Trem Global</span>
                        </Link>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button
                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Menüyü Aç</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                        <Link to="/list-users" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Kullanıcı Listesi
                        </Link>
                        <Link to="/add-user" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Kullanıcı Ekle
                        </Link>
                    </Popover.Group>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus
                               className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div
                        className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button
                                        className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Menüyü Kapat</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    <Link
                                        tp="/list-users"
                                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                    >
                                            <span
                                                className="ml-3 text-base font-medium text-gray-900">Kullanıcı Listesi</span>
                                    </Link>
                                    <Link
                                        to="/add-user"
                                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                    >
                                            <span
                                                className="ml-3 text-base font-medium text-gray-900">Kullanıcı Ekle</span>
                                    </Link>

                                </nav>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
        <div className="container px-4 sm:px-0 mx-auto mt-20">
            <div className="sm:w-4/5 mx-auto">
                <Outlet />
            </div>
        </div>
    </>)
}

function Home() {
    return (
        <div>
            <h2 className="text-center text-2xl">Lütfen Üst Menüden Seçim Yapın</h2>
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}