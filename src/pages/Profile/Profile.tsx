import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SignOut } from "../../apis/auth";
import styles from "./Profile.module.scss";
import { SetCurrentRoute } from "../../apis/system";
import { useHistory } from "react-router";

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
    dispatch(SetCurrentRoute("Profile"));
  }, []);
  // component did update
  useEffect(() => {
    return () => {
      // check if the user is logged in
      push("/");
    };
  }, []);
  // return template
  return (
    <div className={styles.Profile}>
      <button className={styles.SignOut_Btn} onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
