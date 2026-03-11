import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Pseudo</FieldLabel>
                        <Input id="username" type="text" placeholder="Max Leiter" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </Field>
                    <Field>
                        <Button type="submit">Se connecter</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </main>
    )
}
