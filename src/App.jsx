import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Loader from './components/Loader';
import './styles.css';

const debaunce = () =>
  // for suspense view demonstration
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

function App() {
  // console.log('App');

  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Table />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
