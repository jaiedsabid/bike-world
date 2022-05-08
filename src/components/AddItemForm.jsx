import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Button from './Button';
import { classNames } from '../utils/helpers';
import { inputFields } from '../utils/constants';
import { toast, ToastContainer } from 'react-toastify';
import { loadingIndicator } from '../utils/icons';

// External CSS
import 'react-toastify/dist/ReactToastify.css';

const AddItemForm = ({ open, setOpen, addItemCallback }) => {
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStateValue({
            ...stateValue,
            [name]: value,
        });
    };

    const handleAddNewItem = async () => {
        if (processing) {
            return;
        }
        setProcessing(true);

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

        if (typeof addItemCallback === 'function') {
            await addItemCallback(stateValue);
        }
        setOpen(false);
        setStateValue(defaultValues);
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
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="z-20 fixed inset-0 overflow-hidden"
                onClose={setOpen}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                                Add New Item
                                            </Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    <span className="sr-only">
                                                        Close panel
                                                    </span>
                                                    <XIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        {/* Replace with your content */}
                                        <div className="absolute inset-0 px-4 sm:px-6">
                                            {/* Add product form */}
                                            {stateValue.imageSrc && (
                                                <div className="mt-2 mb-4">
                                                    <img
                                                        src={
                                                            stateValue.imageSrc
                                                        }
                                                        className="w-full h-auto rounded"
                                                    />
                                                </div>
                                            )}
                                            <div className="w-full grid grid-cols-1 gap-3 pb-10">
                                                {inputFields.map(
                                                    (
                                                        {
                                                            name,
                                                            label,
                                                            type,
                                                            placeholder,
                                                        },
                                                        indx
                                                    ) => (
                                                        <div
                                                            key={name}
                                                            className={classNames(
                                                                indx + 1 ===
                                                                    inputFields.length
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
                                                                    value={
                                                                        stateValue[
                                                                            name
                                                                        ]
                                                                    }
                                                                    id={
                                                                        name +
                                                                        '-input'
                                                                    }
                                                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    placeholder={
                                                                        placeholder
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                                <Button
                                                    variant="primary"
                                                    onClick={handleAddNewItem}
                                                >
                                                    {!processing
                                                        ? 'Add Item'
                                                        : loadingIndicator}
                                                </Button>
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
                                        </div>
                                        {/* /End replace */}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AddItemForm;
