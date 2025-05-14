"use client"

import { useEffect } from "react"
import { useUIStore } from "@/lib/store"

export function SetBreadcrumbs({ crumbs }: { crumbs: { label: string; href: string }[] }) {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs)

    useEffect(() => {
        setBreadcrumbs(crumbs)
    }, [setBreadcrumbs, crumbs])
    return null
}
