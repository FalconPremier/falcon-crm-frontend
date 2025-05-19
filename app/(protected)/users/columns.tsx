'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IGetUserResponse } from '@/interfaces/IResponse';
import Image from 'next/image';

export const columns: ColumnDef<IGetUserResponse>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Contact',
  },
  {
    accessorKey: 'emiratesId',
    header: 'Emirates ID',
  },
  {
    accessorKey: 'profileImage.link',
    header: 'Profile Picture',
    cell: ({ row }) => {
      const imageUrl = row.original.profileImage?.link;

      return imageUrl ? (
        <Image
          src={imageUrl}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : (
        <span className="text-muted-foreground text-xs">No Image</span>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];
