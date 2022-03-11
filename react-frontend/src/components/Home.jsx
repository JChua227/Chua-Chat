import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div>
        <h3 className='app-name'><u>Chua Chat</u></h3>
      </div>
      <br />
      <br />

      <div className="register-button">
        <button type="button" className="btn btn-primary">
          <Link to="/register" className="register-link">
            Register
          </Link>
        </button>
      </div>
      <div className="login-button">
        <button type="button" className="btn btn-primary">
          <Link to="/login" className="login-link">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
