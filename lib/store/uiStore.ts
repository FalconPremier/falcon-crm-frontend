import {create} from 'zustand'
import {IBreadCrumb} from "@/interfaces/IGlobal";

type UIState = {
    breadcrumbs: IBreadCrumb[],
    setBreadcrumbs: (crumbs:IBreadCrumb[]) => void,
}
export const useUIStore = create<UIState>((set) => ({
    breadcrumbs: [],
    setBreadcrumbs: (crumbs) => set({ breadcrumbs: crumbs }),
}))