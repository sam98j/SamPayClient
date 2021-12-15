import React, { useEffect } from "react";
import { SetCurrentRoute } from "../../apis/system";
import { connect } from "react-redux";

const Support = (props: { setCurrentRoute: any }) => {
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Support");
  }, []);
  return <div className="">Support</div>;
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(SetCurrentRoute(routeName)),
  };
};

export default connect(null, mapDispatch)(Support);
