'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../ui/dialog/dialog';
import { RadioGroup } from '../ui/radio/radio-group';
import { MAX_DIFFICULTY_LEVEL } from '@/constants/study/study';
import TierRadioItem from './tier';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function DifficultyLevelDialog({
  open,
  setOpen,
  difficultyLevel,
  setDifficultyLevel
}: {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  difficultyLevel: number;
  setDifficultyLevel: (arg0: number) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="hidden">
          <DialogTitle>문제 난이도 설정</DialogTitle>
          <DialogDescription>문제 난이도 설정</DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={difficultyLevel.toString()}
          onValueChange={(value) => {
            setOpen(false);
            setDifficultyLevel(Number(value));
          }}
        >
          <div className="grid grid-cols-5 grid-rows-6 gap-4 py-4">
            {Array.from({ length: MAX_DIFFICULTY_LEVEL + 1 }).map((x, i) => (
              <TierRadioItem
                key={i}
                className={difficultyLevel == i ? 'bg-gray-200' : ''}
                difficultyLevel={i}
              ></TierRadioItem>
            ))}
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}
