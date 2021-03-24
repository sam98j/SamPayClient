import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ProfileRoute_Props } from "./profile.interface";
import { AuthActions } from "../../store/actions/auth.actions";
import styles from "./Profile.module.scss";
import { DataActions } from "../../store/actions/data.actions";

const Profile = (props: ProfileRoute_Props) => {
  const SignOut = (): void => {
    const { signout_client } = props;
    signout_client();
    console.log("sign out");
  };

  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Profile");
  }, []);
  return (
    <div className={styles.Profile}>
      <button className={styles.SignOut_Btn} onClick={SignOut}>
        Sign Out
      </button>
    </div>
  );
};

const mapDispatch = (dispatch: Function): ProfileRoute_Props => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(DataActions.SetCurrentRoute(routeName)),
    signout_client: () => dispatch(AuthActions.SignOut()),
  };
};

export default connect(null, mapDispatch)(Profile);
