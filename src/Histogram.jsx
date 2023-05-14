import React from 'react';
import "./App.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Histogram({ data }) {
  return (
    <div className="histogram-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="word" />
          <YAxis dataKey="frequency" />
          <Tooltip />
          <Bar dataKey="frequency" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
}

export default Histogram;
