'use client'

import { GridLoader } from "react-spinners"

export default function LoadingComponent({ color }: { color: string }) {
    return (
        <div>
            <GridLoader color={color} size={30} />
        </div>
    )
}