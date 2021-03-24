import React, { useEffect } from "react";
import { DataActions } from "../../store/actions/data.actions";
import { connect } from "react-redux";

const Support = (props: {setCurrentRoute: any}) => {
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Support");
  }, []);
  return <div className="">Support</div>;
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(DataActions.SetCurrentRoute(routeName)),
  };
};

export default connect(null, mapDispatch)(Support);
