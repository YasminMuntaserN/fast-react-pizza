import { Link } from "react-router-dom"
import SearchOrder from "../order/SearchOrder"

function Header() {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder/>
      <p></p>
    </header>
  )
}

export default Header
