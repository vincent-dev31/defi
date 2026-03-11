import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Bienvenue ! 👋</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre compte et commencer à faire des défis.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Link href="/login">
            <Button size="lg">Se connecter</Button>
          </Link>
          <Link href="/signup">
            <Button size="lg">S'inscrire</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}