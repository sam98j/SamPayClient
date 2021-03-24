import React, { Component, ChangeEvent, FormEvent } from "react";
import styles from "./SignUp.module.scss";
import {
  State,
  Props,
} from "./signup.interface";
import { connect } from "react-redux";

class SignUp extends Component<Props> {
  state: State = {
    Data: {
      name: "",
      password: "",
    },
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      Data: {
        ...this.state.Data,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { SignUpClient } = this.props;
    SignUpClient(this.state.Data);
  };

  render() {
    return (
      <section className={styles.SignUp}>
        <form onSubmit={this.handleSubmit} className={styles.Form}>
          <section className={styles.NameSection}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.Data.name}
              onChange={this.handleChange}
            />
          </section>
          <section className={styles.PasswordSection}>
            <label htmlFor="">Password</label>
            <input
              type="text"
              name="password"
              value={this.state.Data.password}
              onChange={this.handleChange}
            />
          </section>
          <section className={styles.ButtonSection}>
            <button type="submit">SignUp</button>
          </section>
        </form>
      </section>
    );
  }
}

const mapDispatch = (dispatch: Function) => {
  return {};
};

export default connect(null, mapDispatch)(SignUp);
