import { ButtonHTMLAttributes, FC } from "react";
import style from './Button.module.css'
import { classNames } from "shared/lib/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(style.Button, {}, [style[className]])}
            {...otherProps}
        >
            {children}
        </button>
    )
}