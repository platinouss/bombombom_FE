'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Textarea } from '@/components/ui/textarea/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/api/users/signup';

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
      router.push('/');
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
