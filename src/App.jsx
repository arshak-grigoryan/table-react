import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Loader from './components/Loader';
// import Table from './components/table/Table';
import './styles.css';

const debaunce = () =>
  // for suspense view demonstration
  new Promise((resolve) => {
    const timerId = setTimeout(() => {
      resolve();
      clearTimeout(timerId);
    }, 1000);
  });

const Table = lazy(async () => {
  const result = await Promise.all([
    import('./components/table/Table'),
    debaunce(),
  ]);
  return result[0];
});

function App() {
  // console.log('render App');

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<div>Component Crashed!</div>}>
          <Table errorMessage="err appears here" />
        </ErrorBoundary>
      </Suspense>
      {/* <ErrorBoundary fallback={<div>Component Crashed!</div>}>
        <Suspense fallback={<Loader />}>
          <Table errorMessage="err appears here" />
        </Suspense>
      </ErrorBoundary> */}
    </div>
  );
}

export default App;
