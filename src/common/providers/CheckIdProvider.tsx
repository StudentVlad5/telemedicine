import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CheckIdProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const key = localStorage.getItem("key");
    const user_id = localStorage.getItem("user_id");

    if (!key || !user_id) navigate("/");

    if (key && user_id && location.pathname === "/") {
      navigate(`/calls`);
    }
  }, [navigate, location.pathname]);

  return children;
};
