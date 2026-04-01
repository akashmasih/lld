
import Input from '../shared/ui/Input.tsx'
import useForm from '../shared/hooks/useForm.tsx'
import Select from '../shared/ui/Select.tsx'


type userData = {
    name: string
    email: string
    password: string
    gender: string
}

function UserForm() {
    const { register, handleSubmit, errors } = useForm<userData>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            gender: ""
        }
    })

    const onSubmit = (data: userData) => {
        console.log(data)
    }

    const genderOption = [
        { id: 'male', name: "Male" },
        { id: 'female', name: "Female" },

    ]
    console.log(errors)
    return (
        <div className="app">
            <h1>Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input error={errors?.name?.message} {...register("name", { required: 'Name is required' })} label="Name" />
                <Input error={errors?.email?.message} {...register("email", { required: true })} label="Email" />
                <Input error={errors?.password?.message} type="password" {...register("password", { required: true, max: 10 })} label="Password" />
                <Select error={errors?.gender?.message} label="Gender" {...register("gender", { required: true })}
                    options={genderOption}
                    optionName={item => item.name}
                    optionValue={item => item.id}
                    placeholder='Select gender'
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UserForm
