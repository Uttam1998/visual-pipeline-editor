// slackNode.js
// Sends a message to a Slack channel. Accepts a message input and outputs a delivery status.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SlackNode = ({ id, data }) => {
  const [channel,  setChannel]  = useState(data?.channel  || '#general');
  const [notifType, setNotifType] = useState(data?.notifType || 'Message');

  return (
    <BaseNode
      id={id}
      title="Slack"
      icon="💬"
      color="#22c55e"
      inputs={[{ id: 'message', label: 'Message' }]}
      outputs={[{ id: 'status', label: 'Status' }]}
    >
      <div className="node-field">
        <label>Channel</label>
        <input
          type="text"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          placeholder="#general"
        />
      </div>
      <div className="node-field">
        <label>Notification Type</label>
        <select value={notifType} onChange={(e) => setNotifType(e.target.value)}>
          <option value="Message">Message</option>
          <option value="Alert">Alert</option>
          <option value="Digest">Digest</option>
        </select>
      </div>
    </BaseNode>
  );
};
