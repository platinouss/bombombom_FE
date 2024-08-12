import { BookResult } from '../book/book-result';

export interface AlgorithmStudyDetailsAndRound {
  details: StudyDetails;
  round: AlgorithmRound;
}
export interface BookStudyDetailsAndRound {
  details: BookStudyDetails;
  round: BookRound;
}

export interface StudyDetails {
  studyType: string;
  name: string;
  introduce: string;
  headCount: number;
  capacity: number;
  penalty: number;
  leaderId: number;
  reliabilityLimit: number;
  startDate: Date;
  weeks: number;
  status: StudyStatus;
}

export interface BookStudyDetails extends StudyDetails {
  book: BookResult;
}

export interface BookRound {
  idx: number;
  startDate: Date;
  endDate: Date;
  assignments: {
    [assignmentId: number]: StudyAssignmentInfo;
  };
  users: {
    [userId: number]: StudyMemberInfo;
  };
}

export enum StudyStatus {
  READY = 'READY',
  RUNNING = 'RUNNING',
  END = 'END'
}

export interface AlgorithmRound {
  idx: number;
  startDate: Date;
  endDate: Date;
  problems: {
    [problemId: number]: AlgorithmProblemInfo;
  };
  users: {
    [userId: number]: StudyMemberInfo;
  };
}

export interface AlgorithmProblemInfo {
  problemId: number;
  refId: number;
  tag: string;
  title: string;
  link: string;
  difficulty: number;
}

export interface StudyAssignmentInfo {
  assignmentId: number;
  title: string;
  content: string;
}

export interface StudyMemberInfo {
  username: string;
  baekjoonId: string;
  isUpdating: boolean;
  tasks: {
    [problemId: number]: boolean;
  };
}
