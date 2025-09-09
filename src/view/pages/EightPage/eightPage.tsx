import s from "./index.module.scss";
import { useEffect } from "react";
import { EightSectionAlergoCod } from "../../components/AlergoCod/EightSection/eightSection";

export const EightPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.EightPage}>
      {pointId === "alergoCod" && <EightSectionAlergoCod />}
    </div>
  );
};
