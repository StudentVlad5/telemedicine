import s from "./index.module.scss";
import { useEffect } from "react";
import { NinthSectionAlergoCod } from "../../components/AlergoCod/NinthSection/ninthSection";

export const NinthPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.NinthPage}>
      {pointId === "alergoCod" && <NinthSectionAlergoCod />}
    </div>
  );
};
