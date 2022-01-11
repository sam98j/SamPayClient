import React, { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/all";
import { LoginState, LoginProps } from "./login.interface";
import { useDispatch, useSelector } from "react-redux";
import { signUp, signUpWithGoogle } from "../../apis/auth";
import { AppState } from "../../types/interfaces/store";
import vectorsImg from "../../assets/vectors/bgOne.jpg";
import TransLoading from "../../components/TransLoading/TransLoading";
import { Link, useHistory } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Wallet from "../../assets/vectors/wallet.png";
import AuthErrAlert from "./AuthErrAlert/AuthErrAlert";
import { AnimatePresence } from "framer-motion";

const SignUp = () => {
  // react router hooks
  const { push } = useHistory();
  // Componet State
  const [state, setState] = useState<LoginState>({
    clientCredentioal: {
      name: "",
      password: "",
    },
    isLoading: false,
  });
  // dispatch
  const dispatch = useDispatch();
  // Component Props
  const { isAuthorized, errMsg, isLoggedIn } = useSelector<
    AppState,
    LoginProps
  >(({ auth }) => ({
    isAuthorized: Boolean(auth.client),
    errMsg: auth.errMsg,
    isLoggedIn: auth.isLogged,
  }));
  // component did mount
  useEffect(() => {
    console.log(errMsg);
    if (isAuthorized) {
      setState({
        ...state,
        isLoading: false,
      });
      // LogginClient();
      if (Boolean(errMsg)) {
        setState({
          ...state,
          isLoading: false,
        });
      }
    }
  }, [isAuthorized, errMsg]);
  // handle from change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      clientCredentioal: {
        ...state.clientCredentioal!,
        [e.target.name]: e.target.value,
      },
    });
  };
  // handle form submition
  const handleSubmition = (e: React.FormEvent): void => {
    e.preventDefault();
    // form falidation
    if (state.clientCredentioal!.name && state.clientCredentioal!.password) {
      dispatch(signUp(state.clientCredentioal!));
      setState({
        ...state,
        isLoading: true,
      });
    }
  };
  // handleLogin
  const handleSignUpWithGoogle = (
    googleData: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const googleOauthData = googleData as GoogleLoginResponse;
    // send the tokenId to api to handle SignUpWithGoogle
    dispatch(signUpWithGoogle({ googleTokenId: googleOauthData.tokenId }));
  };
  return (
    <section className={styles.signUp}>
      {/* signUp form */}
      <section className={styles.signUpForm}>
        <form onSubmit={handleSubmition}>
          {/* error message */}
          <AnimatePresence>
            {isLoggedIn === false ? (
              errMsg ? (
                <AuthErrAlert msg={errMsg} />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </AnimatePresence>
          {/* logo */}
          <div className={styles.logo}>
            <img src={Wallet} alt="" />
          </div>
          {/* form name */}
          <h2>Sign Up to samPay</h2>
          {/* google login */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
            buttonText="SignUp With Google"
            onSuccess={handleSignUpWithGoogle}
            onFailure={handleSignUpWithGoogle}
            cookiePolicy={"single_host_origin"}
            className={styles.googleLogin}
          />
          {/* seperator */}
          <p className={styles.seperator}>Or</p>
          {/* input field */}
          <div className={styles.inputArea}>
            <label htmlFor="">E-mail</label>
            <input
              type="text"
              onChange={handleChange}
              value={state.clientCredentioal!.name!}
              name="name"
            />
          </div>
          {/* input field */}
          <div className={styles.inputArea}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={state.clientCredentioal!.password}
            />
          </div>
          {/* bottom are */}
          <div className={styles.formFooter}>
            {/* button */}
            <button type="submit">
              {state.isLoading ? <TransLoading /> : "Sign Up"}
            </button>
          </div>
          {/* end of buttom area */}
          {/* social media links */}
          <div className={styles.SocialMedia}>
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaTwitter />
            </a>
            <a href="">
              <FaFacebook />
            </a>
          </div>
          {/* end social media links area */}
          {/* compy rights */}
          <p className={styles.copyRight}>
            <span className="">2022</span>
            <span className="">samPay - All Right Reserved</span>
          </p>
          {/* end of copy rights section */}
        </form>
      </section>
      {/* end of signUp form section */}
      {/* vecotr */}
      <section className={styles.VectorsArea}>
        <img src={vectorsImg} alt="" />
      </section>
      {/* end vector area */}
    </section>
  );
};

export default SignUp;
