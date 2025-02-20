export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {children}
        </div>
    );
}
