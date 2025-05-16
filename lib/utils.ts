import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {IFileUploadConfig} from "@/interfaces/IGlobal";
import {FieldValues} from "react-hook-form";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fileUploadOnChangeHandler = <T extends FieldValues>({
                                                                 form,
                                                                 key,
    field,
                                                                 allowedFileTypes,
                                                                 maxFiles = 1,
                                                                 errorMessages = {
                                                                   invalidType: `Only ${allowedFileTypes.join(', ')} files are allowed.`,
                                                                   invalidNumber: `Please upload ${maxFiles === 1 ? 'exactly one file' : `up to ${maxFiles} files`}.`,
                                                                 },
                                                               }: IFileUploadConfig<T>): (e: React.ChangeEvent<HTMLInputElement>) => void => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || files.length > maxFiles) {
      form.setError(key, {
        type: 'manual',
        message: errorMessages.invalidNumber,
      });
      e.target.value = '';
      return;
    }

    const invalidFiles = Array.from(files).some(
        (file) => !allowedFileTypes.includes(file.type)
    );

    if (invalidFiles) {
      form.setError(key, {
        type: 'manual',
        message: errorMessages.invalidType,
      });
      e.target.value = '';
      return;
    }
    form.clearErrors(key);
    field.onChange(files);
  };
};
