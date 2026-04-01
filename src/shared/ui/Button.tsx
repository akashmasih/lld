import { forwardRef } from "react";
import type { ButtonProps } from "./Types";
import { motion } from 'motion/react';
import { cn } from "../utils/tailwindMerge";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, children, disabled, className, ...rest }, ref) => {


    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ ease: "easeInOut", }}
            type="submit" ref={ref} disabled={disabled || isLoading} className={cn(
                'px-6 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all  py-3.5 text-white',
                (isLoading || disabled) ? 'bg-foreground-light cursor-default' : 'gradient-btn-primary shadow-md cursor-pointer ',
                className as string
            )} {...rest}>{
                isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    :
                    children
            }</motion.button>
    )
})

export default Button