// BaseNode.js
// Core reusable abstraction for all pipeline nodes.
// Accepts config for title, icon, accent color, input/output handles, and children for body content.

import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon,
  color = '#6366f1',
  inputs = [],   // [{ id: string, label?: string }]
  outputs = [],  // [{ id: string, label?: string }]
  children,
  style: extraStyle = {},
}) => {
  // Distribute handles evenly along the node height
  const getHandleTop = (arr, idx) =>
    arr.length === 1 ? '50%' : `${(idx + 1) * 100 / (arr.length + 1)}%`;

  return (
    <div
      className="base-node"
      style={{ '--node-accent': color, ...extraStyle }}
    >
      {/* Input handles on left side */}
      {inputs.map((handle, idx) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{ top: getHandleTop(inputs, idx) }}
          title={handle.label || handle.id}
        />
      ))}

      {/* Node header: icon + title */}
      <div className="node-header">
        <span className="node-icon">{icon}</span>
        <span className="node-title">{title}</span>
      </div>

      {/* Node body: passed as children by each specific node */}
      <div className="node-body">
        {children}
      </div>

      {/* Output handles on right side */}
      {outputs.map((handle, idx) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: getHandleTop(outputs, idx) }}
          title={handle.label || handle.id}
        />
      ))}
    </div>
  );
};
