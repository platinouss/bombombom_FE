import axios from 'axios';

/**
 * 회원가입 API
 * body : username, password, introduce
 */
export async function signup({ username, password, introduce }: SignupRequest) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/users/signup`,
    { username, password, introduce }
  );
}
