import { useEffect } from "react";
import { SecondSectionStroke } from "../../components/Stroke/SecondSection/secondSection";
import { SecondSectionPregnance } from "../../components/Pregnance/SecondSection/secondSection";
import s from "./index.module.scss";
import { SecondSectionAlergoCod } from "../../components/AlergoCod/SecondSection/secondSection";
import { SecondSectionKnifeWounds } from "../../components/KnifeWounds/SecondSection/secondSection";
import { SecondSectionPolyOfTrauma } from "../../components/PolyOfTrauma/SecondSection/secondSection";
import { SecondSectionBurns } from "../../components/Burns/SecondSection/secondSection";
import { SecondSectionGastroIntestinalBleeding } from "../../components/GastroIntestinalBleeding/SecondSection/secondSection";
import { SecondSectionCodeCardio } from "../../components/CodeCardio/SecondSection/secondSection";

export const SecondPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.SecondPage}>
      {pointId === "stroke" && <SecondSectionStroke />}
      {pointId === "pregnancy" && <SecondSectionPregnance />}
      {pointId === "alergoCod" && <SecondSectionAlergoCod />}
      {pointId === "knifeWounds" && <SecondSectionKnifeWounds />}
      {pointId === "polyOfTrauma" && <SecondSectionPolyOfTrauma />}
      {pointId === "burns" && <SecondSectionBurns />}
      {pointId === "codeCardio" && <SecondSectionCodeCardio />}
      {pointId === "gastrointestinalBleeding" && (
        <SecondSectionGastroIntestinalBleeding />
      )}
    </div>
  );
};
