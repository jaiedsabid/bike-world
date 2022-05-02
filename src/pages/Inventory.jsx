import { withProtectedRoute } from '../utils/withHOCs';
import ProductList from '../components/ProductList';

const Inventory = () => {
    return (
        <div className="py-10">
            <h2 className="text-2xl font-bold text-center leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Manage Inventory
            </h2>
            <ProductList enableDeleteBtn addNewItemBtn />
        </div>
    );
};

export default withProtectedRoute(Inventory);
