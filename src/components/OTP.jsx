import { useEffect, useRef, useState } from "react"

export function OTP({ size = 6, onChange }) {
    const [otp, setOtp] = useState(new Array(size).fill(""))
    const inputRef = useRef([])


    useEffect(() => {
        onChange(otp.join(''))
    }, [otp])
    useEffect(() => {
        inputRef.current[0].focus()
    }, [])
    const onKeyDown = (e, index) => {

        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp]
                newOtp[index] = ""
                setOtp(newOtp)
                inputRef.current[index - 1].focus()

            }

        }
    }

    const onValueChange = (e, index) => {
        const { value } = e.target
        if (isNaN(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        if (value && index < size - 1) {
            inputRef.current[index + 1].focus()
        }
    }

    const onPaste = (e) => {
        e.preventDefault()
        const value = e.clipboardData.getData("text").trim()
        const pastedValue = value.replace(/[^0-9]/g, "").slice(0, size).split('')
        if (pastedValue.length < 0) return
        const newOtp = [...otp]
        pastedValue.forEach((char, index) => {
            newOtp[index] = char
        })
        setOtp(newOtp)
        const focusIndex = Math.min(pastedValue.length, size - 1)
        inputRef.current[focusIndex].focus()
    }

    return (
        <div className="otp-container">
            {
                otp.map((digit, index) => {
                    return (
                        <input
                            className="otp-input"
                            key={index}
                            onPaste={onPaste}
                            ref={el => inputRef.current[index] = el}
                            maxLength={1}
                            value={digit}
                            onKeyDown={e => onKeyDown(e, index)}
                            onChange={e => onValueChange(e, index)}
                            placeholder="_"
                        />
                    )
                })
            }
        </div>
    )
}