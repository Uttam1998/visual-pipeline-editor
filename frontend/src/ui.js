// ui.js
// The ReactFlow canvas. Registers all node types, handles drag-and-drop onto the canvas,
// and wires up store-driven node/edge state management.

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }    from './nodes/inputNode';
import { OutputNode }   from './nodes/outputNode';
import { LLMNode }      from './nodes/llmNode';
import { TextNode }     from './nodes/textNode';
import { FilterNode }   from './nodes/filterNode';
import { PromptNode }   from './nodes/promptNode';
import { DatabaseNode } from './nodes/databaseNode';
import { WebhookNode }  from './nodes/webhookNode';
import { SlackNode }    from './nodes/slackNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register every node type so ReactFlow can render them
const nodeTypes = {
  customInput:  InputNode,
  customOutput: OutputNode,
  llm:          LLMNode,
  text:         TextNode,
  filter:       FilterNode,
  prompt:       PromptNode,
  database:     DatabaseNode,
  webhook:      WebhookNode,
  slack:        SlackNode,
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes, edges,
    getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const bounds   = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID  = getNodeID(type);
      addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="canvas-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#1e2333" gap={gridSize} size={1} />
        <Controls />
        <MiniMap nodeColor={() => '#6366f1'} />
      </ReactFlow>
    </div>
  );
};
