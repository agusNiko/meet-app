import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function EventGenre({ events }) {
  //  const data = [
  //     { name: "Group A", value: 100 },
  //     { name: "Group B", value: 300 },
  //     { name: "Group C", value: 300 },
  //     { name: "Group D", value: 200 },
  //   ];

  const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const getData = () => {
    const data = [];
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
      data.push({ name: genre, value: genresAndCounts[genre] });
    });
    return data;
  };
  const data = getData();
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        // label={a}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
