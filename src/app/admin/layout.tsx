import ProtectedRoute from "../(components)/protectedRoute";

export default function AdminLayout({
    children
}: { children: React.ReactNode }) {

    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}

