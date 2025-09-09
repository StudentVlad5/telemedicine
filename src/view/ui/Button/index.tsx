import s from './index.module.scss';
import {ReactNode} from "react";
import classNames from "classnames";

export const Button = ({
    children,
    classname,
    disabled,
    onClick
}: {
    children: ReactNode
    classname?: string
    disabled?: boolean
    onClick?: () => void
}) => {
    const onClickBtnHandler = (e: any) => {
        e.preventDefault();
        if (onClick) {
            onClick()
        } else {
            return
        }
    }

    return (
        <button className={classNames(s.button, classname && classname)} type={"button"} disabled={disabled ?? false} onClick={onClickBtnHandler}>{ children }</button>
    );
};
