import React, { lazy, Suspense } from "react";

import Loading from './components/loading/Loading';

import "./styles.css";

const debaunce = () => {
  return new Promise((resolve) =>{
    const timerId = setTimeout(() => {
      resolve()
      clearTimeout(timerId)
    }, 1000)
  })
}

const Table = lazy(async () => {
  const result = await Promise.all([import('./components/table/Table'), debaunce()])
  return result[0]
})


export default function App() {

  console.log('render App')
  
  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <Table />        
      </Suspense>
    </div>
  );
}
