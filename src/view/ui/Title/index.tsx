import s from './index.module.scss';
import { ReactNode } from "react";

export const Title = ({
    children,
}: {
    children: ReactNode
}) => {
    return (
        <div className={s.Title}>
            <span>{children}</span>
        </div>
    );
};
