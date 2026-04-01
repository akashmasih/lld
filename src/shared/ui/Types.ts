import type { HTMLMotionProps, MotionConfigProps } from "motion/react"
import { use, type ButtonHTMLAttributes, type InputHTMLAttributes } from "react"
import type React from "react"

export interface BaseFormElementTypes {
    error?: string,
    id?: string,
    label?: string,
    className?: string,
    icon?: React.ReactNode
}

export interface InputPropTypes extends BaseFormElementTypes, InputHTMLAttributes<HTMLInputElement> {
    type?: string,

}

export interface SelectPropTypes extends BaseFormElementTypes {
    options: Record<string, unknown>[] | string[],
    optionName?: (p: Record<string, string>) => string | undefined,
    optionValue?: (p: Record<string, string>) => string | undefined,
    label?: string
    placeholder?: string

}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, MotionConfigProps {
    children: React.ReactNode,
    className?: string
    isLoading?: boolean
    disabled?: boolean
}

