import styles from "./TopBar.module.css";

const TABS = ["colors", "type", "components", "effects", "presets"];

export default function TopBar({
  activeTab,
  setActiveTab,
  onRandomize,
  onReset,
  onExport,
  exportLabel,
  burgerOpen,
  setBurgerOpen,
}) {
  return (
    <>
      {/* Desktop version - unchanged */}
      <div className={`lg:flex hidden ${styles.topbar}`}>
        <div className={styles.logo}>Studio</div>

        <div className={styles.center}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabPill} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onRandomize}>
            ⚄ Randomize
          </button>
          <button className={styles.btn} onClick={onReset}>
            ↺ Reset
          </button>
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={onExport}
          >
            {exportLabel}
          </button>
        </div>
      </div>

      {/* Mobile version - only added smooth animation */}
      <div className="w-full flex flex-col justify-center items-center lg:hidden p-4 gap-4">
        <div>
          <button
            className={styles.logo}
            onClick={() => setBurgerOpen(!burgerOpen)}
          >
            {burgerOpen ? (
              <div>✕ Close</div>
            ) : (
              <div className="flex items-center gap-2">
                <img src="/burger.svg" className="h-8 invert" alt="" />
                Menu
              </div>
            )}
          </button>
        </div>

        {/* This is the only part that changed – simple fade + slide-down animation */}
        <div
          className={`
            w-full overflow-hidden transition-all duration-300 ease-in-out
            ${burgerOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col p-1 gap-2 pt-2">
            <button className={styles.btn} onClick={onRandomize}>
              ⚄ Randomize
            </button>
            <button className={styles.btn} onClick={onReset}>
              ↺ Reset
            </button>
            <button
              className={`${styles.btn} ${styles.primary}`}
              onClick={onExport}
            >
              {exportLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
