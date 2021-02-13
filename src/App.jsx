import React, { lazy, Suspense } from 'react';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import Loader from './components/Loader';

import './styles.css';

const debaunce = () =>
  // for suspense view
  new Promise((resolve) => {
    const timerId = setTimeout(() => {
      resolve();
      clearTimeout(timerId);
    }, 0);
  });

const Table = lazy(async () => {
  const result = await Promise.all([
    import('./components/table/Table'),
    debaunce(),
  ]);
  return result[0];
});

export default function App() {
  // console.log('render App');

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<div>ooooooooooooooooooooooooooooooo</div>}>
          <Table errorMessage="err appears here" />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
