"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import { useRouter } from "next/navigation"


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }
    const user = data.user
    if (user) {
      await supabase.from("users").insert({
        id: user.id,
        username: pseudo,
      })
    }

    router.push("/login")
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Inscription</CardTitle>
          <CardDescription>
            Entrez vos informations pour vous inscrire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Pseudo</FieldLabel>
                <Input
                  id="pseudo"
                  type="text"
                  placeholder="Pseudo"
                  required
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirmation
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} />
                  </Field>
                </Field>
                <FieldDescription>
                  Doit contenir au moins 8 caractères.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">S'inscrire</Button>
                <FieldDescription className="text-center">
                  Déjà inscrit ? <a href="/login">Se connecter</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        En vous inscrivant, vous acceptez nos <a href="#">Conditions d'utilisation</a>{" "}
        et <a href="#">Politique de confidentialité</a>.
      </FieldDescription>
    </div>
  )
}
