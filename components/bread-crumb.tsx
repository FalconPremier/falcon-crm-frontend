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
import {Fragment} from "react";

const Breadcrumbs = () => {
    const { breadcrumbs } = useUIStore(state => state);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <Fragment key={index}>
                    <BreadcrumbItem key={index} className={index > 0 ? '' : 'hidden md:block'}>
                        {index < breadcrumbs.length - 1 ? (
                            <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}

                    </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                    </Fragment >
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
