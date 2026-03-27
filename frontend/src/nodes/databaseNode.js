// databaseNode.js
// Executes a database query using a provided query input and returns the result set.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [table, setTable]   = useState(data?.table   || '');
  const [operation, setOperation] = useState(data?.operation || 'SELECT');

  return (
    <BaseNode
      id={id}
      title="Database"
      icon="🗄"
      color="#06b6d4"
      inputs={[{ id: 'query', label: 'Query' }]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <div className="node-field">
        <label>Database</label>
        <select value={dbType} onChange={(e) => setDbType(e.target.value)}>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="SQLite">SQLite</option>
          <option value="MongoDB">MongoDB</option>
        </select>
      </div>
      <div className="node-field">
        <label>Table / Collection</label>
        <input
          type="text"
          value={table}
          onChange={(e) => setTable(e.target.value)}
          placeholder="users"
        />
      </div>
      <div className="node-field">
        <label>Operation</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="SELECT">SELECT</option>
          <option value="INSERT">INSERT</option>
          <option value="UPDATE">UPDATE</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
