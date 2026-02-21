import styles from './TopBar.module.css';

const TABS = ['colors', 'type', 'components', 'effects', 'presets'];

export default function TopBar({ activeTab, setActiveTab, onRandomize, onReset, onExport, exportLabel }) {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>Studio</div>

      <div className={styles.center}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`${styles.tabPill} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.btn} onClick={onRandomize}>⚄ Randomize</button>
        <button className={styles.btn} onClick={onReset}>↺ Reset</button>
        <button className={`${styles.btn} ${styles.primary}`} onClick={onExport}>{exportLabel}</button>
      </div>
    </div>
  );
}
