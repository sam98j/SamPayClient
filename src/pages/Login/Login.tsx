import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import LoginNav from "../../components/LoginNav/LoginNav";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/all";
import { LoginState, LoginProps } from "./login.interface";
import { useDispatch, useSelector } from "react-redux";
import { LoginClient } from "../../apis/auth";
import { AppState } from "../../types/interfaces/store";

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
      <LoginNav />
      <section className={styles.MainArea}>
        <section className={styles.LoginForm}>
          <h2>Login To Your Account !!</h2>
          <form onSubmit={handleSubmition}>
            <section>
              <label htmlFor="">E-mail</label>
              <input
                type="text"
                onChange={handleChange}
                value={state.clientCredentioal!.name!}
                name="name"
              />
            </section>
            <section>
              <label htmlFor="">Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={state.clientCredentioal!.password}
              />
            </section>
            <button
              type="submit"
              style={{
                backgroundColor: state.isLoading ? "dodgerblue" : "blue",
              }}
            >
              {state.isLoading ? "authentacting" : "Login"}
            </button>
          </form>
          <a href="" className={styles.ForgetPassword}>
            Forget Password
          </a>
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
        <section className={styles.VectorsArea}>
          <img src="" alt="" />
        </section>
      </section>
    </section>
  );
};

export default Login;
