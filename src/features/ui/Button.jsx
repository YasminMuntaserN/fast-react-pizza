import { Link } from "react-router-dom";

function Button({children ,disabled  ,to , type ,onClick }) {

  const base ="bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:bg-ring-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles ={
    primary:base+'  py-3 px-4  md:py-6 md:px-4',
    small:base +" py-2 px-4 md:py-5 md:px-2.5 text-xs",
    round:base +" py-1 px-3 md:py-2.5 md:px-3.5 text-sm",
    secondary:" border-2 border-stone-300 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:bg-ring-stone-300 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed  py-3 px-4  md:py-6 md:px-4 "
  };

  if(to)
    return (
  <Link to={to} className={styles[type]}>{children}</Link>
    );

    if(onClick)
      return (
        <button disabled={disabled} className={styles[type] } onClick={onClick} >
          {children}
        </button>
      )

  return (
    <button disabled={disabled} className={styles[type] } >
      {children}
    </button>
  )
}

export default Button;
