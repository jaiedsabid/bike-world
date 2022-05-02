import { withProtectedRoute } from '../utils/withHOCs';

const Inventory = () => {
    return <h1>Inventory</h1>;
};

export default withProtectedRoute(Inventory);
