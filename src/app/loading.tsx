export function Spinner() {
    return <div className="w-8 h-8 border-4 border-t-transparent border-black border-solid rounded-full animate-spin" role="status" />;
}

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-transparent border-black border-solid rounded-full animate-spin" />
        </div>
    );
}
