import Link from "next/link";
import { Button } from "../common/Button";

interface Props {
    isCurrent: boolean;
    displayName: string;
    href: string;
    count: number;
}

export const CategoryButton = ({ isCurrent, displayName, href, count }: Props) => {
    return (
        <li className="cursor-pointer">
            <Button asChild size="sm" variant={isCurrent ? "outline" : "default"}>
                <Link href={href}>
                    {displayName} ({count})
                </Link>
            </Button>
        </li>
    );
};
