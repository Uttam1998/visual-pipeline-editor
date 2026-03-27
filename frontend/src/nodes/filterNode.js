// filterNode.js
// Conditionally routes data along two branches (true / false) based on a condition expression.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="⚡"
      color="#ef4444"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[
        { id: 'true',  label: 'True'  },
        { id: 'false', label: 'False' },
      ]}
    >
      <div className="node-field">
        <label>Condition</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
        />
      </div>
      <div className="node-output-labels">
        <span className="output-label-tag true-tag">True ↗</span>
        <span className="output-label-tag false-tag">False ↘</span>
      </div>
    </BaseNode>
  );
};
