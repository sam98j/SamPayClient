import React, { useEffect, useRef, useState } from 'react';
import styles from './signup.module.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaRegEnvelope, FaRegUserCircle, FaKey, FaRegImage } from 'react-icons/fa';
import { SignUpProps, SignUpState } from './interface';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, signUpWithGoogle } from '../../apis/auth';
import { AppState } from '../../types/interfaces/store';
import { useHistory } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import VectorArt from '../../assets/vectors/Transactional-SMS.svg';
import AuthErrAlert from './AuthErrAlert/AuthErrAlert';
import { AnimatePresence } from 'framer-motion';
import AppIcon from '../../components/AppIcon/AppIcon';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  // react router hooks
  const { push } = useHistory();
  // translation method
  const { t } = useTranslation();
  // Componet State
  const [state, setState] = useState<SignUpState>({
    username: '',
    password: '',
    email: '',
    isLoading: false,
  });
  // form ref
  const formRef = useRef<HTMLFormElement>(null);
  // dispatch
  const dispatch = useDispatch();
  // map a pace of app state to component props
  const { isAuthorized, errMsg, isLoggedIn } = useSelector<AppState, SignUpProps>(({ auth }) => ({
    isAuthorized: Boolean(auth.client),
    errMsg: auth.errMsg,
    isLoggedIn: auth.isLogged,
  }));
  // stop loading when user is logged in
  useEffect(() => {
    // stop loading
    if (isAuthorized) setState({ ...state, isLoading: false });
    // LogginClient();
    if (Boolean(errMsg)) setState({ ...state, isLoading: false });
  }, [isAuthorized, errMsg]);
  // push user to dashboard when he is logged in
  useEffect(() => {
    return function cleanUp() {
      push('/dashboard');
    };
  }, []);
  // handle from change
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  // handle form submition
  const handleSubmition = async (e: React.FormEvent) => {
    e.preventDefault();
    // check for empty fields
    const formData = new FormData(formRef.current!);
    // dispatch signUp action
    dispatch(signUp(formData));
    // set loading state to true
    setState({ ...state, isLoading: true });
  };
  // handleLogin
  const handleSignUpWithGoogle = (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleOauthData = googleData as GoogleLoginResponse;
    // send the tokenId to api to handle SignUpWithGoogle
    // dispatch(signUpWithGoogle({ googleTokenId: googleOauthData.tokenId }));
  };
  return (
    <section className={styles.signUp}>
      {/* signUp form */}
      <section className={styles.signUpForm}>
        <form onSubmit={handleSubmition} ref={formRef}>
          {/* error message */}
          <AnimatePresence>{isLoggedIn === false ? errMsg ? <AuthErrAlert msg={errMsg} /> : '' : ''}</AnimatePresence>
          {/* logo */}
          <div className={`${styles.logo} flex items-center text-xl justify-center gap-3`}>
            <AppIcon />
            <p>{t('appName')}</p>
          </div>
          {/* form name */}
          <h2>{t('signUpPage.createNewAccount')}</h2>
          {/* google login */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
            buttonText={t('signUpPage.signUpWithGoogleBtnText')}
            onSuccess={handleSignUpWithGoogle}
            onFailure={handleSignUpWithGoogle}
            cookiePolicy={'single_host_origin'}
            className={styles.googleLogin}
          />
          {/* seperator */}
          <p className={styles.seperator}>{t('signUpPage.orDivider')}</p>
          {/* email input field */}
          <div className={styles.inputArea}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('signUpPage.emailField')}
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
          {/* usrname input field */}
          <div className={styles.inputArea}>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('signUpPage.userNameField')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaRegUserCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                required
                name="username"
                id="username"
                value={state.username}
                onChange={handleFormInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter your username"
              />
            </div>
          </div>
          {/* password input field */}
          <div className={styles.inputArea}>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('signUpPage.passwordField')}
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
          {/* profile image input field */}
          <div className={styles.inputArea}>
            <label htmlFor="profile_img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('signUpPage.chooseYourProfileImg')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaRegImage className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="file"
                id="profile_img"
                name="profile_img"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              {state.isLoading ? 'Signing Up...' : t('signUpPage.signUpBtn')}
            </button>
            {/* <button type="submit">{state.isLoading ? <TransLoading /> : 'Sign Up'}</button> */}
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
          <p className={`${styles.copyRight} text-gray-500 text-xs`}>{t('signUpPage.writes')}</p>
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
