import React, { FC } from "react";
import styles from "./styles.module.scss";
import { IconContext } from "react-icons";
import {
  BsCreditCard,
  RiDashboardLine,
  IoIosContacts,
  IoMdAnalytics,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { AppState } from "../../../types/interfaces/store";
import { Link } from "react-router-dom";

const NavLinks: FC<{ height: string | number }> = ({ height }) => {
  const currentRoute = useSelector<AppState, string>(
    ({ system }) => system.currentRoute
  );
  return (
    <div className={styles.navLinks} style={{ height: `${height}` }}>
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
    </div>
  );
};

export default NavLinks;
