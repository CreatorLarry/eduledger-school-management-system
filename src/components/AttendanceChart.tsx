'use client';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle} from 'recharts';

import Image from 'next/image'

// #region Sample data
const data = [
    {
        name: 'Monday',
        present: 90,
        absent: 10,
    },
    {
        name: 'Tuesday',
        present: 92,
        absent: 8,
    },
    {
        name: 'Wednesday',
        present: 95,
        absent: 5,
    },
    {
        name: 'Thursday',
        present: 93,
        absent: 7,
    },
    {
        name: 'Friday',
        present: 89,
        absent: 11,
    },
];


const AttendanceChart = () => {
    return (
        <div className='bg-white rounded-xl h-full p-4'>
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20}/>
            </div>
            <ResponsiveContainer width='100%' height='90%'>
                <BarChart
                    width={500} height={300}
                    data={data}
                    barSize={20}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
                    <XAxis dataKey="name" axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false}/>
                    <YAxis width="auto" axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{borderRadius:'10px', borderColor:'lightgray'}}/>
                    <Legend align="left" verticalAlign="top"
                            wrapperStyle={{paddingTop: '20px', paddingBottom: '40px'}}/>
                    <Bar dataKey="present" fill="#366eb2" activeBar={<Rectangle fill='#366eb2' stroke='blue'/>}
                         radius={[10, 10, 0, 0]}
                         legendType='circle'/>
                    <Bar dataKey="absent" fill="#ffcd05" activeBar={<Rectangle fill='gold' stroke='purple'/>}
                         radius={[10, 10, 0, 0]} legendType='circle'/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default AttendanceChart
