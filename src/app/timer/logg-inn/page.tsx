import { Suspense } from "react";
import LoginForm from "@/Timer/LoginForm";

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
