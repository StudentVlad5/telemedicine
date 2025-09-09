import { listOfPoints } from "../../../common/config";
import { RadioButton } from "../../ui/RadioButton";

import s from "./index.module.scss";

const ListOfPoints = ({
  setContainerColor,
  pointOfCase,
  setPointOfCase,
  setPointOfRouter,
}: {
  pointOfCase: string;
  setPointOfCase: (pointOfCase: string) => void;
  setContainerColor: (color: string) => void;
  setPointOfRouter: (pointOfRouter: string) => void;
}) => {
  return (
    <ul className={s.wrapListOfPoints}>
      {listOfPoints.map((it) => {
        return (
          <li key={it.id} className={"color" + it.color.slice(1)}>
            <RadioButton
              styledClassName={s.styledRB}
              id={it.id}
              value={it.case}
              onChange={(str) => {
                setPointOfCase(str);
                setContainerColor(it.color);
                setPointOfRouter(it.id);
              }}
              name={"pointOfCase"}
              currentValue={pointOfCase}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ListOfPoints;
