import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer
} from "recharts";

import "./App.css";
import radarData from "./data/ipl_radar_data.json";

function App() {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  useEffect(() => {
    const keys = Object.keys(radarData);
    if (keys.length === 0) return;

    const metricKeys = Object.keys(radarData[keys[0]]);
    setPlayers(keys);
    setMetrics(metricKeys);
  }, []);

  useEffect(() => {
    if (!player1 || !player2 || player1 === player2) {
      setData([]);
      return;
    }

    const combined = metrics.map(metric => {
      return {
        metric,
        [player1]: radarData[player1][metric],
        [player2]: radarData[player2][metric]
      };
    });

    setData(combined);
  }, [player1, player2, metrics]);

  return (
    <div style={{ backgroundColor: "#0e0e0e", minHeight: "100vh", color: "#fff", padding: 24 }}>
      <h2 style={{ color: "#ccc" }}>IPL Radar Chart (Per 10 Ball Metrics)</h2>

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10 }}>
          Player 1:
          <select
            value={player1}
            onChange={e => setPlayer1(e.target.value)}
            style={{ marginLeft: 8, padding: 4 }}
          >
            <option value="">Select Player 1</option>
            {players.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          Player 2:
          <select
            value={player2}
            onChange={e => setPlayer2(e.target.value)}
            style={{ marginLeft: 8, padding: 4 }}
          >
            <option value="">Select Player 2</option>
            {players.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      {data.length === 0 ? (
        <p style={{ color: "#aaa" }}>Please select two different players to compare.</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <RadarChart outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#ccc" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#888" }} />
            <Radar
              name={player1}
              dataKey={player1}
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.5}
            />
            <Radar
              name={player2}
              dataKey={player2}
              stroke="#ff4d4f"
              fill="#ff4d4f"
              fillOpacity={0.5}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default App;
