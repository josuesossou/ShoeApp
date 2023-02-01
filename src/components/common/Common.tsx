import { Divider } from "@mui/material"
import { ReactNode } from "react"

interface DividerProps {
    thickness?: number,
    orientation?: 'vertical' | 'horizontal',
    children?: ReactNode
}
export const LineDivider = ({ thickness=1, orientation, children }: DividerProps) => {
    return (
        <Divider sx={{ my: 2, borderWidth: thickness+'px', borderColor:'black' }} orientation={orientation}>
            {children}
        </Divider>
    )
}