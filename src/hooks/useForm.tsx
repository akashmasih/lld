import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react"


export type UseFormPrams<I> = {
    defaultValues: I
}

export type RegisterOPtionField<T = string> = {
    value: T,
    message: string
}


export type RegisterOPtions = {
    required?: boolean | string
    pattern?: string | RegisterOPtionField
    min?: number | RegisterOPtionField<number>
    max?: number | RegisterOPtionField<number>
    maxLength?: number | RegisterOPtionField<number>
    minLength?: number | RegisterOPtionField<number>
}

export type Error = {
    type: string
    message: string
}

const ErrorTypes = {
    required: "required",
    pattern: "pattern",
    min: "min",
    max: "max",
    maxLength: "maxLength",
    minLength: "minLength",
} as const
type ErrorTypes = typeof ErrorTypes[keyof typeof ErrorTypes]


const resolveError = (type: ErrorTypes, message: string): Error => {
    return {
        type,
        message
    }
}



const useForm = <I extends Record<string, unknown>>(prams: UseFormPrams<I>) => {
    const { defaultValues } = prams
    const [formValue, setFormValue] = useState<I>(defaultValues)
    const [errors, setErrors] = useState<Record<string, Partial<Error>>>({})
    const registerOPtionsRef = useRef<Record<string, Partial<RegisterOPtions>>>({})

    const resolveValidation = (callBack?: (parm: I) => void | null, values?: I) => {
        const newErrors = validate(values)
        if (Object.values(newErrors).length > 0) {
            setErrors(newErrors)
        }
        else {
            setErrors({})
            callBack && callBack(formValue)

        }
    }

    const validate = (values: Record<string, unknown> = formValue) => {
        const newErrors: Record<string, Partial<Error>> = {}


        for (let [name, options] of Object.entries(registerOPtionsRef.current)) {
            const value = values[name] as string
            const valueLength = value.length
            const msg = typeof options.required === "string" ? options.required : `${name} is required`
            if (options.required && !value) {
                newErrors[name] = resolveError(
                    "required",
                    msg
                )
            }
            if (options.max) {
                const maxVal = typeof options.max === "number" ? options.max : options.max.value
                const maxMsg = typeof options.max === "object" ? options.max.message : `${name} exceeds max length`
                if (valueLength > maxVal) {
                    newErrors[name] = resolveError("max", maxMsg)
                }
            }
        }

        return newErrors
    }

    const handleSubmit = (callBack: (parm: I) => void) => {
        return (event: SubmitEvent<HTMLFormElement>) => {
            event.preventDefault()
            resolveValidation(callBack)
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target

        const newValues = {
            ...formValue,
            [name]: value
        }
        resolveValidation(undefined, newValues)
        setFormValue(newValues)
    }

    const register = (name: string, options?: RegisterOPtions) => {
        if (options) {
            registerOPtionsRef.current[name] = options
        }
        return {
            name,
            onChange,
            value: (formValue as Record<string, unknown>)[name]
        }
    }

    return {
        register,
        handleSubmit,
        errors
    }
}
export default useForm