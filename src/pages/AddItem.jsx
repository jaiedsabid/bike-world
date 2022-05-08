import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageLayout from '../components/PageLayout';
import { firebaseAuth } from '../firebase/firebase.init';
import { withProtectedRoute } from '../utils/withHOCs';
import { API_BASE_URL, getAPIRoute, inputFields } from '../utils/constants';
import { classNames } from '../utils/helpers';
import Button from '../components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { loadingIndicator } from '../utils/icons';

// External CSS
import 'react-toastify/dist/ReactToastify.css';

const AddItem = () => {
    const defaultValues = {
        name: '',
        price: 0,
        description: '',
        supplier: '',
        imageSrc: '',
        quantity: 0,
    };
    const [stateValue, setStateValue] = useState(defaultValues);
    const [processing, setProcessing] = useState(false);
    const [user] = useAuthState(firebaseAuth);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStateValue({
            ...stateValue,
            [name]: value,
        });
    };

    const addNewItem = async () => {
        if (processing) {
            return;
        }

        const { name, description, supplier, imageSrc, quantity, price } =
            stateValue;
        if (!name || !description || !supplier || !imageSrc) {
            return displayToast('Please fill up all the fields!', 'error');
        }

        if (quantity < 0 || price < 0) {
            return displayToast(
                "Quantity and price can't be negative!",
                'error'
            );
        }

        setProcessing(true);
        const addURL = getAPIRoute(API_BASE_URL, 'CREATE');
        try {
            const response = await fetch(addURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...stateValue, createdBy: user.email }),
            });
            if (response.ok) {
                displayToast('Product added successfully', 'success');
                setStateValue(defaultValues);
            } else {
                displayToast('Failed to add the product!', 'error');
            }
        } catch (error) {
            displayToast('Failed to add the product!', 'error');
        } finally {
            setProcessing(false);
        }
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

    return (
        <PageLayout>
            <div className="py-10">
                <h2 className="text-2xl font-bold text-center leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Add New Item
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="rounded shadow-md">
                        {stateValue.imageSrc && (
                            <img
                                src={stateValue.imageSrc}
                                alt={stateValue.name}
                                className="w-full h-full rounded object-contain"
                            />
                        )}
                        {!stateValue.imageSrc && (
                            <div className="w-full min-h-[200px] lg:h-full flex items-center justify-center">
                                <h3 className="text-lg font-semibold text-gray-400">
                                    Image will be displayed here
                                </h3>
                            </div>
                        )}
                    </div>
                    <form
                        onSubmit={(event) => event.preventDefault()}
                        action="#"
                        className="grid grid-cols-1 items-center gap-4"
                    >
                        {inputFields.map(
                            ({ name, label, type, placeholder }, indx) => (
                                <div
                                    key={name}
                                    className={classNames(
                                        indx + 1 === inputFields.length
                                            ? 'mb-5'
                                            : 'mb-0'
                                    )}
                                >
                                    <label
                                        htmlFor={name}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {label}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type={type}
                                            name={name}
                                            value={stateValue[name]}
                                            id={name + '-input'}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder={placeholder}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                        <Button onClick={addNewItem}>
                            {!processing ? 'Add Item' : loadingIndicator}
                        </Button>
                    </form>
                </div>
            </div>
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
        </PageLayout>
    );
};

export default withProtectedRoute(AddItem);
