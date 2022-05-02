import { classNames } from '../utils/helpers';
import ProductCard from './ProductCard';
import { PRODUCTS as products } from '../data/dummyData';

const ProductList = ({ title, limit, className, ...props }) => {
    return (
        <div className={classNames('bg-white', className)} {...props}>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                {title && (
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl md:text-center font-bold text-gray-900">
                        {title}
                    </h2>
                )}

                <div className="mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                    {products
                        .slice(0, limit ? limit : products.length)
                        .map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
