import ProtectedRoute from "../(components)/protectedRoute";

export default function AdminLayout({
    children
}: { children: React.ReactNode }) {

    return (
        <div className="admin-wrapper">
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </div>
    )
}

