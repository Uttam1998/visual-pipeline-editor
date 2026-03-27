// outputNode.js
// Represents a pipeline output sink. Accepts a single input handle (value).

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="←"
      color="#f59e0b"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[]}
    >
      <div className="node-field">
        <label>Name</label>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};