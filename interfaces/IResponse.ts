export interface ICreateAgentResponse {}

export interface IGetUserResponse {
  email: string;
  name: string;
  phone: string;
  emiratesId: string;
  profileImage: IFile;
  role: string;
  docs: {
    passport: IFile;
    emiratesId: IFile;
    insurance: IFile;
    contract: IFile;
    offerLetter: IFile;
    simCardResponsibility: IFile;
    drivingLicense?: IFile;
  };
}

interface IFile {
  link: string;
  mimetype: string;
}
