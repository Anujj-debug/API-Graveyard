import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}