import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Intelligent Home Monitoring System</h1>
      <p>Track energy usage and reduce electricity costs.</p>

      <Link to="/signup">
        <button>Create Account</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
