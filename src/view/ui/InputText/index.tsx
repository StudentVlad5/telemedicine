import s from './index.module.scss';
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export const InputText = ({
    title,
    subtitle,
    className,
    onChange,
    value,
    ...otherProps
}: {
    className?: string
    title?: string
    subtitle?: string
    onChange?: (e: any) => void
    value?: string
} & HTMLInputProps) => {
    return (
        <div className={classNames(s.inputText, className && className)}>
            <div className={s.inner}>
                { title && <span className={s.title}>{ title }</span> }
                { subtitle && <span className={s.subtitle}>{ subtitle }</span> }
            </div>
            <input className={s.input} { ...otherProps } type="text" onChange={onChange} value={value ?? undefined}/>
        </div>
    );
};
