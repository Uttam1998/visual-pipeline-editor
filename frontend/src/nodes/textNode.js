// textNode.js
// A text template node with two special behaviors:
//   1. Auto-resizes (width + height) as the user types.
//   2. Parses {{variableName}} patterns and creates a left-side Handle for each variable.

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

// Extract unique valid JS variable names wrapped in {{ }}
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

// Approximate node width from longest line of text
const calcWidth = (text) => {
  const lines = text.split('\n');
  const maxLen = Math.max(...lines.map((l) => l.length), 10);
  return Math.min(520, Math.max(240, maxLen * 7.5 + 80));
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const variables = extractVariables(currText);
  const nodeWidth = calcWidth(currText);

  // Auto-expand textarea height whenever text changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const getHandleTop = (arr, idx) =>
    arr.length === 1 ? '50%' : `${(idx + 1) * 100 / (arr.length + 1)}%`;

  return (
    <div
      className="base-node"
      style={{ '--node-accent': '#3b82f6', minWidth: nodeWidth }}
    >
      {/* Dynamic input handles — one per {{variable}} */}
      {variables.map((varName, idx) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: getHandleTop(variables, idx) }}
          title={varName}
        />
      ))}

      <div className="node-header">
        <span className="node-icon">T</span>
        <span className="node-title">Text</span>
      </div>

      <div className="node-body">
        {/* Show detected variable chips */}
        {variables.length > 0 && (
          <div className="var-list">
            {variables.map((v) => (
              <span key={v} className="var-chip">{`{{${v}}}`}</span>
            ))}
          </div>
        )}

        <div className="node-field">
          <label>Content</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            placeholder="Type text... use {{variable}} for dynamic inputs"
            rows={3}
          />
        </div>
      </div>

      {/* Fixed output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
        title="Output"
      />
    </div>
  );
};
