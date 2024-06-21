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

export const bgColorClasses = {
  [Tier.BRONZE]: 'bg-yellow-700';
  [Tier.SILVER]: 'bg-slate-500';
  [Tier.GOLD]: 'bg-yellow-500';
  [Tier.PLATINUM]: 'bg-green-500';
  [Tier.DIAMOND]: 'bg-cyan-500';
  [Tier.RUBY]: 'bg-rose-500';
};

type aa {
  
}

export type bgColorClass = bgColorClasses[Tier];

export const MAX_DIFFICULTY_LEVEL = 29;
