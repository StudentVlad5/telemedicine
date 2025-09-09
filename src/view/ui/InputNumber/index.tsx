import s from './index.module.scss';
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export const InputNumber = ({
    title,
    subtitle,
    className,
    onChange,
    value,
    invalidMessage,
    ...otherProps
}: {
    className?: string
    title?: string
    subtitle?: string
    onChange?: (e: any) => void
    value?: string,
    invalidMessage?: string
} & HTMLInputProps) => {

    function validate(evt:any) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    return (
        <div className={classNames(s.InputNumber, className && className)}>
            <div className={s.inner}>
                { title && <span className={s.title}>{ title } <span className={s.invalidMessage}>{ invalidMessage }</span> </span> }
                { subtitle && <span className={s.subtitle}>{ subtitle }</span> }
            </div>
            <input className={s.input} { ...otherProps } type="text" onChange={onChange} value={value ?? undefined} onKeyPress={validate}/>
        </div>
    );
};
