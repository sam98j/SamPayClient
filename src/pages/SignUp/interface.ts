// data come to component from outside
export interface SignUpProps {
  isAuthorized: Boolean;
  errMsg: string | null;
  isLoggedIn: Boolean | null;
}
// local state of component memebers
export interface SignUpState {
  clientCredentioal: NewClientRegestrationData | null;
  profile_img: any;
  isLoading: boolean;
}
// NewClientRegestrationData
export interface NewClientRegestrationData {
  email: string;
  username: string;
  password: string;
  profile_img_url: any;
}
