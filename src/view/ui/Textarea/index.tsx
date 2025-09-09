import s from './index.module.scss';
import classNames from "classnames";
import {FormEvent, InputHTMLAttributes, useRef} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export const Textarea = ({
    title,
    subtitle,
    className,
    value,
    ...otherProps
}: {
    className?: string
    title?: string
    subtitle?: string
    onChange?: (e: any) => void,
    value: string
} & HTMLInputProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const onChange = (e: any) => {
        if (ref.current) {
            if (!e.target.value) {
                ref.current.style.height = 80 + "px"
            }
            ref.current.style.height = ref.current.scrollHeight + "px"
        }
        onChange(e)
    }

    return (
        <div className={classNames(s.inputText, className && className)}>
            <div className={s.inner}>
                { title && <span className={s.title}>{ title }</span> }
                { subtitle && <span className={s.subtitle}>{ subtitle }</span> }
            </div>
            <textarea ref={ref} className={s.textarea} onChange={onChange} { ...otherProps } value={value}/>
        </div>
    );
};
