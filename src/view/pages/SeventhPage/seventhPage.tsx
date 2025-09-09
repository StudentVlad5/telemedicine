import s from "./index.module.scss";
import { useEffect } from "react";
import { SeventhSectionAlergoCod } from "../../components/AlergoCod/SeventhSection/seventSection";

export const SeventhPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.SeventhPage}>
      {pointId === "alergoCod" && <SeventhSectionAlergoCod />}
    </div>
  );
};
