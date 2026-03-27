import { useState } from "react"

export const useLocalStorage = <T,>(key: string, initValue: T) => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initValue
    })

    const storeValue = (data: T) => {
        localStorage.setItem(key, JSON.stringify(data))
        setValue(data)
    }

    return [value, storeValue] as const
}