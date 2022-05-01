import Hero from '../components/Hero';
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Hero />
            {/* Status section */}
            <div className="bg-gray-50 pt-12 sm:pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Over 100k+ bikes sold every year in Bangladesh
                        </h2>
                        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                            Customer satisfaction is our number one priority. We
                            are providing 24/7 service to our customers.
                        </p>
                    </div>
                </div>
                <div className="mt-10 pb-12 bg-white sm:pb-16">
                    <div className="relative">
                        <div className="absolute inset-0 h-1/2 bg-gray-50" />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                            Customer satisfaction
                                        </dt>
                                        <dd className="order-1 text-5xl font-extrabold text-blue-600">
                                            100%
                                        </dd>
                                    </div>
                                    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                            Delivery
                                        </dt>
                                        <dd className="order-1 text-5xl font-extrabold text-blue-600">
                                            24/7
                                        </dd>
                                    </div>
                                    <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                            Sold
                                        </dt>
                                        <dd className="order-1 text-5xl font-extrabold text-blue-600">
                                            100k
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contacts section */}
            <div className="relative bg-white">
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-t from-gray-50 to-white" />
                </div>
                <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
                    <div className="bg-gradient-to-t from-gray-50 to-white py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                        <div className="max-w-lg mx-auto">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                Get in touch
                            </h2>
                            <p className="mt-3 text-lg leading-6 text-gray-500">
                                Have a question? We'd love to hear from you.
                                Send us a message and we'll get back to you as
                                soon as possible.
                            </p>
                            <dl className="mt-8 text-base text-gray-500">
                                <div>
                                    <dt className="sr-only">Postal address</dt>
                                    <dd>
                                        <p>Vaina, Magura Sadar</p>
                                        <p>Magura, Bangladesh</p>
                                    </dd>
                                </div>
                                <div className="mt-6">
                                    <dt className="sr-only">Phone number</dt>
                                    <dd className="flex">
                                        <PhoneIcon
                                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-3">
                                            +880-1711-878-988
                                        </span>
                                    </dd>
                                </div>
                                <div className="mt-3">
                                    <dt className="sr-only">Email</dt>
                                    <dd className="flex">
                                        <MailIcon
                                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-3">
                                            support@bikeworld.com
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                            <p className="mt-6 text-base text-gray-500">
                                Looking for Frequently Asked Questions?{' '}
                                <Link
                                    to="/blog"
                                    className="font-medium text-gray-700 underline"
                                >
                                    View FAQ
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                        <div className="max-w-lg mx-auto lg:max-w-none">
                            <form
                                action="#"
                                method="POST"
                                className="grid grid-cols-1 gap-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="full-name"
                                        className="sr-only"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        name="full-name"
                                        id="full-name"
                                        autoComplete="name"
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="sr-only">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="tel"
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="sr-only"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                                        placeholder="Message"
                                        defaultValue={''}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
