import ColorsTab from './tabs/ColorsTab.jsx';
import TypeTab from './tabs/TypeTab.jsx';
import ComponentsTab from './tabs/ComponentsTab.jsx';
import EffectsTab from './tabs/EffectsTab.jsx';
import PresetsTab from './tabs/PresetsTab.jsx';

const panelStyle = {
  background: 'var(--ui-surface)',
  borderRight: '1px solid var(--ui-border)',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--ui-border) transparent',
};

export default function Panel({ S, update, activeTab, applyPalette, applyPreset }) {
  return (
    <div className=" lg:block hidden" style={panelStyle}>
      {activeTab === "colors" && (
        <ColorsTab S={S} update={update} applyPalette={applyPalette} />
      )}
      {activeTab === "type" && <TypeTab S={S} update={update} />}
      {activeTab === "components" && <ComponentsTab S={S} update={update} />}
      {activeTab === "effects" && <EffectsTab S={S} update={update} />}
      {activeTab === "presets" && (
        <PresetsTab S={S} applyPreset={applyPreset} />
      )}
    </div>
  );
}
