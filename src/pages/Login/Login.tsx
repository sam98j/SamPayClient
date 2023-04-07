import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { LoginState, LoginProps } from "./login.interface";
import { useDispatch, useSelector } from "react-redux";
import { LoginClient, LoginWithGoogle } from "../../apis/auth";
import { AppState } from "../../types/interfaces/store";
import vectorsImg from "../../assets/vectors/Transactional-SMS.svg";
import TransLoading from "../../components/TransLoading/TransLoading";
import { Link } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { AnimatePresence } from "framer-motion";
import AuthErrAlert from "../SignUp/AuthErrAlert/AuthErrAlert";
import AppIcon from "../../components/AppIcon/AppIcon";
import { useTranslation } from "react-i18next";
import SwitchLang from "../../components/SwitchLang/SwitchLang";
import { PagesNames } from "../../types/enums/locales/PagesNames";
import { loginPageContent } from "../../types/enums/locales/LoginPageContent";

const Login = () => {
  // t function hook
  const { t } = useTranslation();
  // component state
  const [state, setState] = useState<LoginState>({
    clientCredentioal: {
      email: "",
      password: "",
    },
    isLoading: false,
  });
  // dispatch
  const dispatch = useDispatch();
  const { isAuthorized, errMsg, isLoggedIn } = useSelector<
    AppState,
    LoginProps
  >(({ auth }) => ({
    isAuthorized: Boolean(auth.client),
    isLoggedIn: auth.isLogged,
    errMsg: auth.errMsg,
  }));
  // component did mount
  useEffect(() => {
    if (isAuthorized) {
      setState({
        ...state,
        isLoading: false,
      });
      // LogginClient();
    }
    if (Boolean(errMsg)) {
      setState({
        ...state,
        isLoading: false,
      });
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
    if (state.clientCredentioal!.email && state.clientCredentioal!.password) {
      dispatch(LoginClient(state.clientCredentioal!));
      setState({
        ...state,
        isLoading: true,
      });
    }
  };
  // handleLogin
  const handleLoginWithGoogle = (
    googleData: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const googleOauthData = googleData as GoogleLoginResponse;
    // send the tokenId to api to handle SignUpWithGoogle
    dispatch(LoginWithGoogle({ googleTokenId: googleOauthData.tokenId }));
  };
  return (
    <section className={styles.Login}>
      <SwitchLang />
      {/* login form */}
      <section className={styles.LoginForm}>
        {/* signUp Link */}
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
            <AppIcon /> <p>SamPay</p>
          </div>
          {/* form name */}
          <h2>{t(`${PagesNames.LOGIN_PAGE}.${loginPageContent.PAGE_NAME}`)}</h2>
          {/* google login */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
            buttonText={
              t(
                `${PagesNames.LOGIN_PAGE}.${loginPageContent.OATH_BTN_TEXT}`
              ) as string
            }
            onSuccess={handleLoginWithGoogle}
            onFailure={handleLoginWithGoogle}
            cookiePolicy={"single_host_origin"}
            className={styles.googleLogin}
          />
          {/* seperator */}
          <p className={styles.seperator}>Or</p>
          {/* input field */}
          {/* input field */}
          <div>
            <label htmlFor="email">
              {t(`${PagesNames.LOGIN_PAGE}.${loginPageContent.EMAIL_FIELD}`)}
            </label>
            <input
              type="email"
              onChange={handleChange}
              value={state.clientCredentioal!.email!}
              name="email"
              id="email"
            />
          </div>
          {/* input field */}
          <div>
            <label htmlFor="">
              {t(`${PagesNames.LOGIN_PAGE}.${loginPageContent.PASS_FIELD}`)}
            </label>
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
              {state.isLoading ? (
                <TransLoading />
              ) : (
                t(`${PagesNames.LOGIN_PAGE}.${loginPageContent.LOGIN_BTN}`)
              )}
            </button>
            {/* forget password link */}
            <a href="" className={styles.ForgetPassword}>
              {t(
                `${PagesNames.LOGIN_PAGE}.${loginPageContent.FORGET_PASS_LINK}`
              )}
            </a>
            <Link to="/signup" className={styles.signupLink}>
              {t(`${PagesNames.LOGIN_PAGE}.${loginPageContent.SGINUP_LINK}`)}
            </Link>
          </div>
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
          {/* end of social media */}
          {/* compy rights */}
          <p className={styles.copyRight}>
            <span className="">2022</span>
            <span className="">samPay - All Right Reserved</span>
          </p>
          {/* end of copy rights section */}
        </form>
      </section>
      {/* vecotr */}
      <section className={styles.VectorsArea}>
        <img src={vectorsImg} alt="" />
      </section>
    </section>
  );
};

export default Login;
