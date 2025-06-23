// pages/MyPage.jsx

import { useEffect, useState } from "react";
import { supabase } from "../hooks/supabase";

export default function MyPage() {
  // user 정보를 저장할 state 선언
  const [userInfo, setUserInfo] = useState(null);

  // 컴포넌트가 마운트되었을 때 실행되는 useEffect
  useEffect(() => {
    // 로그인한 유저 정보 가져오기
    const getUserInfo = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // 세션 정보 가져오기

      // 세션에 유저 정보가 있을 경우 state에 저장
      if (session?.user) {
        setUserInfo({
          email: session.user.email,
          nickname: session.user.user_metadata?.full_name || "닉네임 없음",
        });
      }
    };

    getUserInfo(); // 함수 실행
  }, []);

  // 유저 정보가 없을 경우 로딩 중 표시
  if (!userInfo) return <p className="text-white">로딩 중...</p>;

  // 유저 정보가 있을 경우 화면에 출력
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">마이페이지</h1>
      <p>닉네임: {userInfo.nickname}</p>
      <p>이메일: {userInfo.email}</p>
    </div>
  );
}
