export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  item: {
    token: string;
    user: {
      href: string;
      item: {
        id: string;
        email: string;
        type: string;
        address: string;
      };
    };
  };
}
