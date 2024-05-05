import React, { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaRegEnvelope, FaKey } from 'react-icons/fa';
import { LoginState, LoginProps } from './login.interface';
import { useDispatch, useSelector } from 'react-redux';
import { LoginClient, LoginWithGoogle } from '../../apis/auth';
import { AppState } from '../../types/interfaces/store';
import vectorsImg from '../../assets/vectors/Transactional-SMS.svg';
import { Link } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AnimatePresence } from 'framer-motion';
import AuthErrAlert from '../SignUp/AuthErrAlert/AuthErrAlert';
import AppIcon from '../../components/AppIcon/AppIcon';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    isLoading: false,
  });
  // translation method
  const { t } = useTranslation();
  // dispatch
  const dispatch = useDispatch();
  // get data from redux store
  const { isAuthorized, errMsg, isLoggedIn } = useSelector<AppState, LoginProps>(({ auth }) => ({
    isAuthorized: Boolean(auth.client),
    isLoggedIn: auth.isLogged,
    errMsg: auth.errMsg,
  }));
  // component did mount
  useEffect(() => {
    // stop loading
    if (isAuthorized) setState({ ...state, isLoading: false });
    // LogginClient();
    if (Boolean(errMsg)) setState({ ...state, isLoading: false });
  }, [isAuthorized, errMsg]);
  // handle from change
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  // handle form submition
  const handleSubmition = (e: React.FormEvent) => {
    e.preventDefault();
    // call login api
    dispatch(LoginClient({ email: state.email, password: state.password }));
    // make loading spinner
    setState({ ...state, isLoading: true });
  };
  // handleLogin
  const handleLoginWithGoogle = (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleOauthData = googleData as GoogleLoginResponse;
    // send the tokenId to api to handle SignUpWithGoogle
    // dispatch(LoginWithGoogle({ googleTokenId: googleOauthData.tokenId }));
  };
  return (
    <section className={styles.Login}>
      {/* login form */}
      <section className={styles.LoginForm}>
        {/* signUp Link */}
        <form onSubmit={handleSubmition}>
          {/* error message */}
          <AnimatePresence>{isLoggedIn === false ? errMsg ? <AuthErrAlert msg={errMsg} /> : '' : ''}</AnimatePresence>
          {/* logo */}
          <div className={styles.logo}>
            <AppIcon />
            <p className="text-xl">{t('appName')}</p>
          </div>
          {/* form name */}
          <h2 className="text-lg">{t('loginPage.loginToYourAccount')}</h2>
          {/* google login */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
            buttonText={t('loginPage.loginWithGoogleBtnText')}
            onSuccess={handleLoginWithGoogle}
            onFailure={handleLoginWithGoogle}
            cookiePolicy={'single_host_origin'}
            className={styles.googleLogin}
          />
          {/* seperator */}
          <p className={styles.seperator}>{t('loginPage.orDivider')}</p>
          {/* email input field */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('loginPage.emailField')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaRegEnvelope className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="email"
                required
                name="email"
                value={state.email}
                onChange={handleFormInputChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter your email"
              />
            </div>
          </div>
          {/* input field */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('loginPage.passwordField')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaKey className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="password"
                required
                id="password"
                value={state.password}
                name="password"
                onChange={handleFormInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter your password"
              />
            </div>
          </div>
          {/* bottom are */}
          <div className={styles.formFooter}>
            {/* button */}
            <button
              type="submit"
              disabled={state.isLoading}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {state.isLoading ? 'Logged you in ...' : t('loginPage.loginBtn')}
            </button>
            {/* forget password link */}
            <a href="" className={styles.ForgetPassword}>
              {t('loginPage.forgetPassword')}
            </a>
            <Link to="/signup" className={styles.signupLink}>
              {t('loginPage.dontHaveAccount')}
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
          {/* compy rights */}
          <p className={styles.copyRight}>
            <span className="">{t('loginPage.writes')}</span>
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
