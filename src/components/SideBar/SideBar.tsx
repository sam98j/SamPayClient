import React from "react";
import styles from "./SideBar.module.scss";
import AppName from "../AppName/AppName";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  BsCreditCard,
  RiDashboardLine,
  IoIosContacts,
  IoMdAnalytics,
  IoIosArrowForward,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { AppState } from "../../types/interfaces/store";

const SideBar = () => {
  const { currentRoute } = useSelector<AppState, any>((state) => ({
    currentRoute: state.system.currentRoute,
  }));
  return (
    <aside className={styles.SideBar}>
      <AppName />
      <ul>
        <li
          style={{
            borderLeftColor:
              currentRoute === "DashBoard" ? "blue" : "transparent",
          }}
        >
          <Link
            to="/dashboard"
            style={{
              color: currentRoute === "DashBoard" ? "blue" : "gray",
            }}
          >
            <IconContext.Provider
              value={{
                color: currentRoute === "DashBoard" ? "blue" : "gray",
                size: "20px",
              }}
            >
              <RiDashboardLine />
            </IconContext.Provider>
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          style={{
            borderLeftColor:
              currentRoute === "Reports" ? "blue" : "transparent",
          }}
        >
          <Link
            to="/reports"
            style={{ color: currentRoute === "Reports" ? "blue" : "gray" }}
          >
            <IconContext.Provider
              value={{
                color: currentRoute === "Reports" ? "blue" : "gray",
                size: "20px",
              }}
            >
              <IoMdAnalytics />
            </IconContext.Provider>
            <span>Reports</span>
          </Link>
        </li>
        <li
          style={{
            borderLeftColor: currentRoute === "Cards" ? "blue" : "transparent",
          }}
        >
          <Link
            to="/cards"
            style={{ color: currentRoute === "Cards" ? "blue" : "gray" }}
          >
            <IconContext.Provider
              value={{
                color: currentRoute === "Cards" ? "blue" : "gray",
                size: "20px",
              }}
            >
              <BsCreditCard />
            </IconContext.Provider>
            <span>Cards</span>
          </Link>
        </li>
        <li
          style={{
            borderLeftColor:
              currentRoute === "Support" ? "blue" : "transparent",
          }}
        >
          <Link
            to="/support"
            style={{ color: currentRoute === "Support" ? "blue" : "gray" }}
          >
            <IconContext.Provider
              value={{
                color: currentRoute === "Support" ? "blue" : "gray",
                size: "20px",
              }}
            >
              <IoIosContacts />
            </IconContext.Provider>
            <span>Support</span>
          </Link>
        </li>
      </ul>
      <Link to="/profile">
        <div className={styles.profile}>
          <div className={styles.img}></div>
          <h4>
            <span>Hossam Alden</span>
            <IconContext.Provider value={{ color: "gray" }}>
              <IoIosArrowForward />
            </IconContext.Provider>
          </h4>
        </div>
      </Link>
    </aside>
  );
};

export default SideBar;
