// draggableNode.js
// A single draggable item in the sidebar toolbar.
// Props:
//   type  — the ReactFlow node type string (used as dataTransfer payload)
//   label — display name shown in the sidebar
//   icon  — emoji or short text shown in the colored icon box
//   color — accent color matching the node's left-border color

export const DraggableNode = ({ type, label, icon, color = '#6366f1' }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      draggable
      onDragStart={onDragStart}
    >
      <div
        className="draggable-node-icon"
        style={{ background: `${color}22`, color }}
      >
        {icon}
      </div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
