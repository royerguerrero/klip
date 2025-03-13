export interface AuthenticateUserQueryResponse {
  id: string;
  email: string;
  companyId: string;
  teams: {
    id: string;
    name: string;
  }[];
}
