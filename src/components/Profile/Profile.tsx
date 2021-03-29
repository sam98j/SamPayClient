import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ProfileRoute_Props } from "./profile.interface";
import { SignOut } from "../../store/actions/auth/creators";
import styles from "./Profile.module.scss";
import { SetCurrentRoute } from "../../store/actions/data/creators";

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
      dispatch(SetCurrentRoute(routeName)),
    signout_client: () => dispatch(SignOut()),
  };
};

export default connect(null, mapDispatch)(Profile);
