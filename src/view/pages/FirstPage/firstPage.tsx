import s from "./index.module.scss";
import { FirstSection } from "../../components/FirstSection/firstSection";
import { useEffect } from "react";

export const FirstPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.FirstPage}>
      <FirstSection />
    </div>
  );
};
