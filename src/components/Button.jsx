const Button = ({ children, onClick, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
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
