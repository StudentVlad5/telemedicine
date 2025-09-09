import s from "./index.module.scss";
import { Title } from "../../../ui/Title";

import { MethodologyFAST } from "../../MethodologyFAST";

export const SecondSectionStroke = () => {
  return (
    <div className={s.SecondSection}>
      <Title>Раздел 2: Действия при подозрении на инсульт</Title>
      <MethodologyFAST />
    </div>
  );
};
