import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SetCurrentRoute } from "../../apis/system";
import { ClientCard } from "../ClientCard/ClientCard";

const Cards = (props: { setCurrentRoute: any }) => {
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Cards");
  }, []);
  return (
    <div className="">
      <ClientCard />
    </div>
  );
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(SetCurrentRoute(routeName)),
  };
};

export default connect(null, mapDispatch)(Cards);
