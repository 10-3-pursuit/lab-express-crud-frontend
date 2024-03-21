import { Link } from "react-router-dom"
import "./App.css"

const Header = () => {
  return (
    <header>
        <Link to="/logs">
          <h4>Daily Log Journal📓</h4>
        </Link>
        <Link to="/">
          <div className="home-link">
            <button >Home</button>
          </div>
        </Link>
    </header>
  )
}

export default Header