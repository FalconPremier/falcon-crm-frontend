    import React from "react";
    import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
    import {AppSidebar} from "@/components/app-sidebar";
    import {Separator} from "@/components/ui/separator";
    import Breadcrumbs from "@/components/bread-crumb";

    export default function ProtectedLayout({
                                           children,
                                       }: Readonly<{
        children: React.ReactNode;
    }>) {
        return (
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <Breadcrumbs/>
                            </div>
                        </header>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            )

    }