import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SignupForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="username" className="block font-medium mb-2">아이디</label>
        <Input id="username" placeholder="아이디를 입력해주세요" />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium mb-2">패스워드</label>
        <Input id="password" type="password" placeholder="패스워드를 입력해주세요" />
      </div>
      <div>
        <label htmlFor="username" className="block font-medium mb-2">소개</label>
        <Textarea id="introduce" placeholder="소개 글을 입력해주세요" className="min-h-[100px]" />
      </div>
      <Button type="submit" className="w-full">
        회원가입
      </Button>
    </form>
  );
}
