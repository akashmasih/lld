export interface BaseFormElementTypes {
    error?: string,
    id?: string,
    label?: string
}

export interface InputPropTypes extends BaseFormElementTypes {
    type?: string,

}

export interface SelectPropTypes extends BaseFormElementTypes {
    options: Record<string, unknown>[] | string[],
    optionName?: (p: Record<string, string>) => string | undefined,
    optionValue?: (p: Record<string, string>) => string | undefined,
    label?: string
    placeholder?: string

}