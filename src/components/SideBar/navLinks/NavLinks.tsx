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
import ThemeToggler from "../../ThemeToggler/ThemeToggler";
import { Devices } from "../../../types/enums/system";
import ProfileBtn from "../../ProfileBtn/ProfileBtn";

const NavLinks: FC<{ isOpened: boolean }> = ({ isOpened }) => {
  const { currentRoute, device } = useSelector<
    AppState,
    { currentRoute: string; device: Devices }
  >(({ system }) => ({
    currentRoute: system.currentRoute,
    device: system.device,
  }));
  return (
    <div className={styles.navLinks} data-menu-open={isOpened}>
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
      {/* menu tools */}
      <div className={styles.menutools}>
        {/* Profile Btn */}
        {device === Devices.MOBILE ? <ProfileBtn /> : ""}
        {/* ThemeToggler */}
        {/* show theme toggler with navLinks on mobile */}
        {device === Devices.MOBILE ? <ThemeToggler /> : ""}
      </div>
    </div>
  );
};

export default NavLinks;
