import React, { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/all";
import {
  NewClientRegestrationData,
  SignUpProps,
  SignUpState,
} from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { signUp, signUpWithGoogle } from "../../apis/auth";
import { AppState } from "../../types/interfaces/store";
import TransLoading from "../../components/TransLoading/TransLoading";
import { Link, useHistory } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import VectorArt from "../../assets/vectors/hugo-payment-processed.png";
import AuthErrAlert from "./AuthErrAlert/AuthErrAlert";
import { AnimatePresence } from "framer-motion";
import AppIcon from "../../components/AppIcon/AppIcon";
import { uploadProfileImg } from "../../apis/filesUplaod";

const SignUp = () => {
  // react router hooks
  const { push } = useHistory();
  // Componet State
  const [state, setState] = useState<SignUpState>({
    clientCredentioal: {
      username: "",
      password: "",
      email: "",
      profile_img_url: "",
    },
    profile_img: "",
    isLoading: false,
  });
  const [profile_img, setProfileImg] = useState<File>();
  // dispatch
  const dispatch = useDispatch();
  // Component Props
  const { isAuthorized, errMsg, isLoggedIn } = useSelector<
    AppState,
    SignUpProps
  >(({ auth }) => ({
    isAuthorized: Boolean(auth.client),
    errMsg: auth.errMsg,
    isLoggedIn: auth.isLogged,
  }));
  // component did mount
  useEffect(() => {
    if (isAuthorized) {
      setState({
        ...state,
        isLoading: false,
      });
    }
    // LogginClient();
    if (Boolean(errMsg)) {
      console.log(errMsg);
      setState({
        ...state,
        isLoading: false,
      });
    }
  }, [isAuthorized, errMsg]);
  // useEffect
  useEffect(() => {
    return function cleanUp() {
      console.log("compoent un mount");
      push("/dashboard");
    };
  }, []);
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
  const handleSubmition = async (e: React.FormEvent) => {
    e.preventDefault();
    // form falidation
    if (state.clientCredentioal!.email && state.clientCredentioal!.password) {
      const formData = new FormData();
      formData.append("profile_img", profile_img!);
      const data = {
        ...state.clientCredentioal,
        profile_img_url: formData,
      } as NewClientRegestrationData;
      dispatch(signUp(data));
      setState({
        ...state,
        isLoading: true,
      });
    }
  };
  // handle profile pic selection
  const handleChoseProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files![0];
    e.preventDefault();
    setProfileImg(e.target.files![0]);
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
            <AppIcon />
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
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              checked
              required
              id="email"
              onChange={handleChange}
              value={state.clientCredentioal!.email!}
              name="email"
            />
          </div>
          {/* input field */}
          <div className={styles.inputArea}>
            <label htmlFor="email">E-mail</label>
            <input
              type="file"
              id="profile_img"
              onChange={handleChoseProfileImg}
              name="profile_img"
              accept="image/png image/jpg"
            />
          </div>
          {/* input field */}
          <div className={styles.inputArea}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              checked
              required
              id="username"
              onChange={handleChange}
              value={state.clientCredentioal!.username!}
              name="username"
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
        <img src={VectorArt} alt="" />
      </section>
      {/* end vector area */}
    </section>
  );
};

export default SignUp;
