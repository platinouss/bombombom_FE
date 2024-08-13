export interface StudyDetailsAndRound {
  details: StudyDetails;
  round: AlgorithmRound;
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

export interface StudyMemberInfo {
  username: string;
  baekjoonId: string;
  isUpdating: boolean;
  tasks: {
    [problemId: number]: boolean;
  };
}
