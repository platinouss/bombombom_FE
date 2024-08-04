export const DEFAULT_SIZE = 6;
export const DEFAULT_PAGE = 0;
export const ELLIPSIS_PAGE = 3;

export enum Tier {
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
  DIAMOND,
  RUBY
}

export const colorClassMap: Record<number, string> = {
  [Tier.BRONZE]: 'yellow-700',
  [Tier.SILVER]: 'slate-500',
  [Tier.GOLD]: 'yellow-500',
  [Tier.PLATINUM]: 'green-500',
  [Tier.DIAMOND]: 'cyan-500',
  [Tier.RUBY]: 'rose-500'
};

export const colorClasses = [
  ...Object.values(colorClassMap).map((colorClass) => `bg-${colorClass}`),
  ...Object.values(colorClassMap).map((colorClass) => `fill-${colorClass}`)
];

export enum StudyType {
  ALGORITHM = '알고리즘 스터디',
  BOOK = '기술서적 스터디'
}

export const MAX_DIFFICULTY_LEVEL = 30;
export const MIN_DIFFICULTY_LEVEL = 1;
export const MAX_RELIABILITY_LIMIT = 100;
export const MAX_PENALTY = 100_000;
export const MAX_WEEKS = 52;
export const MAX_CAPACITY = 20;
export const MAX_PROBLEM_COUNT = 20;

export const MAX_LENGTH_INTRODUCE = 500;
export const MAX_LENGTH_NAME = 255;
export const DAYS_PER_WEEK = 7;
