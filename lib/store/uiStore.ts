import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBreadCrumb } from '@/interfaces/IGlobal';

type UIState = {
    breadcrumbs: IBreadCrumb[];
    setBreadcrumbs: (crumbs: IBreadCrumb[]) => void;
};

export const useUIStore = create<UIState>()(
    devtools(
        (set) => ({
            breadcrumbs: [],
            setBreadcrumbs: (crumbs) =>
                set({ breadcrumbs: crumbs }, false, 'setBreadcrumbs'),
        }),
        { name: 'UI Store' }
    )
);
