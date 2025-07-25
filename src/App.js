import React, { useState } from 'react';
import Select from 'react-select';
import RadarChartComponent from './RadarChartComponent';
import playerData from './playerData.json';

const App = () => {
  const playerOptions = Object.keys(playerData).map(player => ({
    value: player,
    label: player,
  }));

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleChange = selected => {
    setSelectedPlayers(selected || []);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>CricRadar</h1>
      <div style={{ width: '300px', margin: '20px auto' }}>
        <Select
          options={playerOptions}
          isMulti
          onChange={handleChange}
          placeholder="Search for a player..."
        />
      </div>
      <RadarChartComponent selectedPlayers={selectedPlayers.map(p => p.value)} />
    </div>
  );
};

export default App;
