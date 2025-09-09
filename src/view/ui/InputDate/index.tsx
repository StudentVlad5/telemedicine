import s from "./index.module.scss";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

export const InputDate = ({
  className,
  onChangeDate,
  valueDate,
  max,
  ...otherProps
}: {
  className?: string;
  onChangeDate?: (e: any) => void;
  valueDate?: string;
  max?: string;
} & HTMLInputProps) => {
  return (
    <div className={classNames(s.InputDate, className && className)}>
      <input
        className={s.inputDate}
        {...otherProps}
        type="date"
        onChange={onChangeDate}
        value={valueDate ?? undefined}
        max={max}
      />
    </div>
  );
};
