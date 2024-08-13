import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import joinStudy from '@/lib/api/study/join';
import { StudyDetails } from '@/types/study/study-detail';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function JoinStudyDialog(details: StudyDetails, key: string) {
  const handleSubmit = async () => {
    try {
      const response = await joinStudy(parseInt(key));
      toast.success('스터디에 참여하였습니다.');
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="bg-cyan-300 w-full" onClick={() => setOpen(true)}>
        참여하기
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <b>{details.name}</b> 에 참여합니다.
          </DialogTitle>
          <DialogDescription>{details.introduce}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="">입장 조건</h4>
            <p className=" text-slate-500 dark:text-slate-400">
              보증금 <b>{details.penalty * details.weeks}</b>원<br />
              신뢰도 <b>{details.reliabilityLimit}</b> 이상
            </p>
          </div>
        </div>
        <DialogFooter>
          <div>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
          <DialogClose asChild>
            <Button
              disabled={details.capacity <= details.headCount}
              onClick={handleSubmit}
              className="
            bg-slate-900/90 text-white hover:bg-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-50
            "
            >
              스터디 참여하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
