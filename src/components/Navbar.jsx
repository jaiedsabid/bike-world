import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navLinks = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Blog',
            path: '/blog',
        },
        {
            name: 'Login',
            path: '/login',
        },
    ];

    return (
        <Disclosure as="nav" className="bg-white shadow relative z-10">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                {/* Brand Name */}
                                <div className="flex-shrink-0 flex items-center text-lg font-bold">
                                    Bike World
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {navLinks.map(({ name, path }, indx) => (
                                        <NavLink
                                            key={indx}
                                            to={path}
                                            className={({ isActive }) =>
                                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                                    isActive
                                                        ? 'border-blue-500 text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                                }`
                                            }
                                        >
                                            {name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-4 space-y-1">
                            {navLinks.map(({ name, path }, indx) => (
                                <Disclosure.Button
                                    key={indx}
                                    as="button"
                                    className="block w-full text-left"
                                >
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                                isActive
                                                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                                                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                            }`
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
