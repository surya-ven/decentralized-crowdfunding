const FullWidthCard = ({ address, action, href }) => {
    return (
      <div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 break-all">
            {address}
          </h2>
          <a className="text-blue-700" href={href}>{action}</a>
        </div>
      </div>
    );
}

export default FullWidthCard;