'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card/card';
import { CalendarIcon } from '@/components/ui/icon/icon';

export default function PostBoard() {
  return (
    <div className="mt-5 flex flex-col w-1/3 gap-5 justify-start">
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <CardHeader className="bg-primary p-4 text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            스터디 입장 전 필독
          </CardTitle>
          <CardDescription className="text-base">
            오프라인 주 1회
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 17일 </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <CardHeader className="bg-primary p-4 text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            스터디 입장 전 필독
          </CardTitle>
          <CardDescription className="text-base">
            오프라인 주 1회
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 17일 </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <CardHeader className="bg-primary p-4 text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            스터디 입장 전 필독
          </CardTitle>
          <CardDescription className="text-base">
            오프라인 주 1회
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 17일 </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <CardHeader className="bg-primary p-4 text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            스터디 입장 전 필독
          </CardTitle>
          <CardDescription className="text-base">
            오프라인 주 1회
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 17일 </p>
        </CardContent>
      </Card>
    </div>
  );
}
