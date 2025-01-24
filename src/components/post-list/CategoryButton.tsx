import { Button } from "../common/Button";

interface Props {
    isCurrent: boolean;
    displayName: string;
    onChange: (v: string) => void;
}

export const CategoryButton = ({ isCurrent, displayName, onChange }: Props) => {
    const handleChange = (v: string) => {
        onChange(v);
    };

    return (
        <li className="cursor-pointer">
            <Button asChild size="sm" variant={isCurrent ? "destructive" : "outline"} onClick={() => handleChange(displayName)}>
                <div>{displayName}</div>
            </Button>
        </li>
    );
};
