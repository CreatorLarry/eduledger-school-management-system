'use client';

import {RadialBarChart, RadialBar, Legend, ResponsiveContainer} from 'recharts';

import Image from 'next/image'

// #region Sample data
const data = [
    {
        name: 'Total',
        count: 1478,
        fill: 'white',
    },
    {
        name: 'Boys',
        count: 789,
        fill: '#366eb2',
    },
    {
        name: 'Girls',
        count: 689,
        fill: '#ffcd05',
    },

];

// #endregion
const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};


const CountChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/*TITLE*/}
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20}/>
            </div>
            {/*CHART*/}
            <div className="w-full h-[75%] relative">
                <ResponsiveContainer>
                    <RadialBarChart
                        cy="50%"
                        responsive
                        cx="50%"
                        innerRadius="40%"
                        outerRadius="100%"
                        barSize={32}
                        data={data}
                    >
                        <RadialBar background dataKey="count"/>
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image src='/maleFemale.png' alt='' width={100} height={100} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
            </div>
            {/*BOTTOM*/}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full">
                    </div>
                    <h1 className="font-bold">789</h1>
                    <h2 className="text-xs text-gray-300">Boys (55%)</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaYellow rounded-full">
                    </div>
                    <h1 className="font-bold">689</h1>
                    <h2 className="text-xs text-gray-300">Girls (45%)</h2>
                </div>
            </div>
        </div>
    )
}
export default CountChart
