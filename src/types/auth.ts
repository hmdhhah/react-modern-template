export interface ICredentials {
  refresh: string;
  access: string;
}

export interface IAuthentication {
  email: string;
  password: string;
}
export interface IAuthFormValues {
  full_name?: string;
  email?: string;
  website: string;
  industry: string;
  team_size: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}
