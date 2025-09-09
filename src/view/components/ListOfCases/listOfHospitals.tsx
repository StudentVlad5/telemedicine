import { listOfHospitals } from "../../../common/config";
import { RadioButton } from "../../ui/RadioButton";

import s from "./index.module.scss";
import classNames from "classnames";

const ListOfHospitals = ({
  pointOfHospital,
  setPointOfHospital,
}: {
  pointOfHospital: string;
  setPointOfHospital: (pointOfHospital: string) => void;
}) => {
  return (
    <ul className={classNames(s.wrapListOfPoints, s.wrapListOfHospitals)}>
      {listOfHospitals.map((it) => {
        return (
          <li key={it.id} className={"color" + it.color.slice(1)}>
            <RadioButton
              styledClassName={s.styledRB}
              id={it.id}
              value={it.case}
              onChange={(str) => {
                setPointOfHospital(str);
              }}
              name={"pointOfHospital"}
              currentValue={pointOfHospital}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ListOfHospitals;
