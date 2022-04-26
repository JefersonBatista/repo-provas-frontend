import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import logoutIcon from "../assets/logout.svg";

export default function Logout() {
  const navigate = useNavigate();

  const { removeToken } = useAuth();

  function logout() {
    removeToken();
    navigate("/");
  }

  return (
    <img
      src={logoutIcon}
      alt="logout"
      onClick={logout}
      style={{ cursor: "pointer", marginLeft: "20px" }}
    />
  );
}
