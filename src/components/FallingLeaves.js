import React from 'react';
import './FallingLeaves.css';

const leaves = [
  { left: '10%', delay: '0s', duration: '8s' },
  { left: '25%', delay: '2s', duration: '10s' },
  { left: '40%', delay: '1s', duration: '9s' },
  { left: '60%', delay: '3s', duration: '11s' },
  { left: '75%', delay: '0.5s', duration: '8.5s' },
  { left: '85%', delay: '1.5s', duration: '12s' },
];

function FallingLeaves() {
  return (
    <div className="falling-leaves-container">
      {leaves.map((leaf, idx) => (
        <div
          key={idx}
          className="leaf"
          style={{
            left: leaf.left,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        />
      ))}
    </div>
  );
}

export default FallingLeaves; 