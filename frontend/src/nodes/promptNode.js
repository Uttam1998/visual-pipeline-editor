// promptNode.js
// Builds a structured prompt from a template and optional context input.
// Outputs the formatted prompt string for use by an LLM node.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const PromptNode = ({ id, data }) => {
  const [role, setRole] = useState(data?.role || 'user');
  const [template, setTemplate] = useState(data?.template || '');

  return (
    <BaseNode
      id={id}
      title="Prompt Template"
      icon="✏"
      color="#ec4899"
      inputs={[{ id: 'context', label: 'Context' }]}
      outputs={[{ id: 'prompt', label: 'Prompt' }]}
    >
      <div className="node-field">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="system">System</option>
          <option value="assistant">Assistant</option>
        </select>
      </div>
      <div className="node-field">
        <label>Template</label>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Write your prompt template..."
          rows={3}
        />
      </div>
    </BaseNode>
  );
};
