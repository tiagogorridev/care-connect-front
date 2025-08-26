const Button = ({ children, variant, size, full, className, ...props }) => {
  const base =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 px-3 py-3 space-x-3 gap-3";

  const variants = {
    primary:
      "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-green-500",
    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-green-600 hover:text-green-800 hover:underline",
    blue: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-blue-500",
    yellow:
      "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-yellow-500",
    red: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
    full: "w-full px-8 py-4 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
