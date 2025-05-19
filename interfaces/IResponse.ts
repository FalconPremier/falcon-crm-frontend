export interface ICreateAgentResponse {}

export interface IGetUserResponse {
  email: string;
  name: string;
  phone: string;
  emiratesId: string;
  profileImage: IMedia;
  role: string;
}

interface IMedia {
  link: string;
  mimetype: string;
}
