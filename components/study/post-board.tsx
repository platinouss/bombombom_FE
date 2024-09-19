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
            스터디 오프라인 모각코
          </CardTitle>
          <CardDescription className="text-base">
            스터디 종료일에 다같이 모각코 후 놀아요! 저녁은 백소정, 1차는
            상상호프 입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 23일 </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <CardHeader className="bg-primary p-4 text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            알고리즘 강의 및 책 추천
          </CardTitle>
          <CardDescription className="text-base">
            서적 추천 1. 종만북 2. 프로그래밍 콘테스트 챌린징 강의 추천 1.
            Barking Dog 2. 나동빈
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 17일 </p>
        </CardContent>
      </Card>

      <Card
        onClick={() => {
          location.href = '/post/1';
        }}
        className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
      >
        <CardHeader className="bg-primary p-4 text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            스터디 입장 전 필독
          </CardTitle>
          <CardDescription className="text-base">
            1. 9시 1분은 9시가 아니다 2. 실행은 수직적 문화는 수평적 3. 잡담을
            많이 나누는 것이 경쟁력이다 4. 휴가나 퇴근 시 눈치주는 농담을 하지
            않는다 5. 보고는 팩트에 기반한다 6. 오프라인 모임은 100% 자율적으로
            참석한다
          </CardDescription>
        </CardHeader>
        <CardContent className="flex p-4 gap-2">
          <CalendarIcon className="w-4 h-4"></CalendarIcon>
          <p className="text-sm text-muted-foreground">8월 13일 </p>
        </CardContent>
      </Card>
    </div>
  );
}
