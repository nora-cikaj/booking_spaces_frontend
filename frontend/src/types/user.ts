type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  admin: boolean;
  createdAt: Date;
  myEvents: string[];
};

export default User;
