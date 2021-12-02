import React from 'react'
import './index.css'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

const BarDetails = props => {
  const {barDetails} = props
  const {newDate, confirmed, stateCode} = barDetails

  return (
    <div>
      <div className="all-bars-container">
        <BarChart width={150} height={400} data={barDetails} fill="#9A0E31">
          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey={newDate} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={confirmed} fill="#9A0E31" className="bar" />
        </BarChart>
      </div>
    </div>
  )
}
export default BarDetails
