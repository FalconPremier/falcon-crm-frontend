import { SetBreadcrumbs } from '@/components/set-bread-crumb';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <SetBreadcrumbs crumbs={[{ label: 'Dashboard', href: '/dashboard' }]} />
      <div className="@container/main flex flex-1 flex-col gap-2">Dashboard</div>
    </div>
  );
}
