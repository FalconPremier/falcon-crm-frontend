import {ControllerRenderProps, FieldValues, Path, UseFormReturn} from 'react-hook-form';

export interface IBreadCrumb{
    label: string;
    href?: string;
}

export interface IFileUploadConfig<T extends FieldValues>{
    form: UseFormReturn<T>;
    key: Path<T>;
    field: ControllerRenderProps<T>;
    allowedFileTypes: string[];
    maxFiles?: number;
    errorMessages?: {
        invalidType?: string;
        invalidNumber?: string;
    }
}