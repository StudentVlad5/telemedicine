import { useEffect } from "react";
import s from "./index.module.scss";
import { FourthSectionStroke } from "../../components/Stroke/FourthSection/fourthSection";
import { FourthSectionPregnance } from "../../components/Pregnance/FourthSection/fourthSection";
import { FourthSectionAlergoCod } from "../../components/AlergoCod/FourthSection/fourthSection";
import { FourthSectionKnifeWounds } from "../../components/KnifeWounds/FourthSection/fourthSection";
import { FourthSectionPolyOfTrauma } from "../../components/PolyOfTrauma/FourthSection/fourthSection";
import { FourthSectionBurns } from "../../components/Burns/FourthSection/fourthSection";
import { FourthSectionGastroIntestinalBleeding } from "../../components/GastroIntestinalBleeding/FourthSection/fourthSection";
import { FourthSectionCodeCardio } from "../../components/CodeCardio/FourthSection/fourthSection";

export const FourthPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.FourthPage}>
      {pointId === "stroke" && <FourthSectionStroke />}
      {pointId === "pregnancy" && <FourthSectionPregnance />}
      {pointId === "alergoCod" && <FourthSectionAlergoCod />}
      {pointId === "knifeWounds" && <FourthSectionKnifeWounds />}
      {pointId === "polyOfTrauma" && <FourthSectionPolyOfTrauma />}
      {pointId === "burns" && <FourthSectionBurns />}
      {pointId === "codeCardio" && <FourthSectionCodeCardio />}
      {pointId === "gastrointestinalBleeding" && (
        <FourthSectionGastroIntestinalBleeding />
      )}
    </div>
  );
};
