import { useAuthStore } from "../context/store";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    return <Navigate to={"/login"} />;
  };

  return (
    <div>
      <div>Home</div>
      <div>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
}
