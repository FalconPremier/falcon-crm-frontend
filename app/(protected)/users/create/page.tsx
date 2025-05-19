import { SetBreadcrumbs } from '@/components/set-bread-crumb';
import { Separator } from '@/components/ui/separator';
import CreateUserForm from '@/app/(protected)/users/create/create-user-form';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <SetBreadcrumbs
        crumbs={[
          { label: 'Users', href: '/users' },
          { label: 'Create User', href: '/users/create' },
        ]}
      />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-col justify-between">
          <h2 className="text-3xl font-bold">Add New Team Member</h2>
          <h4 className="text-md font-light">
            Seamlessly expand your team and keep your operations aligned.
          </h4>
        </div>
        <Separator className="" />
        <CreateUserForm />
      </div>
    </div>
  );
}
