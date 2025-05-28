import { SetBreadcrumbs } from '@/components/set-bread-crumb';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { columns } from '@/app/(protected)/users/columns';
import { DataTable } from '@/app/(protected)/users/data-table';
import Link from 'next/link';
import { getRequestHandler, postRequestHandler } from '@/lib/apis';
import { UserRoutes } from '@/lib/apis/routes';
import { IGetUserResponse } from '@/interfaces/IResponse';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await postRequestHandler<IGetUserResponse[], {}>(
    UserRoutes.GET_USERS,
    undefined,
    accessToken,
  );

  return (
    <div className="flex flex-1 flex-col">
      <SetBreadcrumbs
        crumbs={[
          { label: 'Users', href: '/users' },
          { label: 'User List', href: '/users' },
        ]}
      />
      <div className="@container/main flex flex-1 flex-col gap-y-10">
        <div className="flex flex-1 flex-row justify-between">
          <span className="text-secondary-foreground text-2xl font-bold">USERS</span>
          <Button asChild className="text-md">
            <Link href="/users/create">
              <Plus className="" />
              <span className="">Create User</span>
            </Link>
          </Button>
        </div>
        {response && (
          <div>
            <DataTable columns={columns} data={response} />
          </div>
        )}
      </div>
    </div>
  );
}
