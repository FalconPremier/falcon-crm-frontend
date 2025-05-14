import {SetBreadcrumbs} from "@/components/set-bread-crumb";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {columns, Payment} from "@/app/(protected)/agent/columns";
import {DataTable} from "@/app/(protected)/agent/data-table";

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
            <SetBreadcrumbs crumbs={[{ label: "Agent", href: "/agent" },
                { label: "Agent List", href: "/agent" }]} />
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className='flex flex-1 flex-row  justify-between'>
                        <span className="text-secondary-foreground text-2xl font-bold">AGENTS</span>
                    <Button  >
                        <Plus className="text-secondary-foreground text-lg"/>
                        <span className="text-secondary-foreground text-lg">Create Agent</span>
                    </Button>
                </div>
                <div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}
