import { Divider } from "@mui/material"
import { ReactNode } from "react"

interface DividerProps {
    thickness?: number,
    children?: ReactNode
}
export const LineDivider = ({ thickness=1, children }: DividerProps) => {
    return (
        <Divider sx={{ my: 2, borderWidth: thickness+'px', borderColor:'black' }}>
            {children}
        </Divider>
    )
}