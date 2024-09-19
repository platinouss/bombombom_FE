import { BookStudyDetails } from './study-detail';

export interface BookStudyTaskListFormProps {
  isOpen: boolean;
  openChange: (arg0: boolean) => void;
  details: BookStudyDetails;
  nextRoundIdx: number;
}
