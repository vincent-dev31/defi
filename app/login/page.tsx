"use client"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const { data: userData, error: lookupError } = await supabase
            .from("users")
            .select("id, username, email")
            .eq("username", username)
            .single()

        if (lookupError || !userData) {
            alert("Nom d'utilisateur ou mot de passe incorrect")
            return
        }
        const email = userData.email
        if (!email) {
            alert("Email non trouvé")
            return
        }
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
            <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Pseudo</FieldLabel>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Max Leiter"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            type="submit"
                            onClick={handleLogin}>Se connecter</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </main>
    )
}
