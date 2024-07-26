'use client';

import { userState } from '@/recoil/userAtom';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [myData, setMyData] = useRecoilState(userState);
  return (
    <>
      <div className="text-center">
        {myData?.username + '로 로그인된 상태입니다.'}
      </div>
    </>
  );
}
