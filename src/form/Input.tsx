import { forwardRef } from "react"
import styles from './Input.module.css'
import type { InputPropTypes } from "./Types"



const Input = forwardRef<HTMLInputElement, InputPropTypes>(({ type = "text", error, id, label, ...rest }, ref) => {
    return (
        <div >
            {label && <label className={styles.label} htmlFor={id || label}>{label}</label>}
            <input ref={ref} className={styles.input} type={type} id={id || label} {...rest} />
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
})

export default Input