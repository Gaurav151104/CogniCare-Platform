import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Target, Clock, Volume2 } from 'lucide-react';

const mockTrendData = [
  { day: 'Mon', accuracy: 85, response: 1.2, errors: 2 },
  { day: 'Tue', accuracy: 82, response: 1.3, errors: 3 },
  { day: 'Wed', accuracy: 78, response: 1.5, errors: 4 },
  { day: 'Thu', accuracy: 80, response: 1.4, errors: 3 },
  { day: 'Fri', accuracy: 76, response: 1.6, errors: 5 },
  { day: 'Sat', accuracy: 74, response: 1.8, errors: 6 },
  { day: 'Sun', accuracy: 72, response: 1.9, errors: 7 },
];

const mockGameData = [
  { name: 'Memory', score: 65, average: 75 },
  { name: 'Pattern', score: 80, average: 70 },
  { name: 'Reaction', score: 55, average: 65 },
];

const mockVoiceHistory = [
  { id: 1, date: 'Today', status: 'Moderate Risk', conf: '68%', score: 42 },
  { id: 2, date: '3 days ago', status: 'Low Risk', conf: '75%', score: 30 },
  { id: 3, date: '1 week ago', status: 'Control', conf: '88%', score: 15 },
];

const Dashboard = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Overview Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/games" className="btn-primary">Play Game</Link>
          <Link to="/voice" className="btn-secondary">Record Voice</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 3fr', gap: '2rem', '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } }}>
          {/* Risk Score Card */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <h3 className="text-secondary mb-3">Cognitive Status Score</h3>
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'conic-gradient(var(--colorWarning) 42%, rgba(255,255,255,0.05) 0)' }}>
              <div style={{ position: 'absolute', width: '180px', height: '180px', background: 'var(--colorCardBg)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                <span style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--colorWarning)' }}>42</span>
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Moderate Risk</span>
              </div>
              <div className="pulse-glow" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%' }}></div>
            </div>
            <p className="text-secondary text-center" style={{ fontSize: '0.9rem', marginTop: '1.5rem' }}>
              Score derived from game heuristics over 7 days.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0, 212, 170, 0.1)', borderRadius: '12px' }}>
                <Target size={32} color="var(--colorSecondary)" />
              </div>
              <div>
                <p className="text-secondary mb-1">Avg Accuracy</p>
                <h2 style={{ margin: 0, fontSize: '2.2rem' }}>74%</h2>
              </div>
            </div>
            
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '12px' }}>
                <Clock size={32} color="var(--colorWarning)" />
              </div>
              <div>
                <p className="text-secondary mb-1">Response Time</p>
                <h2 style={{ margin: 0, fontSize: '2.2rem' }}>1.8s</h2>
              </div>
            </div>

            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '12px' }}>
                <Activity size={32} color="var(--colorPrimary)" />
              </div>
              <div>
                <p className="text-secondary mb-1">Total Sessions</p>
                <h2 style={{ margin: 0, fontSize: '2.2rem' }}>12</h2>
              </div>
            </div>

            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255, 107, 107, 0.1)', borderRadius: '12px' }}>
                <Volume2 size={32} color="var(--colorDanger)" />
              </div>
              <div>
                <p className="text-secondary mb-1">Voice Tests</p>
                <h2 style={{ margin: 0, fontSize: '2.2rem' }}>3</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 2fr) 1fr', gap: '2rem' }}>
        {/* Charts */}
        <div className="glass-panel">
          <h3 className="mb-4">7-Day Performance Trend</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="var(--colorTextSecondary)" />
                <YAxis stroke="var(--colorTextSecondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--colorCardBg)', border: '1px solid var(--colorBorder)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="accuracy" stroke="var(--colorSecondary)" strokeWidth={3} name="Accuracy %" />
                <Line type="monotone" dataKey="errors" stroke="var(--colorDanger)" strokeWidth={3} name="Error Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <h3 className="mb-4" style={{ marginTop: '3rem' }}>Game Performance Overview</h3>
          <div style={{ width: '100%', height: '250px' }}>
             <ResponsiveContainer>
              <BarChart data={mockGameData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--colorTextSecondary)" />
                <YAxis stroke="var(--colorTextSecondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--colorCardBg)', border: '1px solid var(--colorBorder)', borderRadius: '8px' }} />
                <Bar dataKey="score" fill="var(--colorPrimary)" radius={[4, 4, 0, 0]} name="Your Score" />
                <Bar dataKey="average" fill="var(--colorTextSecondary)" radius={[4, 4, 0, 0]} name="Age Avg" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Voice history side panel */}
        <div className="glass-panel" style={{ alignSelf: 'start' }}>
          <h3 className="mb-4">Voice Test History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockVoiceHistory.map(item => (
              <div key={item.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--colorBorder)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{item.date}</span>
                  <span style={{ color: item.score > 40 ? 'var(--colorWarning)' : 'var(--colorSecondary)', fontWeight: 600 }}>Score: {item.score}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span className="text-secondary">{item.status}</span>
                  <span className="text-secondary">Conf: {item.conf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
