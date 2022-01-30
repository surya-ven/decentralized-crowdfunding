const Card = ({ title, details, description }) => {
  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg">
      <div>
        <h2 className="text-gray-800 text-2xl font-semibold break-all">{details}</h2>
        <p className="text-gray-400 text-md">{title}</p>
        <p className="my-2 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
