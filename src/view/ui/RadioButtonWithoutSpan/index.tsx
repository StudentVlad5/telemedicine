import s from "./index.module.scss";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export const RadioButtonTrue = ({
  id,
  currentValue,
  name,
  value,
  onChange,
}: {
  id: string;
  currentValue: string;
  name: string;
  value: string;
  onChange: (str: string) => void;
}) => {
  return (
    <div className={s.RadioButton}>
      <label className={s.box} htmlFor={id}>
        <input
          id={id}
          name={name}
          type="radio"
          onChange={(e) => {
            if (e.target.checked) onChange(value);
          }}
          checked={currentValue === value}
        />
        <div
          className={s.controlIndicator}
          style={{
            border:
              currentValue === value ? "8px solid black" : "1px solid black",
          }}
        >
          <FaCheck
            style={{
              width: "45px",
              height: "45px",
              opacity: currentValue === value ? "1" : "0.2",
              fill: "green",
            }}
          />
        </div>
        <span>{""}</span>
      </label>
    </div>
  );
};

export const RadioButtonUnknow = ({
  id,
  currentValue,
  name,
  value,
  onChange,
}: {
  id: string;
  currentValue: string;
  name: string;
  value: string;
  onChange: (str: string) => void;
}) => {
  return (
    <div className={s.RadioButton}>
      <label className={s.box} htmlFor={id}>
        <input
          id={id}
          name={name}
          type="radio"
          onChange={(e) => {
            if (e.target.checked) onChange(value);
          }}
          checked={currentValue === value}
        />
        <div
          className={s.controlIndicator}
          style={{
            border:
              currentValue === value ? "8px solid black" : "1px solid black",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "45px",
              height: "45px",
              opacity: currentValue === value ? "1" : "0.5",
              color: "black",
              alignItems: "center",
            }}
          >
            ???
          </div>
        </div>
        <span>{""}</span>
      </label>
    </div>
  );
};
export const RadioButtonFalse = ({
  id,
  currentValue,
  name,
  value,
  onChange,
}: {
  id: string;
  currentValue: string;
  name: string;
  value: string;
  onChange: (str: string) => void;
}) => {
  return (
    <div className={s.RadioButton}>
      <label className={s.box} htmlFor={id}>
        <input
          id={id}
          name={name}
          type="radio"
          onChange={(e) => {
            if (e.target.checked) onChange(value);
          }}
          checked={currentValue === value}
        />
        <div
          className={s.controlIndicator}
          style={{
            border:
              currentValue === value ? "8px solid black" : "1px solid black",
          }}
        >
          <MdClose
            style={{
              width: "45px",
              height: "45px",
              opacity: currentValue === value ? "1" : "0.5",
              fill: "#be0b00",
            }}
          />
        </div>
        <span>{""}</span>
      </label>
    </div>
  );
};
