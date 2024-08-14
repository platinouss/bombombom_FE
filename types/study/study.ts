import { BookResult } from '../book/book-result';
import { User } from '../user/user';

export interface Study {
  id: number;
  name: string;
  introduce: string;
  headCount: number;
  capacity: number;
  weeks: number;
  startDate: string;
  leader: User;
  reliabilityLimit: number;
  penalty: number;
  state: string;
  studyType: string;
}

export interface Spread {
  left: number;
  right: number;
}

export interface AlgorithmStudy extends Study {
  difficultySpreadMap: { [key: string]: Spread };

  difficultyGap: number;

  problemCount: number;
}

export interface BookStudy extends Study {
  bookInfo: BookResult;
}

export interface StudyPage {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  contents: Study[];
}
