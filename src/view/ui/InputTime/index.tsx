import s from "./index.module.scss";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

export const InputTime = ({
  className,
  onChangeTime,
  valueTime,
  maxTime,
  minTime,
  ...otherProps
}: {
  className?: string;
  onChangeTime?: (e: any) => void;
  valueTime?: string;
  maxTime?: string;
  minTime?: string;
} & HTMLInputProps) => {
  return (
    <div className={classNames(s.InputTime, className && className)}>
      <input
        className={s.inputTime}
        {...otherProps}
        type="time"
        onChange={onChangeTime}
        value={valueTime ?? undefined}
        max={maxTime}
        min={minTime}
        required
      />
    </div>
  );
};
