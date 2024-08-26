export type AssignProfileInfoData = {
  name: string;
  phone: string;
  address: string;
  bio: string;
};

export type AssignProfileResponse = {
  item: {
    id: string;
    email: string;
    type: string;
    name: string;
    phone: string;
    address: string;
    bio: string;
    shop: string;
  };
};
