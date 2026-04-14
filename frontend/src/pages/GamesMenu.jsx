import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Zap } from 'lucide-react';

const GamesMenu = () => {
  const games = [
    {
      id: 'memory',
      title: 'Memory Recall',
      desc: 'Remember and repeat the growing sequence of colors.',
      icon: <Brain size={40} color="var(--colorPrimary)" />,
      path: '/games/memory',
      color: 'rgba(108, 99, 255, 0.1)',
      difficulty: 'Medium'
    },
    {
      id: 'pattern',
      title: 'Pattern Matching',
      desc: 'Find the missing logical segment in the 3x3 grid.',
      icon: <Activity size={40} color="var(--colorSecondary)" />,
      path: '/games/pattern',
      color: 'rgba(0, 212, 170, 0.1)',
      difficulty: 'Hard'
    },
    {
      id: 'reaction',
      title: 'Reaction Time',
      desc: 'Click as fast as you can when the color changes to green.',
      icon: <Zap size={40} color="var(--colorWarning)" />,
      path: '/games/reaction',
      color: 'rgba(255, 179, 71, 0.1)',
      difficulty: 'Easy'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="heading-glow">Cognitive Games Library</h1>
        <p className="text-secondary" style={{ fontSize: '1.2rem' }}>Engage your brain with scientifically designed constraints.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {games.map(game => (
          <div key={game.id} className="glass-panel" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(108, 99, 255, 0.2)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'none';
                 e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
               }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1.2rem', background: game.color, borderRadius: '16px' }}>
                {game.icon}
              </div>
              <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                {game.difficulty}
              </span>
            </div>

            <h2 style={{ marginBottom: '0.5rem' }}>{game.title}</h2>
            <p className="text-secondary" style={{ marginBottom: '2rem', flex: 1 }}>{game.desc}</p>
            
            <Link to={game.path} className="btn-primary text-center" style={{ width: '100%' }}>
              Play Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesMenu;
