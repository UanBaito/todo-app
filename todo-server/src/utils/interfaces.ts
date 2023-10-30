export interface User {
  id: string;
  name: string;
  created_at: string;
  pwd_hash: string;
}
export interface Todo {
  id: number;
  cid: string;
  name: string;
  created_at: string;
  isCompleted: boolean;
}
export interface Ctx {
  exp: number;
  userInfo: User;
}
export interface TodoForCreate {
  name: string;
}
export interface TodoForUpdate {
  id: number;
  name: string;
  isCompleted: boolean;
}
export interface UserForCreate {
  name: string;
  pwd: string;
}

export type AuthToken = {
  exp: number;
  user: User;
  iat: number;
};
