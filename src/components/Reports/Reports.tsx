import React, { useEffect } from "react";
import { DataActions } from "../../store/actions/data.actions";
import { connect } from "react-redux";

const Reports = (props: {setCurrentRoute: any}) => {
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Reports");
  }, []);
  return <div className="">Reports</div>;
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(DataActions.SetCurrentRoute(routeName)),
  };
};

export default connect(null, mapDispatch)(Reports);
