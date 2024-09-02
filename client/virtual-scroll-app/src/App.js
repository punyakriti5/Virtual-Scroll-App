import React, { Suspense, lazy } from 'react';
import './App.css';
const VirtualScroll = lazy(() => import('./VirtualScroll'));

function App() {
  return (
    <>
     <div className="App">
      <h1>Virtual Scrolling Demo</h1>
      <Suspense fallback={<div>Loading Items...</div>}>
        <VirtualScroll />
      </Suspense>
    </div>
    </>
  );
}

export default App;
