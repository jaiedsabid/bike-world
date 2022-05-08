import { memo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { PlusSmIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { classNames } from '../utils/helpers';
import ProductCard from './ProductCard';
import Button from './Button';
import AddItemForm from './AddItemForm';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Spinner';
import { useFetch } from '../utils/hooks';
import { API_BASE_URL, getAPIRoute } from '../utils/constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../firebase/firebase.init';
import { signOut } from 'firebase/auth';

// External CSS
import 'sweetalert2/dist/sweetalert2.min.css';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = ({
    title,
    limit,
    manageInventoryBtn,
    addNewItemBtn,
    enableDeleteBtn = false,
    byUser = false,
    className,
    ...props
}) => {
    const [user] = useAuthState(firebaseAuth);
    const navigate = useNavigate();
    const location = useLocation();
    const [openSlideOver, setOpenSlideOver] = useState(false);
    const Modal = withReactContent(Swal);
    const URL = getAPIRoute(API_BASE_URL, 'GET');
    const [setProducts, products, isLoading, isError, errorMsg] = useFetch(
        byUser ? `${URL}?user=${user.email}` : URL,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        }
    );

    const handleDelete = async (id) => {
        Modal.fire({
            title: 'Do you want to delete the item?',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Delete`,
        }).then(async (result) => {
            if (result.isDenied) {
                const success = await deleteItem(id);

                if (!success) {
                    return Modal.fire(
                        'Failed to delete the item!',
                        '',
                        'error'
                    );
                }

                Modal.fire('Deleted!', '', 'success');
            }
        });
    };

    const deleteItem = async (id) => {
        const deleteURL = getAPIRoute(API_BASE_URL, 'DELETE', id);
        try {
            const response = await fetch(deleteURL, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter((product) => product._id !== id));
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const addNewItem = async (item) => {
        const addURL = getAPIRoute(API_BASE_URL, 'CREATE');
        try {
            const response = await fetch(addURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...item, createdBy: user.email }),
            });
            if (response.ok) {
                const data = await response.json();
                setProducts([...products, data]);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    };

    const handleAddItem = async (product) => {
        const success = await addNewItem(product);
        setOpenSlideOver(false);

        if (!success) {
            return displayToast('Failed to add the item!', 'error');
        }

        displayToast('Item added successfully', 'success');
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

    if (isError) {
        signOut(firebaseAuth);
        localStorage.clear();
        navigate('/login', { from: location, replace: true });
    }

    return (
        <div className={classNames('bg-white', className)} {...props}>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                {title && (
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl md:text-center font-bold text-gray-900">
                        {title}
                    </h2>
                )}

                {addNewItemBtn && (
                    <div className="pb-4 w-full flex justify-end">
                        <Button
                            variant="primary"
                            onClick={() => setOpenSlideOver(true)}
                        >
                            Add New Item <PlusSmIcon className="w-6 h-6 ml-1" />
                        </Button>
                    </div>
                )}

                {products?.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                        {products
                            .slice(0, limit ? limit : products.length)
                            .map((product) => (
                                <ProductCard
                                    key={product._id}
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
            <AddItemForm
                open={openSlideOver}
                setOpen={setOpenSlideOver}
                addItemCallback={handleAddItem}
            />
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
        </div>
    );
};

export default memo(ProductList);
