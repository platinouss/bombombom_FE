import {
  MIN_DIFFICULTY_LEVEL,
  Tier,
  colorClassMap
} from '@/constants/study/study';
import { cn } from '@/lib/utils';
import { ITier } from '@/types/study/tier';
import { Label } from '@radix-ui/react-label';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import { ShieldIcon } from '../ui/icon/icon';

export function getTierInfo(difficultyLevel: number): ITier {
  const difficultyLevelFromMin = difficultyLevel - MIN_DIFFICULTY_LEVEL;
  const tierIndex = Math.floor(difficultyLevelFromMin / 5);
  const tier: string = Tier[tierIndex];
  const colorClass = colorClassMap[tierIndex];
  const division = 5 - (difficultyLevelFromMin % 5);
  return { colorClass, tier, division };
}
export function TierIcon({ colorClass, tier, division }: ITier) {
  const fillColorClass = `fill-${colorClass}`;
  return (
    <ShieldIcon
      className={cn(fillColorClass, 'stroke-none')}
      text={division.toString()}
    ></ShieldIcon>
  );
}

export default function TierRadioItem({
  difficultyLevel,
  className
}: {
  difficultyLevel: number;
  className: string;
}) {
  const { colorClass, tier, division } = getTierInfo(difficultyLevel);
  return (
    <div>
      <RadioGroupItem
        value={difficultyLevel.toString()}
        id={`${tier} ${division}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`${tier} ${division}`}
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <div
          className={cn(
            className,
            'hover:bg-gray-200 aspect-square w-12 flex items-center justify-center border border-slate-200 rounded-full peer-checked:bg-slate-900 peer-checked:text-slate-50 dark:border-slate-800 dark:peer-checked:bg-slate-50 dark:peer-checked:text-slate-900'
          )}
        >
          <TierIcon {...{ colorClass, tier, division }}></TierIcon>
        </div>
      </Label>
    </div>
  );
}
