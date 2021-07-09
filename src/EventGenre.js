/* eslint-disable no-use-before-define */
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function EventGenre({ events }) {
  const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const pieChartData = [];
  const genresAndCounts = {};
  genres.forEach((genre) => {
    genresAndCounts[genre] = 0;
  });

  events.forEach((event) => {
    genres.forEach((genre) => {
      if (event.summary.includes(genre)) {
        genresAndCounts[genre]++;
      }
    });
  });

  Object.keys(genresAndCounts).forEach((genre) => {
    pieChartData.push({ name: genre, value: genresAndCounts[genre] });
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
