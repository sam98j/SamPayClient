import React, { useEffect } from "react";
import { SetCurrentRoute } from "../../apis/system";
import { connect } from "react-redux";

const Reports = (props: { setCurrentRoute: any }) => {
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Reports");
  }, []);
  return (
    <div className="">
      <form action="/" method="POST">
        <input type="text" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(SetCurrentRoute(routeName)),
  };
};

export default connect(null, mapDispatch)(Reports);
