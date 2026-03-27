// App.js
// Root component. Lays out the header, sidebar toolbar, canvas, and submit bar.

import { PipelineToolbar } from './toolbar';
import { PipelineUI }      from './ui';
import { SubmitButton }    from './submit';

function App() {
  return (
    <div className="app-container">
      {/* ── Top header ── */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">V</div>
          <span className="app-logo-text">VectorShift</span>
          <span className="app-logo-badge">Pipeline Builder</span>
        </div>
      </header>

      {/* ── Sidebar + canvas ── */}
      <div className="main-content">
        <PipelineToolbar />
        <PipelineUI />
      </div>

      {/* ── Submit / analysis bar ── */}
      <SubmitButton />
    </div>
  );
}

export default App;
