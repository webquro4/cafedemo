import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.admin);

  // For demo purposes, we'll simulate authentication as true
  // In a real app, this would check actual auth state
  const mockAuthenticated = true;

  if (!mockAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;