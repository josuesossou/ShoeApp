import { Action } from "../helpers/types";
import DynamicTab from "./DynamicTab";

type PropsType = {
    navLinks: Action[]
}

export default function SideNav({ navLinks }: PropsType) {
    return (
        <>
            <DynamicTab tabs={navLinks} orientation="vertical" />
        </>
    )
}