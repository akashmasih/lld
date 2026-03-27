import { forwardRef } from "react"
import styles from './Input.module.css'
import type { SelectPropTypes } from "./Types"



const Select = forwardRef<HTMLSelectElement, SelectPropTypes>(({ error, optionName, optionValue, options, placeholder, id, label, ...rest }, ref) => {
    return (
        <div >
            {label && <label className={styles.label} htmlFor={id || label}>{label}</label>}
            <select ref={ref} className={styles.input} id={id || label} {...rest} >
                <option value="">--{placeholder}--</option>
                {options &&
                    options.map(option => {
                        const isObject = option && typeof option === 'object'
                        const obj = isObject ? option as Record<string, string> : null
                        const val = obj ? optionValue?.(obj) ?? '' : option as string
                        const optLabel = obj ? optionName?.(obj) ?? '' : option as string
                        return (
                            <option key={val} value={val}>{optLabel}</option>
                        )
                    }
                    )
                }
            </select>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
})

export default Select