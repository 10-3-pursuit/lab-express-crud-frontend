import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <Link to="/logs">
          <h4>Daily Log Journal📓</h4>
        </Link>
    </header>
  )
}

export default Header