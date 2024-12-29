export type MemberState = {
    loading: boolean;
    members: MemberType[] | null;
    errorMessage: string | null;
    memberLength: number | undefined,
    page: number,
    size: number,
  };
  
  export type MemberType = {
    _id?: string,
    username: string,
    password: string,
    fullName: string,
    roles: string [],
    createdDate?: string,
    updateDate?: string
  };
  