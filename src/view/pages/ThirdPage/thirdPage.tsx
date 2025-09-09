import { useEffect } from "react";
import s from "./index.module.scss";
import { ThirdSectionStroke } from "../../components/Stroke/ThirdSection/thirdSection";
import { ThirdSectionPregnance } from "../../components/Pregnance/ThirdSection/thirdSection";
import { ThirdSectionAlergoCod } from "../../components/AlergoCod/ThirdSection/thirdSection";
import { ThirdSectionKnifeWounds } from "../../components/KnifeWounds/ThirdSection/thirdSection";
import { ThirdSectionPolyOfTrauma } from "../../components/PolyOfTrauma/ThirdSection/thirdSection";
import { ThirdSectionBurns } from "../../components/Burns/ThirdSection/thirdSection";
import { ThirdSectionGastroIntestinalBleeding } from "../../components/GastroIntestinalBleeding/ThirdSection/thirdSection";
import { ThirdSectionCodeCardio } from "../../components/CodeCardio/ThirdSection/thirdSection";

export const ThirdPage = ({ pointId }: { pointId: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={s.ThirdPage}>
      {pointId === "stroke" && <ThirdSectionStroke />}
      {pointId === "pregnancy" && <ThirdSectionPregnance />}
      {pointId === "alergoCod" && <ThirdSectionAlergoCod />}
      {pointId === "knifeWounds" && <ThirdSectionKnifeWounds />}
      {pointId === "polyOfTrauma" && <ThirdSectionPolyOfTrauma />}
      {pointId === "burns" && <ThirdSectionBurns />}
      {pointId === "codeCardio" && <ThirdSectionCodeCardio />}
      {pointId === "gastrointestinalBleeding" && (
        <ThirdSectionGastroIntestinalBleeding />
      )}
    </div>
  );
};
