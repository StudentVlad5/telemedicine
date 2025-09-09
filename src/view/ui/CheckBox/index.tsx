import s from './index.module.scss';
import {InputHTMLAttributes, ReactNode} from "react";
import classNames from "classnames";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'id'>;

export const CheckBox = ({
    id,
    className,
    title,
    children,
    onChange,
    ...otherProps
} : {
    id: string,
    className?: string
    title?: string
    children?: ReactNode
    onChange?: (e: any) => void
} & HTMLInputProps) => {
    return (
        <div className={s.CheckBox}>
            <label htmlFor={id} className={classNames(s.control, s.controlCheckbox, className && className)}>
                <input id={id} type="checkbox" { ...otherProps } onChange={onChange}/>
                <div className={s.controlIndicator}></div>
                <span>{ children }</span>
            </label>
        </div>
    );
};
