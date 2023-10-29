export interface User {
  id: string;
  name: string;
  created_at: string;
  pwd_hash: string;
}
export interface Todo {
  id: number;
  cid: number;
  name: string;
  created_at: string;
}
export interface TodoForCreate {
  name: string;
}
