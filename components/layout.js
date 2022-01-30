const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl py-7 mx-auto px-2 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
