'use client'

import { useEffect, useRef, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart ({ data, options }) {

    const chartRef = useRef(null)
    const [chartSize, setChartSize] = useState({ width: 400, height: 200 })

    useEffect(()=>{
        const chartNode = chartRef.current;

        const resizeObserver = new ResizeObserver((entries) => {
        const [entry] = entries;
        const { width, height } = entry.contentRect;
        setChartSize({ width, height });
        });

        resizeObserver.observe(chartNode);

        return () => {
        resizeObserver.disconnect();
        };
    }, [])

    return (
            <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
                <Line data={data} options={options} width={chartSize.width} height={chartSize.height} />
            </div>
        )
}