import axios from "axios";
import { useEffect, useState } from "react";

/**
 * 로그인한 유저의 본인 정보 조회 API
 * body : 없음
 */
export async function me() {
  const response = await axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/users/me`);

  return response.data;
}

