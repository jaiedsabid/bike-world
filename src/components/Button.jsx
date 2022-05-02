import { classNames } from '../utils/helpers';

const Button = ({ children, onClick, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={classNames(
                'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none',
                props.disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            onClick={() => {
                if (typeof onClick === 'function') {
                    onClick();
                }
            }}
        >
            {children}
        </button>
    );
};

export default Button;
