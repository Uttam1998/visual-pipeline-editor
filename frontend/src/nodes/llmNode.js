// llmNode.js
// Represents an LLM (Large Language Model) processing node.
// Accepts two inputs: system prompt and user prompt. Produces one output: model response.

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="⚡"
      color="#8b5cf6"
      inputs={[
        { id: 'system', label: 'System Prompt' },
        { id: 'prompt', label: 'User Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      {/* Connection guide shown inside body */}
      <div className="node-connection-guide">
        <div className="connection-row">
          <span className="connection-dot input-dot" />
          <span className="connection-label">System Prompt</span>
        </div>
        <div className="connection-row">
          <span className="connection-dot input-dot" />
          <span className="connection-label">User Prompt</span>
        </div>
        <div className="connection-divider" />
        <div className="connection-row connection-row-right">
          <span className="connection-label">Response</span>
          <span className="connection-dot output-dot" />
        </div>
      </div>
    </BaseNode>
  );
};