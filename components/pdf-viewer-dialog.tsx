import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export interface PdfViewerDialogProps {
  url: string;
  title: string;
}
export const PdfViewerDialog = ({ url, title }: PdfViewerDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[80vh] w-full max-w-4xl flex-col">
        <DialogTitle className="">{`${title} Preview`}</DialogTitle>
        <iframe src={url} className="h-full w-full rounded-md" />
      </DialogContent>
    </Dialog>
  );
};
