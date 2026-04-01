import { forwardRef } from "react"
import type { InputPropTypes } from "./Types"
import { cn } from "../utils/tailwindMerge"



const Input = forwardRef<HTMLInputElement, InputPropTypes>(({ type = "text", error, id, label, className = '', ...rest }, ref) => {
    return (
        <div >
            {label && <label className="text-sm text-label" htmlFor={id || label}>{label}</label>}
            <input ref={ref}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border flex h-11 w-full  rounded-xl border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className,
                )
                } type={type} id={id || label} {...rest} />
            {error && <div className="text-xs text-destructive mt-2" >{error}</div>}
        </div>
    )
})

export default Input