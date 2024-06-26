import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog/dialog"
import { Button } from "@/components/ui/button"
import StudyGroup from "./study-group"
import { Study } from '../../types/study/study';
import joinStudy from '@/lib/api/study/join';
import { toast } from 'react-toastify';

export default function JoinStudyDialog(study: Study) {
  const handleSubmit = async () => {
    try {
      const response = await joinStudy(study.id);
      toast.success('스터디에 참여하였습니다.');
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <StudyGroup key={study.id} {...study} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle><b>{study.name}</b> 에 참여합니다.</DialogTitle>
          <DialogDescription>{study.introduce}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="">입장 조건</h4>
            <p className=" text-slate-500 dark:text-slate-400">
              보증금 <b>{study.penalty * study.weeks}</b>원<br/>
              신뢰도 <b>{study.reliabilityLimit}</b> 이상
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
            <Button disabled={study.capacity <= study.headCount} onClick={handleSubmit} className="
            bg-slate-900/90 text-white hover:bg-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-50
            ">
              스터디 참여하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
