"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { useOutsideClick } from "@/hook/useOutsideClick";
import { cn } from "@/lib/utils";
import { Bolt } from "lucide-react";

export default function FloatingButton() {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => setVisible((prev) => !prev);
    const handleOutsideClick = () => setVisible(false);

    const buttonRef = useOutsideClick<HTMLButtonElement>(handleOutsideClick);

    return (
        <div className="group fixed bottom-4 right-4 xl:hidden">
            <div className="group relative flex flex-col-reverse">
                <Button size="icon" variant={visible ? "default" : "outline"} onClick={toggleVisible} ref={buttonRef} className={cn("absolute bottom-0 right-0 z-10 transition")}>
                    <Bolt size={22} />
                </Button>
            </div>
        </div>
    );
}
