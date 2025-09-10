import s from "./index.module.scss";
import Logo from "../../../assets/images/logo.svg";
import LogoHospital from "../../../assets/images/logo_hospital.jpg";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

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
    </header>
  );
};
