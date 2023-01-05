import styles from "./styles.module.css";
import Sidebar from "./Sidebar/Sidebar";
import "../src/fonts/cismu/cismu.css";
import Player from "./Player/Player";
import Topbar from "./Topbar/Topbar";
import React from "react";
import "./globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let classes = `${styles["grid-areas"]} grid h-full w-full grid-cols-main grid-rows-main gap-0`;
  return (
    <html lang="en">
      <body>
        <>
          <div className={classes}>
            <div className={styles["grid-areas-content"]}>
              <Topbar />
            </div>
            <div className={styles["grid-areas-sidebar"]}>
              <Sidebar />
            </div>
            {/* <div className={styles["grid-areas-content"]}>{children}</div> */}
            <div className={styles["grid-areas-player"]}>
              <Player />
            </div>
          </div>
        </>
      </body>
    </html>
  );
}
