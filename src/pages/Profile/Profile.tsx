import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SignOut } from '../../apis/auth';
import styles from './Profile.module.scss';
import { SetCurrentRoute } from '../../apis/system';
import { Route, useHistory } from 'react-router-dom';
import Settings from './Settings/Settings';
import AccountDetails from './AccountDetails/AccountDetails';
import Liabilites from './Liabilites/Liabilites';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { Link } from 'react-router-dom';

const Profile = () => {
  // use dispatch
  const dispatch = useDispatch();
  // redirect the user
  const { push } = useHistory();
  // sign out the user
  const signOut = (): void => {
    // dispatch an action to the redux store
    dispatch(SignOut());
  };
  // when component mount
  useEffect(() => {
    // dispatch an action to redux store
    dispatch(SetCurrentRoute('Profile'));
  }, []);
  // component did update
  useEffect(() => {
    return () => {
      // check if the user is logged in
      push('/');
    };
  }, []);
  // return template
  return (
    <div className={styles.Profile}>
      {/* container */}
      <div className={styles.container}>
        {/* header */}
        <div className={styles.header}></div>
        {/* side bar */}
        <div className={styles.sideBar}>
          <div className={styles.user}>
            <span className={styles.avatar}></span>
            <p>User Name here</p>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/profile/personal_details">Personal Details</Link>
            </li>
            <li>
              <Link to="/profile/settings">Settings</Link>
            </li>
            <li>
              <Link to="/profile/account_details">Account Details</Link>
            </li>
            <li>
              <Link to="/profile/liabilites">Liabilites</Link>
            </li>
          </ul>
        </div>
        {/* main area */}
        <div className={styles.mainArea}>
          <Route path="/profile/settings" component={Settings} />
          <Route path="/profile/account_details" component={AccountDetails} />
          <Route path="/profile/liabilites" component={Liabilites} />
          <Route path="/profile/personal_details" component={PersonalDetails} />
        </div>
      </div>
      <button className={styles.SignOut_Btn} onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
