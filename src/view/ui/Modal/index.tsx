import s from './index.module.scss';
import { useEffect } from "react";

export const Modal = ({ isVisible = false, title, content, footer, onClose, notClose }: any) => {
    const keydownHandler = ({ key } : any) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    useEffect(() => {
        if (!notClose) {
            document.addEventListener('keydown', keydownHandler);
            return () => document.removeEventListener('keydown', keydownHandler);
        }
    });

    return !isVisible ? null : (
        <div className={s.modal} onClick={onClose}>
            <div className={s.modalDialog} onClick={e => e.stopPropagation()}>
                <div className={s.modalHeader}>
                    <h3 className={s.modalTitle}>{title}</h3>
                    {
                        !notClose &&
                            <span className={s.modalClose} onClick={onClose}>
                                &times;
                            </span>
                    }
                </div>
                <div className={s.modalBody}>
                    <div className={s.modalContent}>{content}</div>
                </div>
                {footer && <div className={s.modalFooter}>{footer}</div>}
            </div>
        </div>
    );
};
