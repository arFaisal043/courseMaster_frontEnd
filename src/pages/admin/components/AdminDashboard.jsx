import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminRoute from "../../../routes/AdminRoute";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
    const me = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    return (
        <AdminRoute me={me} loading={loading}>
            {/* full width override */}
            <div className="w-full max-w-none flex flex-col lg:flex-row min-h-[80vh]">

                {/* sidebar - hidden on mobile, shown via drawer */}
                <div className="hidden lg:block shrink-0">
                    <AdminSidebar />
                </div>

                {/* Mobile drawer toggle button */}
                <div className="lg:hidden">
                    <AdminSidebar />
                </div>

                {/* content area */}
                <main className="flex-1 p-2 sm:p-4 lg:p-5 bg-base-100 w-full">
                    <Outlet />
                </main>

            </div>
        </AdminRoute>
    );
}
