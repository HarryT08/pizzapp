import React from 'react'
import LineChart from '../components/charts/LineChart';
import LineCharts from '../components/charts/LineCharts';
import TableInicio from '../components/tables/TableInicio';

const Inicio = () => {

  return (
    <div className='p-3 flex flex-wrap justify-center gap-10 w-full'>
      <div className='bg-white rounded-lg drop-shadow-3xl w-[60rem] 2xl:w-[40rem] lg:w-[60rem]'>
        <LineChart/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl w-[60rem] 2xl:w-[40rem] lg:w-[60rem]'>
        <LineCharts/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl '>
        <TableInicio/>
      </div>
    </div>
  )
}

export default Inicio