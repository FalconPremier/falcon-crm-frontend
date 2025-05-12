"use client"

import { useUIStore } from "@/lib/store"; // Adjust path as needed
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";

const Breadcrumbs = () => {
    const { breadcrumbs } = useUIStore(state => state);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={index} className={index > 0 ? '' : 'hidden md:block'}>
                        {index < breadcrumbs.length - 1 ? (
                            <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
