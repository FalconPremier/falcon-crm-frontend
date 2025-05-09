import { LoginForm } from "@/components/login-form"

export default function Login(){
    return(
        <div className="bg-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-10">

                <LoginForm />
            </div>
        </div>
    )
}