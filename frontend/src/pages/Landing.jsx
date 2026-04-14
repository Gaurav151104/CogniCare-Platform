import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '6rem' }}>
        <h1 className="heading-glow" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Detect Early Signs of Dementia <br />
          <span className="gradient-text">Through Cognitive Games</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
          A clinically-inspired, AI-driven platform for tracking cognitive health over time. 
          Engaging games, seamless daily tracking, and proactive insights.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Get Started
          </Link>
          <a href="#how-it-works" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Learn More
          </a>
        </div>
      </div>

      {/* Features Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem', textAlign: 'left' }}>
        <div className="glass-panel" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
          <div style={{ padding: '1rem', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
            <Brain size={32} color="var(--colorPrimary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Memory Recall</h3>
          <p className="text-secondary">Evaluate short-term memory through engaging sequence reproduction challenges designed by experts.</p>
        </div>

        <div className="glass-panel" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
          <div style={{ padding: '1rem', background: 'rgba(0, 212, 170, 0.1)', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
            <Activity size={32} color="var(--colorSecondary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pattern Matching</h3>
          <p className="text-secondary">Test executive function and logical spatial reasoning with progressive visual puzzles.</p>
        </div>

        <div className="glass-panel" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
          <div style={{ padding: '1rem', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
            <Zap size={32} color="var(--colorWarning)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Reaction Time</h3>
          <p className="text-secondary">Measure attention, reflex speed, and processing time under pressure to spot early cognitive decline.</p>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: '4rem', borderRadius: '24px', border: '1px solid var(--colorBorder)' }}>
        <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '3rem', opacity: '0.5' }}>01</h1>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Play Daily</h4>
            <p className="text-secondary">Spend 5-10 minutes each day navigating personalized cognitive games.</p>
          </div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '3rem', opacity: '0.5' }}>02</h1>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Track Metrics</h4>
            <p className="text-secondary">Our systems automatically monitor your accuracy, response times, and error curves.</p>
          </div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '3rem', opacity: '0.5' }}>03</h1>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Detect Trends</h4>
            <p className="text-secondary">Receive actionable insights and early warning alerts via your personal dashboard.</p>
          </div>
        </div>
      </div>
      
      <footer style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--colorBorder)', color: 'var(--colorTextSecondary)' }}>
        <p>&copy; 2026 CogniCare AI Platform. Medical test application meant for demonstration.</p>
      </footer>
    </div>
  );
};

export default Landing;
