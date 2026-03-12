"use client"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()


        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,

        })
        if (error) {
            alert(error.message)
            return
        }
        router.push("/main")
    }
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">

            <div className="flex flex-col gap-6 w-full max-w-sm">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Connexion</CardTitle>
                        <CardDescription>Entrez vos informations pour vous connecter</CardDescription>
                    </CardHeader>
                    <CardContent>                  <form onSubmit={handleLogin}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button
                                    type="submit">Se connecter</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
