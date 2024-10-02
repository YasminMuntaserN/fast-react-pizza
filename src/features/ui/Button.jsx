import { Link } from "react-router-dom";

function Button({children ,disabled  ,to}) {
  const className ="bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:bg-ring-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:py-4 sm:px-6";

  if(to)
    return (
  <Link to={to} className={className}>{children}</Link>
    );

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  )
}

export default Button
