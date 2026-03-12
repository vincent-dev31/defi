"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Page() {
    const router = useRouter()
    const [session, setSession] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                alert("Vous devez être connecté pour accéder à cette page")
                router.replace("/")
                return
            }

            setSession(session)
            setLoading(false)
        }

        checkSession()
    }, [router])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            alert("Erreur lors de la déconnexion")
        } else {
            alert("Déconnecté")
            router.replace("/")
        }
    }

    if (loading) return null

    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
            <div className="flex flex-col items-center justify-center gap-6">
                <h1>Bienvenue {session?.user?.user_metadata?.display_name || "Utilisateur"} !</h1>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </main>
    )
}