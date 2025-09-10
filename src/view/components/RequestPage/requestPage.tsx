import { useState } from "react";
import { Button } from "../../ui/Button";
import s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { CreateCall } from "./CreateCall/createCall";
import { CallsList } from "./CallsList/CallsList";

export const RequestPage = () => {
  const [user_id, setUser_id] = useState(localStorage.getItem("user_id") ?? "");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className={s.Request}>
      <div>
        <p>{user_id}</p>
        <p>Актюбинский областной телемедицинский центр</p>
        <Button classname={s.logoutBt} onClick={logout}>
          Выйти
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <CreateCall />
        <CallsList />
      </div>
    </div>
  );
};
