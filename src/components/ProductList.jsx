import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { PlusSmIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { classNames } from '../utils/helpers';
import ProductCard from './ProductCard';
import Button from './Button';
import { PRODUCTS } from '../data/dummyData';

// External CSS
import 'sweetalert2/dist/sweetalert2.min.css';

const ProductList = ({
    title,
    limit,
    manageInventoryBtn,
    addNewItemBtn,
    enableDeleteBtn = false,
    className,
    ...props
}) => {
    const [products, setProducts] = useState([]);
    const Modal = withReactContent(Swal);

    useEffect(() => {
        setProducts(PRODUCTS.slice(0, limit ? limit : PRODUCTS.length));
    }, []);

    const handleDelete = (id) => {
        Modal.fire({
            title: 'Do you want to delete the item?',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Delete`,
        }).then((result) => {
            if (result.isDenied) {
                Modal.fire('Deleted!', '', 'success');

                // Remove the item from the list
                setProducts(products.filter((product) => product.id !== id));
            }
        });
    };

    return (
        <div className={classNames('bg-white', className)} {...props}>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                {title && (
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl md:text-center font-bold text-gray-900">
                        {title}
                    </h2>
                )}

                {addNewItemBtn && (
                    <div className="py-4 w-full flex justify-end">
                        <Button variant="primary">
                            Add New Item <PlusSmIcon className="w-6 h-6 ml-1" />
                        </Button>
                    </div>
                )}

                {products.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                        {products
                            .slice(0, limit ? limit : products.length)
                            .map((product) => (
                                <ProductCard
                                    key={product.id}
                                    {...product}
                                    enableDeleteBtn={enableDeleteBtn}
                                    deleteBtnCallback={handleDelete}
                                />
                            ))}
                    </div>
                ) : (
                    <div className="text-center my-10">
                        <p className="text-gray-500">No items found.</p>
                    </div>
                )}

                {manageInventoryBtn && (
                    <div className="my-7 flex justify-center">
                        <Link
                            to="/inventory"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:shadow"
                        >
                            Manage Inventories
                            <ArrowNarrowRightIcon className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
