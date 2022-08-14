const Button = ({ big, outline, customClass = '', children }) => {
    return (
        <button
            className={`${customClass} uppercase text-white font-bold rounded transition-all duration-300 ${
                big ? 'py-2.5 px-9' : 'text-xs px-3.5 py-1'
            } ${
                outline
                    ? 'bg-transparent border-2 hover:bg-brown-300 hover:border-brown-300'
                    : 'bg-brown-300 hover:bg-brown-400'
            }`}
        >
            {children}
        </button>
    )
}
export default Button
