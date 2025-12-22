 export interface authState {
  token: string | null;
  loading:boolean;
  status:string | number;
  error?: string;
  user: { email: string; name: string } | null;
  isAuthenticated: boolean;
}