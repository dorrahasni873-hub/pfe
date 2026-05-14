import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/layout/BarreLaterale"
import { MenuHorizontal } from "@/shared/components/layout/MenuHorizontal"
import { Toaster } from "@/shared/components/ui/sonner"
import { useSettings } from "@/app/providers/SettingsProvider"

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
)

const LayoutPrincipal = () => {
  const { settings } = useSettings();

  if (settings.menuStyle !== "sidebar") {
    return (
      <div className={`min-h-screen bg-background ${
        settings.menuStyle === "fixed" ? "pt-14" : ""
      }`}>
        <MenuHorizontal style={settings.menuStyle} />
        <main className={settings.menuStyle === "fullWidth" ? "max-w-7xl mx-auto px-4" : "px-4"}>
          <Toaster />
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider
      className={settings.sidebarSide === "right" ? "flex-row-reverse" : ""}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar variant={settings.sidebarVariant} side={settings.sidebarSide} collapsible={settings.sidebarCollapsible} />
      <SidebarInset className={`px-2 lg:px-4 ${
        settings.sidebarSide === "right"
          ? "md:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:mr-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:mr-2"
          : ""
      }`}>
        <div className={settings.sidebarSide === "right" ? "flex justify-end" : ""}>
          <SidebarTrigger className={settings.sidebarSide === "right" ? "[&_svg]:rotate-180" : ""} />
        </div>
        <main>
          <Toaster />
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutPrincipal
