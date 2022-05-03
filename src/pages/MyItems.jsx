import { withProtectedRoute } from '../utils/withHOCs';
import PageLayout from '../components/PageLayout';
import ProductList from '../components/ProductList';

const MyItems = () => {
    return (
        <PageLayout>
            <div className="py-10">
                <h2 className="text-2xl font-bold text-center leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    My Items
                </h2>
                <ProductList enableDeleteBtn addNewItemBtn byUser />
            </div>
        </PageLayout>
    );
};

export default withProtectedRoute(MyItems);
