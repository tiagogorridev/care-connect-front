import Button from "../others/Button";

const ConfigCard = ({
  icon,
  title,
  description,
  buttonText,
  buttonColor,
  onClick,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 ${icon.bgColor} rounded-full flex items-center justify-center`}
        >
          {icon.svg}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <Button variant={buttonColor} size="sm" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  </div>
);

export default ConfigCard;
