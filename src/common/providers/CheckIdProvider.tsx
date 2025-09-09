import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CheckIdProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const application_number = localStorage.getItem("application_number");
    const id = localStorage.getItem("id");
    const pointOfRouter = localStorage.getItem("pointOfRouter");

    if (!application_number || !id || !pointOfRouter) navigate("/");

    if (
      application_number &&
      id &&
      pointOfRouter &&
      location.pathname === "/"
    ) {
      navigate(`/${pointOfRouter}/1`);
    }
  }, [navigate, location.pathname]);

  return children;
};
