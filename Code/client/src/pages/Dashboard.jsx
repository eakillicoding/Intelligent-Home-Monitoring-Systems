import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await apiRequest("/users/me");
        setUser(res.user);
      } catch (err) {
        setError("Not authenticated");
      }
    }
    loadUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name || user.email}</p>

      <div>
        <h3>Current Usage</h3>
        <p>(Coming next)</p>
      </div>

      <div>
        <h3>Historical Data</h3>
        <p>(Coming next)</p>
      </div>
    </div>
  );
}
