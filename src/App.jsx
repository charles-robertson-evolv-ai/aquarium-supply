
import React, { useState } from 'react';
import './App.css';
import Tile from './Tile';

const TANK_SIZES = ['Small', 'Medium', 'Large', 'Humongous'];

export default function App() {
  const [tanks, setTanks] = useState([
    { 
      id: 1, 
      tank: { size: 'Small' }, 
      products: [
        { id: 1001, category: 'animals', name: 'Goldfish', price: 15, minTankSize: 'Small' },
        { id: 1002, category: 'scenery', name: 'Small Rock', price: 12, minTankSize: 'Small' }
      ]
    },
    { 
      id: 2, 
      tank: { size: 'Medium' }, 
      products: [
        { id: 2001, category: 'animals', name: 'Angel Fish', price: 65, minTankSize: 'Medium' },
        { id: 2002, category: 'scenery', name: 'Medium Cave', price: 55, minTankSize: 'Medium' },
        { id: 2003, category: 'insurance', name: 'Basic Tank Insurance', price: 50, minTankSize: 'Small' }
      ]
    }
  ]);

  const handleDeleteTank = (tankId) => {
    setTanks(tanks.filter(tank => tank.id !== tankId));
  };

  const handleUpdateTank = (tankId, updatedData) => {
    setTanks(tanks.map(tank => 
      tank.id === tankId ? { ...tank, ...updatedData } : tank
    ));
  };

  const addTank = () => {
    const newId = Math.max(...tanks.map(t => t.id), 0) + 1;
    const randomSize = TANK_SIZES[Math.floor(Math.random() * TANK_SIZES.length)];
    
    setTanks([...tanks, {
      id: newId,
      tank: { size: randomSize },
      products: []
    }]);
  };

  return (
    <main>
      <h1>Aquarium Supply</h1>
      <button onClick={addTank} className="add-tank-button">Add Random Tank</button>
      <div className="tiles-container">
        {tanks.map(tank => (
          <Tile
            key={tank.id}
            id={tank.id}
            tank={tank.tank}
            products={tank.products}
            onDelete={handleDeleteTank}
            onUpdateTank={handleUpdateTank}
          />
        ))}
      </div>
    </main>
  )
}
