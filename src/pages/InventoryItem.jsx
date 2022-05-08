import { Fragment, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { withProtectedRoute } from '../utils/withHOCs';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import { classNames } from '../utils/helpers';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import Spinner from '../components/Spinner';
import { useFetch } from '../utils/hooks';
import { API_BASE_URL, getAPIRoute } from '../utils/constants';
import { toast, ToastContainer } from 'react-toastify';

const InventoryItem = () => {
    const { id } = useParams();
    const restockInput = useRef();
    const URL = getAPIRoute(API_BASE_URL, 'GET', id);
    const updateURL = getAPIRoute(API_BASE_URL, 'UPDATE', id);
    const [setProduct, product, isLoading, isError] = useFetch(URL);
    const breadcrumb = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Inventory',
            href: '/inventory',
        },
    ];

    const handleDeliver = async () => {
        if (product.quantity <= 0) {
            return displayToast('Item is out of stock', 'error');
        }

        try {
            const response = await fetch(updateURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: product.quantity - 1,
                }),
            });
            const data = await response.json();
            setProduct(data);
            displayToast('Product delivered successfully', 'success');
        } catch (error) {
            displayToast('Failed to deliver the product!', 'error');
        }
    };

    const handleRestock = async () => {
        const inpQuantity = restockInput.current.value;

        if (inpQuantity <= 0) {
            return displayToast(
                'Restock quantity must be greater than 0',
                'error'
            );
        }

        try {
            const response = await fetch(updateURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity:
                        product.quantity + Math.abs(parseInt(inpQuantity)),
                }),
            });
            const data = await response.json();
            setProduct(data);
            displayToast('Product restocked successfully', 'success');
        } catch (error) {
            displayToast('Failed to restock the product!', 'error');
        }

        // Reset the input value.
        restockInput.current.value = '';
    };

    const displayToast = (message, type = 'success') => {
        toast[type](message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!isLoading && isError) {
        return <Navigate to="/404" />;
    }

    return (
        <>
            <PageLayout>
                <div className="bg-white">
                    <div className="pt-6 pb-16 sm:pb-24">
                        {/* Breadcrumb */}
                        <nav
                            aria-label="Breadcrumb"
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                        >
                            <ol
                                role="list"
                                className="flex items-center space-x-1 text-sm text-gray-500"
                            >
                                {breadcrumb.map((crumb, index) => (
                                    <Fragment key={index}>
                                        <li>
                                            <Link
                                                className="block transition-colors hover:text-gray-700"
                                                to={crumb.href}
                                            >
                                                {crumb.name}
                                            </Link>
                                        </li>

                                        <li>
                                            <ChevronRightIcon className="w-4 h-4 mt-0.5" />
                                        </li>
                                    </Fragment>
                                ))}

                                <li>
                                    <p className="block transition-colors hover:text-gray-700 font-semibold">
                                        {product?.name}
                                    </p>
                                </li>
                            </ol>
                        </nav>
                        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                                <div className="lg:col-start-8 lg:col-span-5">
                                    <div className="flex justify-between">
                                        <h1 className="text-xl font-medium text-gray-900">
                                            {product?.name}
                                            <span className="mt-2 block text-sm font-medium italic text-gray-500">
                                                Supplier: {product?.supplier}
                                            </span>
                                        </h1>
                                        <p className="text-xl font-medium text-gray-900">
                                            ${product?.price}
                                        </p>
                                    </div>
                                    <div className="mt-5 flex items-center gap-3">
                                        {/* Available quantity */}
                                        <strong className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-lg font-medium">
                                            <span
                                                className={classNames(
                                                    'animate-ping w-2.5 h-2.5 rounded-full absolute -top-1 -left-1',
                                                    product?.quantity === 0
                                                        ? 'bg-red-600/75'
                                                        : 'bg-green-600/75'
                                                )}
                                            ></span>
                                            <span
                                                className={classNames(
                                                    'w-2.5 h-2.5 rounded-full absolute -top-1 -left-1',
                                                    product?.quantity === 0
                                                        ? 'bg-red-600'
                                                        : 'bg-green-600'
                                                )}
                                            ></span>
                                            <span className="text-gray-700">
                                                Available Quantity:
                                            </span>

                                            <span
                                                className={classNames(
                                                    'ml-1.5',
                                                    product?.quantity === 0
                                                        ? 'text-red-700'
                                                        : 'text-green-700'
                                                )}
                                            >
                                                {product?.quantity
                                                    ? product?.quantity
                                                    : 'Sold Out'}
                                            </span>
                                        </strong>
                                        <Button
                                            onClick={handleDeliver}
                                            disabled={product?.quantity === 0}
                                        >
                                            Delivered
                                        </Button>
                                    </div>
                                </div>

                                {/* Image gallery */}
                                <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                                    <h2 className="sr-only">Images</h2>

                                    <div className="grid grid-cols-1">
                                        <img
                                            src={product?.imageSrc}
                                            alt={product?.name}
                                            className="w-full h-full rounded-lg hidden lg:block"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 lg:col-span-5">
                                    {/* Description */}
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Description
                                    </h2>

                                    <div
                                        className="mt-4 prose prose-sm text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: product?.description,
                                        }}
                                    />
                                </div>
                                {/* Restock Form */}
                                <div className="mt-5 lg:col-span-5">
                                    <h2 className="font-semibold text-sm">
                                        Restock Item
                                    </h2>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-2">
                                        <div className="md:col-span-2">
                                            <label
                                                className="sr-only"
                                                htmlFor="restockCount"
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                ref={restockInput}
                                                type="number"
                                                name="restockCount"
                                                id="restockCount"
                                                className="w-full inline-block shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Enter quantity"
                                            />
                                        </div>
                                        <Button onClick={handleRestock}>
                                            Update
                                        </Button>
                                    </div>
                                    <div className="my-7 flex justify-start">
                                        <Link
                                            to="/inventory"
                                            className="w-full md:w-auto inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:shadow"
                                        >
                                            Manage Inventories
                                            <ArrowNarrowRightIcon className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default withProtectedRoute(InventoryItem);
