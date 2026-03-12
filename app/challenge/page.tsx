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


}