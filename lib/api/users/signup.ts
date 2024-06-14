import axios from 'axios';
import { FieldValues } from 'react-hook-form';

/**
 * 회원가입 API
 * body : username, password, introduce
 */
export async function signup({ username, password, introduce }: FieldValues) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/users/signup`,
    { username, password, introduce }
  );
}
