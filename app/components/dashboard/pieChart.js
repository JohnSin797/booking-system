'use client'

import { Pie } from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart ({ data, options }) {
    const chartRef = useRef(null)
    const [chartSize, setChartSize] = useState({ width: 400, height: 200 })
  
    useEffect(() => {
      const chartNode = chartRef.current
  
      const resizeObserver = new ResizeObserver((entries) => {
        const [entry] = entries
        const { width, height } = entry.contentRect
        setChartSize({ width, height })
      });
  
      resizeObserver.observe(chartNode)
  
      return () => {
        resizeObserver.disconnect()
      }
    }, [])
  
    return (
      <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
        <Pie data={data} options={options} width={chartSize.width} height={chartSize.height} />
      </div>
    )
}