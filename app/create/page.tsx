"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import {
    Button,
    buttonVariants
} from "@/components/ui/button"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"

import { Check, ChevronsUpDown, X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"

import {
    Command,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Option = {
    value: string
    label: string
}

export default function Page() {
    const router = useRouter()
    const [session, setSession] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<Option[]>([
        { value: "rule1", label: "Rule 1" },
        { value: "rule2", label: "Rule 2" },
    ])

    const [selected, setSelected] = useState<Option[]>([])
    const [input, setInput] = useState("")

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

    function toggle(option: Option) {
        if (selected.find((s) => s.value === option.value)) {
            setSelected(selected.filter((s) => s.value !== option.value))
        } else {
            setSelected([...selected, option])
        }
    }

    function createOption() {
        const newOption = {
            value: input.toLowerCase().replace(/\s+/g, "-"),
            label: input,
        }

        setOptions([...options, newOption])
        setSelected([...selected, newOption])
        setInput("")
    }

    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-6">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Créer un défi</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid w-full gap-6">


                        <InputGroup>
                            <InputGroupAddon>
                                <InputGroupText>Titre du défi:</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput placeholder="Titre" />
                        </InputGroup>


                        <InputGroup>
                            <InputGroupAddon>
                                <InputGroupText>Points</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput placeholder="Type de points" />
                        </InputGroup>


                        <InputGroup>
                            <InputGroupTextarea placeholder="Description du défi" />
                            <InputGroupAddon align="block-end"></InputGroupAddon>
                        </InputGroup>


                        <div className="flex flex-wrap gap-2">
                            {selected.map((item) => (
                                <Badge key={item.value} variant="secondary">
                                    {item.label}
                                    <X
                                        className="ml-1 h-3 w-3 cursor-pointer"
                                        onClick={() =>
                                            setSelected(selected.filter((s) => s.value !== item.value))
                                        }
                                    />
                                </Badge>
                            ))}
                        </div>


                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger className={cn("w-full justify-between", buttonVariants({
                                variant: "outline",
                            }))}>


                                Sélectionner ou créer des règles
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />


                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command className="bg-popover text-popover-foreground">
                                    <CommandInput
                                        placeholder="Chercher ou créer..."
                                        value={input}
                                        onValueChange={setInput}
                                    />
                                    <CommandList>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    onSelect={() => toggle(option)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selected.find((s) => s.value === option.value)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {option.label}
                                                </CommandItem>
                                            ))}

                                            {input && !options.some(o => o.label === input) && (
                                                <CommandItem onSelect={createOption}>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Créer "{input}"
                                                </CommandItem>
                                            )}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Button>Créer le défi</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}