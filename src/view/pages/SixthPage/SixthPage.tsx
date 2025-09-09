import s from "./index.module.scss";
import { useEffect } from "react";
import { SixthSectionPregnance } from "../../components/Pregnance/SixthSection/sixthSection";
import { SixthSectionStroke } from "../../components/Stroke/SixthSection/sixthSection";
import { SixthSectionAlergoCod } from "../../components/AlergoCod/SixthSection/sixthSection";
import { SixthSectionCodeCardio } from "../../components/CodeCardio/SixthSection/sixthSection";

export const SixthPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.SixthPage}>
      {pointId === "stroke" && <SixthSectionStroke />}
      {pointId === "pregnancy" && <SixthSectionPregnance />}
      {pointId === "alergoCod" && <SixthSectionAlergoCod />}
      {pointId === "codeCardio" && <SixthSectionCodeCardio />}
    </div>
  );
};
