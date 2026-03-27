// webhookNode.js
// Trigger node: listens for an incoming HTTP webhook and passes the payload downstream.
// No inputs (it's a pipeline source). Outputs the raw request payload.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const WebhookNode = ({ id, data }) => {
  const [path,   setPath]   = useState(data?.path   || '/webhook');
  const [method, setMethod] = useState(data?.method || 'POST');
  const [auth,   setAuth]   = useState(data?.auth   || 'None');

  return (
    <BaseNode
      id={id}
      title="Webhook"
      icon="🔗"
      color="#f97316"
      inputs={[]}
      outputs={[{ id: 'payload', label: 'Payload' }]}
    >
      <div className="node-field">
        <label>Path</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/webhook"
        />
      </div>
      <div className="node-field">
        <label>Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="POST">POST</option>
          <option value="GET">GET</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
      <div className="node-field">
        <label>Auth</label>
        <select value={auth} onChange={(e) => setAuth(e.target.value)}>
          <option value="None">None</option>
          <option value="API Key">API Key</option>
          <option value="Bearer Token">Bearer Token</option>
        </select>
      </div>
    </BaseNode>
  );
};
