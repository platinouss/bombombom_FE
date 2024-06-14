import axios from "axios";

/**
 * 로그인 API
 * body : username, password
 */
export function login(username: string, password: string) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/auth`,
    {
      username: username,
	    password: password,
    }
  );
}
