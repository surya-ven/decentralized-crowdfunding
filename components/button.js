const Button = ({ children, text, onClick, styles }) => {
    return (
      <button onClick={onClick} className={`bg-indigo-600 border border-transparent rounded-md py-2 px-5 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${styles}`}>
        { text ? text : children }
      </button>
    );
}

export default Button;