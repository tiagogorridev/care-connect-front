import React from "react";
import Button from "../others/Button";

const QuickActionCard = React.memo(
  ({ title, description, buttonText, onClick }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          className="shrink-0"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
);

QuickActionCard.displayName = "QuickActionCard";

export default QuickActionCard;
