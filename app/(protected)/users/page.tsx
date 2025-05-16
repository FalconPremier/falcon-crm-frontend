import {SetBreadcrumbs} from "@/components/set-bread-crumb";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {columns, Payment} from "@/app/(protected)/users/columns";
import {DataTable} from "@/app/(protected)/users/data-table";
import Link from "next/link";

export default function Page() {
    const data:Payment[]=[
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },{
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },{
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },{
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },{
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
    ]
    return (
        <div className="flex flex-1 flex-col">
            <SetBreadcrumbs crumbs={[{ label: "Users", href: "/users" },
                { label: "User List", href: "/users" }]} />
            <div className="@container/main flex flex-1 flex-col gap-y-10">
                <div className='flex flex-1 flex-row  justify-between'>
                        <span className="text-secondary-foreground text-2xl font-bold">USERS</span>
                    <Button asChild className="text-md"  >
                        <Link href="/users/create">
                            <Plus className=""/>
                            <span className="">Create User</span>
                        </Link>

                    </Button>
                </div>
                <div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}
