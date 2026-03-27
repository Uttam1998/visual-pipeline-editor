// toolbar.js
// Left-sidebar panel listing all available node types grouped by category.
// Each item is a DraggableNode that can be dragged onto the canvas.

import { DraggableNode } from './draggableNode';

const CORE_NODES = [
  { type: 'customInput',  label: 'Input',    icon: '→', color: '#10b981' },
  { type: 'customOutput', label: 'Output',   icon: '←', color: '#f59e0b' },
  { type: 'llm',          label: 'LLM',      icon: '⚡', color: '#8b5cf6' },
  { type: 'text',         label: 'Text',     icon: 'T',  color: '#3b82f6' },
];

const INTEGRATION_NODES = [
  { type: 'webhook',  label: 'Webhook',  icon: '🔗', color: '#f97316' },
  { type: 'database', label: 'Database', icon: '🗄', color: '#06b6d4' },
  { type: 'slack',    label: 'Slack',    icon: '💬', color: '#22c55e' },
];

const LOGIC_NODES = [
  { type: 'filter', label: 'Filter',          icon: '⚡', color: '#ef4444' },
  { type: 'prompt', label: 'Prompt Template', icon: '✏', color: '#ec4899' },
];

const NodeGroup = ({ title, nodes }) => (
  <div className="toolbar-section">
    <div className="toolbar-section-label">{title}</div>
    <div className="toolbar-nodes">
      {nodes.map((n) => (
        <DraggableNode key={n.type} {...n} />
      ))}
    </div>
  </div>
);

export const PipelineToolbar = () => (
  <aside className="toolbar-sidebar">
    <NodeGroup title="Core"         nodes={CORE_NODES}        />
    <NodeGroup title="Integrations" nodes={INTEGRATION_NODES} />
    <NodeGroup title="Logic"        nodes={LOGIC_NODES}       />
  </aside>
);
