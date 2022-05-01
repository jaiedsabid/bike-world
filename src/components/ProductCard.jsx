import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({
    id,
    imageSrc,
    name,
    description,
    supplier,
    price,
    quantity,
}) => {
    return (
        <div className="group relative bg-white border border-b-0 border-gray-200 rounded-lg flex flex-col overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96 transition-all duration-200 ease-in-out">
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">{description}</p>
                <div className="flex-1 flex flex-col justify-end">
                    <p className="text-sm italic text-gray-500">{supplier}</p>
                    <div className="flex justify-between">
                        <p className="text-base font-medium text-gray-900">
                            {price}
                        </p>
                        <p className="text-gray-500 text-sm font-medium">
                            <span className="inline-block">Quantity:</span>{' '}
                            {quantity}
                        </p>
                    </div>
                </div>
            </div>
            <Link
                to={`/inventory/${id}`}
                className="w-full flex justify-center text-sm font-semibold p-3 border-0 rounded-b outline-none bg-gray-200 group-hover:bg-gray-300 transition-all duration-200 ease-in-out"
            >
                Update
            </Link>
        </div>
    );
};

export default ProductCard;
