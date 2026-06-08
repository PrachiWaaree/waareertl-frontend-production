export const ErrorMessage = ({ children, ...other }) => {
    return (
        <span className="error-message fs-28 fw-500 text-center" {...other}>
            {children}
        </span>
    );
};
