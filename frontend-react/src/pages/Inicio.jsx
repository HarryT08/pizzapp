import React from 'react'
import LinesCharts from '../components/charts/LinesCharts';
import LineChart from '../components/charts/LineChart';

import TableInicio from '../components/tables/TableInicio';

const Inicio = () => {

  return (
    <div className=' p-3 flex flex-wrap justify-center gap-10 w-full'>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl w-[20rem] 2xl:w-[42rem] md:w-[30rem]'>
        <LineChart/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl 2xl:w-[42rem] md:w-[30rem]'>
        <LinesCharts/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl w-[20rem] 2xl:w-[43rem] md:w-[40rem]'>
        <TableInicio/>
      </div>
    </div>
  )
}

export default Inicio