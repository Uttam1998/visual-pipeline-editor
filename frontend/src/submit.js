// submit.js
// Reads the current pipeline state (nodes + edges) from the Zustand store,
// POSTs it to the backend /pipelines/parse endpoint, and shows the result
// in a styled modal overlay instead of a plain browser alert.

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <div className="submit-area">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Analyzing…' : '▶  Analyze Pipeline'}
        </button>
      </div>

      {/* ── Results modal ── */}
      {result && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <span>📊</span> Pipeline Analysis
            </div>

            <div className="modal-stat">
              <span className="modal-stat-label">Nodes</span>
              <span className="modal-stat-value">{result.num_nodes}</span>
            </div>

            <div className="modal-stat">
              <span className="modal-stat-label">Edges</span>
              <span className="modal-stat-value">{result.num_edges}</span>
            </div>

            <div className="modal-stat">
              <span className="modal-stat-label">Pipeline structure</span>
              <span className={`modal-badge ${result.is_dag ? 'dag' : 'not-dag'}`}>
                {result.is_dag ? '✓ Valid DAG' : '✗ Contains Cycles'}
              </span>
            </div>

            <button className="modal-close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Error modal ── */}
      {error && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <span>⚠️</span> Connection Error
            </div>
            <div className="modal-stat">
              <span className="modal-stat-label">{error}</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>
              Make sure the backend is running:&nbsp;
              <code style={{ color: '#818cf8' }}>uvicorn main:app --reload</code>
            </p>
            <button className="modal-close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
