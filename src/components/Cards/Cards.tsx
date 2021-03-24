import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DataActions } from "../../store/actions/data.actions";

const Cards = (props: {setCurrentRoute: any}) => {
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Cards");
  }, []);
  return <div className="">cards</div>;
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(DataActions.SetCurrentRoute(routeName)),
  };
};

export default connect(null, mapDispatch)(Cards);
