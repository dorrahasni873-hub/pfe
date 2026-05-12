import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/layout/BarreLaterale"
import { Toaster } from "@/shared/components/ui/sonner"

const LayoutPrincipal = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar variant="inset" />
      <SidebarInset className="px-2 lg:px-4">
        <SidebarTrigger />
        <main>
          <Toaster />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutPrincipal
