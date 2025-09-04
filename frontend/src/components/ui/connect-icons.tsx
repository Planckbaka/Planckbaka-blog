"use client"

import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation";
import {FaGithub} from "react-icons/fa6";
import {FaLinkedin} from "react-icons/fa6";
import {SiGmail} from "react-icons/si";

export function ConnectIcons() {
    const router = useRouter();
    return (
        <div className="flex justify-start gap-2 pt-3 md:pt-6 mb-20">
            <Button variant="ghost" size="icon" className="size-16 rounded-2xl border-1 border-slate-500" onClick={ () => router.push("https://github.com/Planckbaka")}>
                <FaGithub className="size-8" />
            </Button>
            <Button variant="ghost" size="icon" className="size-16 rounded-2xl border-1 border-slate-500" onClick={ () => router.push("/")}>
                <FaLinkedin className="size-8" />
            </Button>
            <Button variant="ghost" size="icon" className="size-16 rounded-2xl border-1 border-slate-500" onClick={ () => router.push("/login")}>
                <SiGmail className="size-8" />
            </Button>
        </div>

    )
}
export default ConnectIcons;
