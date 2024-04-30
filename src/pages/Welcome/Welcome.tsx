import React from 'react';
import styles from './Welcome.module.scss';
import { Route } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

const Welcome = () => {
  return (
    <section className={styles.Welcome}>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </section>
  );
};

export default Welcome;
