export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white px-6 py-4 shadow">
                Admin Panel
            </nav>
            <main className="p-6">{children}</main>
        </div>
    );
}
