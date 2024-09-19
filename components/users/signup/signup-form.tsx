'use client';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Textarea } from '@/components/ui/textarea/textarea';
import { signup } from '@/lib/api/users/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

export default function SignupForm() {
  const router = useRouter();
  const signupSchema = z
    .object({
      username: z.string().trim().min(1, '빈 문자열일 수 없습니다.'),
      password: z.string().trim().min(1, '빈 문자열일 수 없습니다.'),
      checkPassword: z.string().trim().min(1, '빈 문자열일 수 없습니다'),
      introduce: z.string().max(255, '255자 이내여야 작성해주세요.')
    })
    .superRefine(({ password, checkPassword }, ctx) => {
      if (password !== checkPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '패스워드가 일치하지 않습니다.',
          path: ['checkPassword']
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: FieldValues) => {
    const response = await signup(data);
    if (response.status === 200) {
      toast.success('회원가입이 완료되었습니다.');
      router.push('/login');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username" className="block font-medium mb-2">
          아이디
        </label>
        <Input
          id="username"
          placeholder="아이디를 입력해주세요"
          {...register('username')}
        />
        {errors.username?.message && (
          <span className="text-red-700">
            {errors.username?.message as string}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block font-medium mb-2">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          {...register('password')}
        />
        {errors.password?.message && (
          <span className="text-red-700">
            {errors.password?.message as string}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="checkPassword" className="block font-medium mb-2">
          비밀번호 확인
        </label>
        <Input
          id="checkPassword"
          type="password"
          placeholder="동일한 패스워드를 입력해주세요"
          {...register('checkPassword')}
        />
        {errors.checkPassword?.message && (
          <span className="text-red-700">
            {errors.checkPassword?.message as string}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="baekjoonId" className="block font-medium mb-2">
          Baekjoon ID
        </label>
        <Input
          id="baekjoonId"
          placeholder="Baekjoon ID를 입력해주세요"
          {...register('baekjoonId')}
        />
      </div>
      <div>
        <label htmlFor="username" className="block font-medium mb-2">
          소개
        </label>
        <Textarea
          id="introduce"
          placeholder="소개 글을 입력해주세요"
          className="min-h-[100px]"
          {...register('introduce')}
        />
        {errors.introduce?.message && (
          <span className="text-red-700">
            {errors.introduce?.message as string}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        회원가입
      </Button>
    </form>
  );
}
