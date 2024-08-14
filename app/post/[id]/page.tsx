'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar/avatar';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';

export default function Post() {
  return (
    <div className="flex px-4 py-6 md:px-6 lg:py-16 md:py-12 ">
      <article className="prose prose-gray mx-auto dark:prose-invert w-[600px]">
        <div className="space-y-2 not-prose mb-3">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
            스터디 입장 전 필독
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">멘토</div>
            </div>
            <div className="text-muted-foreground text-sm">2024. 08. 13</div>
          </div>
        </div>
        <p>1. 9시 1분은 9시가 아니다</p>
        <p>2. 실행은 수직적 문화는 수평적</p>
        <p>3. 잡담을 많이 나누는 것이 경쟁력이다</p>
        <p>4. 휴가나 퇴근 시 눈치주는 농담을 하지 않는다</p>
        <p>5. 보고는 팩트에 기반한다</p>
        <p>6. 회식은 100% 자율적으로 참석한다</p>
        <br></br>
        <h2 className="text-lg">댓글</h2>
        <div className="space-y-4 mt-3">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium">장민석</div>
              <div className="text-muted-foreground">
                전 격주로 할 것 같은데 가능할까요?
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium">이현종</div>
              <div className="text-muted-foreground">확인했습니다!</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium">송승훈</div>
              <div className="text-muted-foreground">넵 확인했습니다</div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">댓글 추가...</Label>
              <Textarea id="comment" placeholder="..." rows={3} />
            </div>
            <div className="flex justify-end ">
              <Button
                type="submit"
                className="hover:bg-gray-600 bg-gray-900 text-white"
              >
                작성
              </Button>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}
