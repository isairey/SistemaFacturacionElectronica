import { Link } from 'react-router-dom'
import ButtonIcon from './ButtonIcon'
function Header(data) { //usually the main layout is also homepage, to login and stuff i guess
    return (
      <>
        <header>
          <div className="company-info">
              <img className="logo" src={data.logo} alt="Insert logo"></img>
            <div className="company-text">
              <h2 className="company-name">{data.name}</h2>
              <h3 className="company-slogan">{data.slogan}</h3>
            </div>
          </div>
          <nav>
            <Link to="/vender"><ButtonIcon icon="./src/assets/icons/cart.svg"></ButtonIcon></Link>
            <Link to="/comprobantes"><ButtonIcon icon="./src/assets/icons/list.svg"> </ButtonIcon></Link>
            <Link to="/productos"><ButtonIcon icon="./src/assets/icons/cube.svg"></ButtonIcon></Link>
            <Link to="/dashboard"><ButtonIcon icon="./src/assets/icons/graph.svg"></ButtonIcon></Link>
            <Link to="/configuracion"><ButtonIcon icon="./src/assets/icons/config.svg"></ButtonIcon></Link>
            <Link to="/"><ButtonIcon icon="./src/assets/icons/logout.svg"></ButtonIcon></Link>
          </nav>
        </header>
      </>
    )
}

export default Header