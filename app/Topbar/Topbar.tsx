import styles from "./styles.module.css";

export default function Topbar() {
  return (
    <div className={styles["topbar"]}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex-1">
          <input type="text" />
        </div>
        <div>
          <button>Notification</button>
          <button>Account</button>
        </div>
      </div>
    </div>
  );
}
