'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IGetUserResponse } from '@/interfaces/IResponse';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye, FolderOpen } from 'lucide-react';
import { PdfViewerDialog } from '@/components/pdf-viewer-dialog';
import Link from 'next/link';

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
  // {
  //   accessorKey: 'docs.passport.link',
  //   header: 'Passport',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.passport?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Passport" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'docs.contract.link',
  //   header: 'Contract',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.contract?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Contract" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'docs.emiratesId.link',
  //   header: 'Emirates ID Doc',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.emiratesId?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Emirates ID" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'docs.insurance.link',
  //   header: 'Insurance',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.insurance?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Insurance" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'docs.offerLetter.link',
  //   header: 'Offer Letter',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.offerLetter?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Offer Letter" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'docs.simCardResponsibility.link',
  //   header: 'Sim Card Responsibility',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.simCardResponsibility?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Sim Card Responsibility" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'docs.drivingLicense.link',
  //   header: 'Driving License',
  //   cell: ({ row }) => {
  //     const pdfUrl = row.original.docs.drivingLicense?.link;
  //
  //     return pdfUrl ? (
  //       <PdfViewerDialog url={pdfUrl} title="Driving License" />
  //     ) : (
  //       <span className="text-muted-foreground text-xs">N/A</span>
  //     );
  //   },
  // },
  {
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <Button asChild>
          <Link href="#">View</Link>
        </Button>
      );
    },
  },
];
