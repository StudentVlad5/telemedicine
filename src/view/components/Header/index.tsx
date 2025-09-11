import s from "./index.module.scss";
import Logo from "../../../assets/images/logo.svg";
import LogoHospital from "../../../assets/images/logo_hospital.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../common/helpers/AppContext";
import { Button } from "../../ui/Button";

export const Header = () => {
  const location = useLocation();
  const { user_id, listOfUsers, setId, setUserId, setKey } = useAppContext();

  const user = listOfUsers.find((u) => u.user_id === user_id);
  const navigate = useNavigate();
  const logout = () => {
    setId("");
    setUserId("");
    setKey("");
    localStorage.clear();
    navigate("/");
  };

  const onClickLogoHandler = () => {
    if (location.pathname === "/") return;
  };

  return (
    <header className={s.Header}>
      <div className={s.logoContainer}>
        <div className={s.logoBox} onClick={onClickLogoHandler}>
          <img src={Logo} alt="Логотип" />
        </div>
        <div className={s.logoBox} onClick={onClickLogoHandler}>
          <img src={LogoHospital} alt="Логотип" />
        </div>
      </div>
      <div className={s.textBox} onClick={onClickLogoHandler}>
        <p>Актюбинский областной телемедицинский центр</p>
      </div>
      {user && (
        <ul className={s.infoWrap}>
          <li>{user?.fio ? user.fio : ""}</li>
          <li>{user?.job_title ? user.job_title : ""}</li>
          <li>{user?.med_org ? user.med_org : ""}</li>
          <li>
            <Button classname={s.logoutBt} onClick={logout}>
              Выйти
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
};
