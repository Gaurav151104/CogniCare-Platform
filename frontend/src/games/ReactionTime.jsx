import React, { useState, useEffect, useRef } from 'react';

const ReactionTime = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState('idle');
  const [round, setRound] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  
  const timeoutRef = useRef(null);

  const startRound = () => {
    setGameState('waiting');
    const delay = Math.floor(Math.random() * 3000) + 1500; 
    
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const startGame = () => {
    setIsPlaying(true);
    setRound(1);
    setReactionTimes([]);
    setGameOver(false);
    startRound();
  };

  const handleClick = () => {
    if (gameState === 'idle') return;

    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setGameState('early');
    } else if (gameState === 'ready') {
      const rt = Date.now() - startTime;
      const newTimes = [...reactionTimes, rt];
      setReactionTimes(newTimes);
      
      if (round < 10) {
        setRound(round + 1);
        startRound();
      } else {
        setGameOver(true);
        setIsPlaying(false);
        setGameState('idle');
      }
    } else if (gameState === 'early') {
      startRound(); 
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  let displayColor = 'var(--colorCardBg)';
  let displayText = 'Click to Start';
  
  if (gameState === 'waiting') {
    displayColor = 'var(--colorDanger)';
    displayText = 'Wait for green...';
  } else if (gameState === 'ready') {
    displayColor = 'var(--colorSuccess)';
    displayText = 'CLICK!';
  } else if (gameState === 'early') {
    displayColor = 'var(--colorWarning)';
    displayText = 'Too early! Click to try again.';
  }

  const avgTime = reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a,b)=>a+b,0)/reactionTimes.length) : 0;
  const bestTime = reactionTimes.length > 0 ? Math.min(...reactionTimes) : 0;
  const worstTime = reactionTimes.length > 0 ? Math.max(...reactionTimes) : 0;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="heading-glow mb-4">Reaction Time</h1>
      
      {isPlaying && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', color: 'var(--colorTextSecondary)' }}>
          Round {round} / 10
        </div>
      )}

      <div 
        onClick={isPlaying ? handleClick : startGame}
        style={{ 
          width: '100%', 
          height: '400px', 
          backgroundColor: isPlaying ? displayColor : 'var(--colorCardBg)',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '2px solid var(--colorBorder)',
          boxShadow: gameState === 'ready' ? '0 0 50px rgba(0, 212, 170, 0.4)' : 'none',
          transition: 'background-color 0.1s',
          userSelect: 'none'
        }}
      >
        <h2 style={{ fontSize: '2.5rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {!isPlaying && !gameOver ? 'Start Test' : displayText}
        </h2>
      </div>

      {gameOver && (
        <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
          <h3 className="mb-3 text-secondary">Session Complete</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <p className="text-secondary mb-1">Average</p>
              <h3>{avgTime}ms</h3>
            </div>
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <p className="text-secondary mb-1">Best</p>
              <h3 style={{ color: 'var(--colorSuccess)' }}>{bestTime}ms</h3>
            </div>
             <div className="glass-panel" style={{ padding: '1rem' }}>
              <p className="text-secondary mb-1">Worst</p>
              <h3 style={{ color: 'var(--colorDanger)' }}>{worstTime}ms</h3>
            </div>
          </div>
          <button className="btn-primary pulse-glow mt-4" style={{ marginTop: '2rem' }} onClick={startGame}>
            Try Again
          </button>
        </div>
      )}

      {reactionTimes.length > 0 && !gameOver && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {reactionTimes.map((rt, i) => (
             <span key={i} style={{ padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.9rem' }}>
               {rt}ms
             </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default ReactionTime;
