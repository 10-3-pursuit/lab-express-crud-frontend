import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Link to="/logs">
      <img style={{ display: 'block', margin: '0 auto' }} src="https://i.etsystatic.com/37307182/r/il/287958/4155769518/il_570xN.4155769518_5xwa.jpg" alt="journal"/>
    </Link>
  )
}

export default Home;