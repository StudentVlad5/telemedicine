import { Button } from "../../ui/Button";
import s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { CreateCall } from "./CreateCall/createCall";
import { CallsList } from "./CallsList/CallsList";
import { useAppContext } from "../../../common/helpers/AppContext";

export const RequestPage = () => {
  const { user_id, listOfUsers } = useAppContext();

  const user = listOfUsers.find((u) => u.user_id === user_id);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className={s.Request}>
      <ul className={s.infoWrap}>
        <li>{user?.fio ? user.fio : ""}</li>
        {/* <li>{user?.user_id ? user.user_id : user_id}</li> */}
        <li>{user?.job_title ? user.job_title : ""}</li>
        <li>{user?.med_org ? user.med_org : ""}</li>
        <li>
          <Button classname={s.logoutBt} onClick={logout}>
            Выйти
          </Button>
        </li>
      </ul>
      <div className={s.container}>
        <CreateCall />
        <CallsList />
      </div>
    </div>
  );
};
