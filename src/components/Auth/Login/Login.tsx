import React, { Component } from "react";
import styles from "./Login.module.scss";
import LoginNav from "../../templates/LoginNav/LoginNav";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/all";
import { ClientCredentioal } from "../../../Interfaces/Auth";
import {LoginComponentProps, LoginComponentState} from "./login.interface";
import { connect } from "react-redux";
import { LoginClient, LoggingClient } from "../../../store/actions/auth/creators";
import { AppState } from "../../../Interfaces/Store";

class Login extends Component<
  LoginComponentProps,
  LoginComponentState,
  Function
> {
  state: LoginComponentState = {
    clientCredentioal: {
      name: "",
      password: "",
    },
    isLoading: false,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      clientCredentioal: {
        ...this.state.clientCredentioal,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmition = (e: React.FormEvent): void => {
    e.preventDefault();
    if (
      this.state.clientCredentioal.name &&
      this.state.clientCredentioal.password
    ) {
      const { LoginClient } = this.props;
      LoginClient(this.state.clientCredentioal);
      this.setState({
        ...this.state,
        isLoading: true,
      });
    }
  };

  componentDidUpdate(prevProps: LoginComponentProps) {
    if (prevProps.isAuthorized !== this.props.isAuthorized) {
      const { isAuthorized, LogginClient } = this.props;
      if (isAuthorized) {
        this.setState({
          ...this.state,
          isLoading: false,
        });
        LogginClient();
      }
    }
  }
  render() {
    return (
      <section className={styles.Login}>
        <LoginNav />
        <section className={styles.MainArea}>
          <section className={styles.LoginForm}>
            <h2>Login To Your Account !!</h2>
            <form onSubmit={this.handleSubmition}>
              <section>
                <label htmlFor="">E-mail</label>
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.clientCredentioal.name}
                  name="name"
                />
              </section>
              <section>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.clientCredentioal.password}
                />
              </section>
              <button
                type="submit"
                style={{
                  backgroundColor: this.state.isLoading ? "dodgerblue" : "blue",
                }}
              >
                {this.state.isLoading ? "authentacting" : "Login"}
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
  }
}

const mapDispatch = (dispatch: Function) => {
  return {
    LoginClient: (ClientCredentioal: ClientCredentioal) =>
      dispatch(LoginClient(ClientCredentioal)),
    LogginClient: () => dispatch(LoggingClient()),
  };
};

const mapState = (state: AppState) => {
  return {
    isAuthorized: Boolean(state.Auth.client),
  };
};

export default connect(mapState, mapDispatch)(Login);
