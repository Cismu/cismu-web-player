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
  return (
    <html lang="en">
      <body>
        <>
          <div
            className={`${styles["grid-areas"]} grid h-full w-full grid-cols-main grid-rows-main gap-0`}
          >

            <div className={styles["grid-areas-player"]}>
              <Player />
            </div>
          </div>
        </>
      </body>
    </html>
  );
}

/* <div className={styles["grid-areas-topbar"]}>
<Topbar />
</div>
<div className={styles["grid-areas-sidebar"]}>
<Sidebar />
</div>
<div className={styles["grid-areas-content"]}>{children}</div> */