import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthRedirect() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const ensureAuth = () => {
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return false;
    }
    return true;
  };

  return { user, ensureAuth };
}
