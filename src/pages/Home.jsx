import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="home-wrapper">
			<img src="../../fcp.svg" className="login-logo"></img>
			<h2>Home page</h2>
			<Link to="/login">
				<button>Login</button>
			</Link>
			<Link to="/register">
				<button>Register</button>
			</Link>
			<Link to="/dashboard">Demo</Link>
		</div>
	);
}

export default Home;