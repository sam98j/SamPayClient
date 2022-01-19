import React, { useEffect } from "react";
import { SetCurrentRoute } from "../../apis/system";
import { connect } from "react-redux";
import styles from "./reports.module.scss";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Reports = (props: { setCurrentRoute: any }) => {
  const data = [
    {
      name: "Jan",
      Expenses: 40,
      Income: 50,
      // amt: 2400,
    },
    {
      name: "Feb",
      Expenses: 30,
      Income: 60,
      // amt: 2210,
    },
    {
      name: "Mar",
      Expenses: 20,
      Income: 98,
      // amt: 2290,
    },
    {
      name: "Apr",
      Expenses: 27,
      Income: 39,
      // amt: 2000,
    },
    {
      name: "May",
      Expenses: 90,
      Income: 480,
      // amt: 2181,
    },
    {
      name: "June",
      Expenses: 23,
      Income: 38,
      // amt: 2500,
    },
    {
      name: "July",
      Expenses: 34,
      Income: 430,
      // amt: 2100,
    },
  ];
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("Reports");
  }, []);
  return (
    <div className={styles.reports}>
      <LineChart
        width={800}
        height={420}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Income" stroke="green" />
        <Line type="monotone" dataKey="Expenses" stroke="red" />
      </LineChart>
      {/* another line chart */}
      <LineChart
        width={800}
        height={420}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Income" stroke="green" />
        {/* <Line type="monotone" dataKey="Expenses" stroke="green" /> */}
      </LineChart>
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
