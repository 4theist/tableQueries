import { FC } from "react"
import style from './Loader.module.css'
export const Loader = () => {
    return (
        <div className={style.root}>
            <div className={style.ldsSpinner}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}