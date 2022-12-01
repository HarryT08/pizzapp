import React from 'react'
import LineChart from '../components/charts/LineChart';
import LineCharts from '../components/charts/LineCharts';
import TableInicio from '../components/tables/TableInicio';

const Inicio = () => {

  return (
    <div className='p-3 flex flex-wrap justify-center gap-10 w-full'>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl w-full portatil:w-[30rem] portatilL:w-[44rem]'>
        <LineChart/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl w-full portatil:w-[30rem] portatilL:w-[44rem]'>
        <LineCharts/>
      </div>
      <div className='p-3 bg-white rounded-lg drop-shadow-3xl w-[16.5rem] movilM:w-[20rem] movilL:w-[25rem] tableta:w-full portatil:w-[42.5rem]'>
        <TableInicio/>
      </div>
    </div>
  )
}

export default Inicio