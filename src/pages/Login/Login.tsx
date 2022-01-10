import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import LoginNav from "../../components/LoginNav/LoginNav";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/all";
import { LoginState, LoginProps } from "./login.interface";
import { useDispatch, useSelector } from "react-redux";
import { LoginClient } from "../../apis/auth";
import { AppState } from "../../types/interfaces/store";
import vectorsImg from "../../assets/vectors/bgOne.jpg";
import TransLoading from "../../components/TransLoading/TransLoading";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState<LoginState>({
    clientCredentioal: {
      name: "",
      password: "",
    },
    isLoading: false,
  });
  // dispatch
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector<AppState, LoginProps>(({ auth }) => ({
    isAuthorized: Boolean(auth.client),
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
  }, [isAuthorized]);
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
    if (state.clientCredentioal!.name && state.clientCredentioal!.password) {
      dispatch(LoginClient(state.clientCredentioal!));
      setState({
        ...state,
        isLoading: true,
      });
    }
  };
  return (
    <section className={styles.Login}>
      {/* login form */}
      <section className={styles.LoginForm}>
        <h2>Login To Your Account !!</h2>
        <form onSubmit={handleSubmition}>
          {/* input field */}
          <section>
            <label htmlFor="">E-mail</label>
            <input
              type="text"
              onChange={handleChange}
              value={state.clientCredentioal!.name!}
              name="name"
            />
          </section>
          {/* input field */}
          <section>
            <label htmlFor="">Password</label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={state.clientCredentioal!.password}
            />
          </section>
          {/* bottom are */}
          <section className={styles.bottomArea}>
            {/* button */}
            <button type="submit">
              {state.isLoading ? <TransLoading /> : "Login"}
            </button>
            {/* forget password link */}
            <a href="" className={styles.ForgetPassword}>
              Forget Password
            </a>
            <Link to="/signup" className={styles.signupLink}>
              Don't have an account signup
            </Link>
          </section>
        </form>
        {/* social media links */}
        <section className={styles.SocialMedia}>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaTwitter />
          </a>
          <a href="">
            <FaFacebook />
          </a>
        </section>
      </section>
      {/* vecotr */}
      <section className={styles.VectorsArea}>
        <img src={vectorsImg} alt="" />
      </section>
    </section>
  );
};

export default Login;
