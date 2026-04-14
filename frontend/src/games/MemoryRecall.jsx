import React, { useState, useEffect } from 'react';

const MemoryRecall = () => {
  const colors = ['#6C63FF', '#00D4AA', '#FF6B6B', '#FFB347'];
  
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const nextRound = () => {
    setPlayerSequence([]);
    const nextColorIndex = Math.floor(Math.random() * colors.length);
    setSequence(prev => [...prev, nextColorIndex]);
    setIsShowingSequence(true);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLives(3);
    setSequence([]);
    setGameOver(false);
    setMessage('');
    setTimeout(() => nextRound(), 500);
  };

  useEffect(() => {
    if (isShowingSequence && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < sequence.length) {
          setActiveColor(sequence[i]);
          setTimeout(() => setActiveColor(null), 500); 
          i++;
        } else {
          clearInterval(interval);
          setIsShowingSequence(false);
        }
      }, 800); 
      return () => clearInterval(interval);
    }
  }, [isShowingSequence, sequence]);

  const handleColorClick = (index) => {
    if (!isPlaying || isShowingSequence || gameOver) return;

    setActiveColor(index);
    setTimeout(() => setActiveColor(null), 300);

    const matchIndex = playerSequence.length;
    if (sequence[matchIndex] === index) {
      const newPlayerSeq = [...playerSequence, index];
      setPlayerSequence(newPlayerSeq);

      if (newPlayerSeq.length === sequence.length) {
        setScore(score + 10);
        setMessage('Correct! Next level...');
        setIsShowingSequence(true);
        setTimeout(() => {
          setMessage('');
          nextRound();
        }, 1000);
      }
    } else {
      setLives(prev => prev - 1);
      if (lives - 1 <= 0) {
        setGameOver(true);
        setIsPlaying(false);
        setMessage(`Game Over. Final Score: ${score}`);
      } else {
        setMessage('Wrong! Watch again...');
        setIsShowingSequence(true);
        setTimeout(() => {
          setMessage('');
          setPlayerSequence([]);
          setIsShowingSequence(true);
        }, 1500);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="heading-glow mb-4">Memory Recall</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem' }}>Score: <strong style={{ color: 'var(--colorPrimary)' }}>{score}</strong></div>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem' }}>Lives: <strong style={{ color: 'var(--colorDanger)' }}>{lives}</strong></div>
      </div>

      <div style={{ height: '30px', marginBottom: '1rem', color: 'var(--colorWarning)', fontWeight: 600 }}>
        {message}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '400px', margin: '0 auto', marginBottom: '3rem' }}>
        {colors.map((color, index) => (
          <div 
            key={index}
            onClick={() => handleColorClick(index)}
            style={{
               height: '150px',
               backgroundColor: color,
               borderRadius: '16px',
               opacity: activeColor === index ? 1 : 0.4,
               transform: activeColor === index ? 'scale(0.95)' : 'scale(1)',
               cursor: (!isPlaying || isShowingSequence) ? 'default' : 'pointer',
               transition: 'all 0.1s ease',
               boxShadow: activeColor === index ? `0 0 30px ${color}` : 'none'
            }}
          />
        ))}
      </div>

      {!isPlaying && (
        <div className="animate-fade-in">
          {gameOver && <p className="mb-3 text-secondary">Session Saved!</p>}
          <button className="btn-primary pulse-glow" onClick={startGame} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            {gameOver ? 'Play Again' : 'Start Sequence'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryRecall;
