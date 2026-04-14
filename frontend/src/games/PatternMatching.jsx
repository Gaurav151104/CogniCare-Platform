import React, { useState, useEffect } from 'react';

const PatternMatching = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const generatePattern = () => {
    const grid = Array(9).fill(1).map(() => Math.floor(Math.random() * 3) + 1);
    const missingIndex = Math.floor(Math.random() * 9);
    const answer = grid[missingIndex];
    grid[missingIndex] = null;
    
    const options = [answer];
    while (options.length < 4) {
      const rand = Math.floor(Math.random() * 3) + 1;
      if (!options.includes(rand)) options.push(rand);
      if(options.length < 4) options.push(Math.floor(Math.random() * 3) + 1); 
    }
    options.sort(() => Math.random() - 0.5);
    
    return { grid, missingIndex, answer, options };
  };

  const [currentPattern, setCurrentPattern] = useState(null);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setRound(1);
    setErrors(0);
    setTimeLeft(30);
    setGameOver(false);
    setCurrentPattern(generatePattern());
  };

  useEffect(() => {
    let timer;
    if (isPlaying && !gameOver && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameOver, timeLeft]);

  const endGame = () => {
    setGameOver(true);
    setIsPlaying(false);
  };

  const handleOptionClick = (opt) => {
    if (!isPlaying || gameOver) return;
    
    if (opt === currentPattern.answer) {
      setScore(score + 20);
    } else {
      setErrors(errors + 1);
    }

    if (round < 10) {
      setRound(round + 1);
      setCurrentPattern(generatePattern());
    } else {
      endGame();
    }
  };

  const renderCell = (val, isOption = false) => {
    const colors = {1: 'var(--colorPrimary)', 2: 'var(--colorSecondary)', 3: 'var(--colorWarning)'};
    if (val === null) return <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px dashed var(--colorBorder)', borderRadius: '8px', height: '100%' }} />;
    return <div style={{ background: colors[val], borderRadius: '8px', height: '100%', opacity: isOption ? 0.8 : 1, transition: 'all 0.2s', cursor: isOption ? 'pointer' : 'default' }} onMouseEnter={e => isOption && (e.currentTarget.style.opacity = 1)} onMouseLeave={e => isOption && (e.currentTarget.style.opacity = 0.8)} />
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="heading-glow mb-4">Pattern Matching</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', flex: 1, margin: '0 0.5rem' }}>Round <strong style={{ color: 'var(--colorPrimary)' }}>{round}/10</strong></div>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', flex: 1, margin: '0 0.5rem' }}>Time <strong style={{ color: timeLeft < 10 ? 'var(--colorDanger)' : 'var(--colorSuccess)' }}>00:{timeLeft.toString().padStart(2, '0')}</strong></div>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', flex: 1, margin: '0 0.5rem' }}>Score <strong style={{ color: 'var(--colorPrimary)' }}>{score}</strong></div>
      </div>

      {isPlaying && currentPattern ? (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '300px', height: '300px', margin: '0 auto 3rem', background: 'var(--colorCardBg)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--colorBorder)' }}>
            {currentPattern.grid.map((cell, idx) => (
              <div key={idx}>{renderCell(cell)}</div>
            ))}
          </div>
          
          <h3 className="mb-3">Select the missing piece</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {currentPattern.options.map((opt, idx) => (
              <div key={idx} style={{ width: '80px', height: '80px' }} onClick={() => handleOptionClick(opt)}>
                {renderCell(opt, true)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ marginTop: '4rem' }}>
          {gameOver && (
            <div className="mb-4 text-secondary">
               <h3>Session Completed</h3>
               <p>Final Score: {score}</p>
               <p>Accuracy: {Math.round(((10 - errors) / 10) * 100)}%</p>
            </div>
          )}
          <button className="btn-primary pulse-glow" onClick={startGame} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PatternMatching;
