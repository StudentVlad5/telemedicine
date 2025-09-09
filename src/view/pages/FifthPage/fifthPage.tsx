import s from "./index.module.scss";
import { FifthSectionStroke } from "../../components/Stroke/FifthSection/fifthSection";
import { useEffect } from "react";
import { FifthSectionPregnance } from "../../components/Pregnance/FifthSection/fifthSection";
import { FifthSectionAlergoCod } from "../../components/AlergoCod/FifthSection/fifthSection";
import { FifthSectionCodeCardio } from "../../components/CodeCardio/FifthSection/fifthSection";

export const FifthPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.FifthPage}>
      {pointId === "stroke" && <FifthSectionStroke />}
      {pointId === "pregnancy" && <FifthSectionPregnance />}
      {pointId === "alergoCod" && <FifthSectionAlergoCod />}
      {pointId === "codeCardio" && <FifthSectionCodeCardio />}
    </div>
  );
};
