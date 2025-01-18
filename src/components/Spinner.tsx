import React from "react";

interface SpinnerProps {
  size?: string; // Size of the spinner (e.g., "w-8 h-8")
  color?: string; // Color of the spinner (e.g., "text-blue-500")
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "w-8 h-8", // Default size
  color = "text-blue-500", // Default color
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 ${size} ${color} border-gray-200`}
        style={{ borderTopColor: "currentcolor" }}
      ></div>
    </div>
  );
};

export default Spinner;
