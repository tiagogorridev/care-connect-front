const Card = ({ subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
          <img
            src="./assets/icon-heart.png"
            alt="Heart Icon"
            className="w-8 h-8"
          />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
          CareConnect
        </h1>
        {subtitle && (
          <p className="text-green-600 mt-2 font-medium">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  </div>
);

export default Card;
