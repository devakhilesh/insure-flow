export interface SuccessRes {
  status:boolean,
  status_code: number;
  message: string;
  data?: unknown;
}



export interface ErrorRes {

  status: false;

  message: string;
}
