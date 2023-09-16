import React, { FC } from "react";
import styles from "./styles.module.scss";
import { IconContext } from "react-icons";
import {
  IoIosCard,
  IoIosCog,
  IoIosContacts,
  IoIosAnalytics,
} from "react-icons/io";
import { useSelector } from "react-redux";
import { AppState } from "../../../types/interfaces/store";
import { Link } from "react-router-dom";
import ThemeToggler from "../../ThemeToggler/ThemeToggler";
import { Devices } from "../../../types/enums/system";
import ProfileBtn from "../../ProfileBtn/ProfileBtn";
import { PagesNames } from "../../../types/enums/locales/PagesNames";
// @ts-ignore
import { t } from "i18next";
import { SideBarLinksStrings } from "../Locales/interface";

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
              <IoIosCog />
            </IconContext.Provider>
            <span>
              {t(`${PagesNames.SIDEBARLINKS}.${SideBarLinksStrings.DASHBOARD}`)}
            </span>
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
              <IoIosAnalytics />
            </IconContext.Provider>
            <span>
              {t(`${PagesNames.SIDEBARLINKS}.${SideBarLinksStrings.REPORTS}`)}
            </span>
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
              <IoIosCard />
            </IconContext.Provider>
            <span>
              {t(`${PagesNames.SIDEBARLINKS}.${SideBarLinksStrings.CARDS}`)}
            </span>
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
            <span>
              {t(`${PagesNames.SIDEBARLINKS}.${SideBarLinksStrings.SUPPORT}`)}
            </span>
          </Link>
        </li>
      </ul>
      {/* menu tools */}
      <div className={styles.menutools}>
        {/* Profile Btn */}
        {device === Devices.MOBILE ? <ProfileBtn /> : ""}
        {/* ThemeToggler */}
        {/* show theme toggler with navLinks on mobile */}
        {device === Devices.MOBILE ? (
          <div className={styles.nightModeContainer}>
            <span>Night Mode</span> <ThemeToggler />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavLinks;
