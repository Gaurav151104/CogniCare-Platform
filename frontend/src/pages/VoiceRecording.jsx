import React, { useState, useEffect } from 'react';
import { Mic, Square, Play, Loader2 } from 'lucide-react';

const VoiceRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setAudioUrl('mock-audio-ready');
    } else {
      setIsRecording(true);
      setTime(0);
      setAudioUrl(null);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({ prediction: 'Control', confidence: '68%', score: 32 });
    }, 2500);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="heading-glow mb-2">Voice Analysis Module</h1>
      <p className="text-secondary mb-4">Please detail everything you see happening in the picture below.</p>
      
      <div className="glass-panel" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--colorCardBg)' }}>
        <div style={{ width: '100%', height: '350px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px dashed var(--colorBorder)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
           <span className="text-secondary mb-2">[Cookie Theft Scene Placeholder]</span>
           <span className="text-secondary" style={{ fontSize: '0.8rem' }}>(Boy on stool, mother washing dishes, water spilling)</span>
        </div>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 600, color: isRecording ? 'var(--colorDanger)' : 'var(--colorTextPrimary)', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(time)}
          </div>
          
          <button 
            onClick={handleRecordToggle}
            style={{ 
              width: '80px', height: '80px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: isRecording ? 'rgba(255, 107, 107, 0.2)' : 'rgba(108, 99, 255, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isRecording ? '0 0 20px rgba(255, 107, 107, 0.6)' : 'none',
              transition: 'all 0.3s'
            }}>
            {isRecording ? <Square size={32} color="var(--colorDanger)" /> : <Mic size={32} color="var(--colorPrimary)" />}
          </button>
        </div>

        {audioUrl && !analyzing && !result && (
          <div className="animate-fade-in" style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', alignItems: 'center', marginBottom: '1rem' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--colorSuccess)', cursor: 'pointer' }}><Play size={24} /></button>
              <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '100%', background: 'var(--colorSuccess)', borderRadius: '2px' }}></div>
              </div>
              <span className="text-secondary" style={{ fontSize: '0.9rem' }}>{formatTime(time)}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={handleAnalyze}>
              Analyze Audio
            </button>
          </div>
        )}

        {analyzing && (
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--colorPrimary)' }}>
             <Loader2 size={40} className="pulse-glow" style={{ animation: 'spin 2s linear infinite' }} />
             <span>Running mock ML pipeline...</span>
           </div>
        )}

        {result && (
          <div className="animate-fade-in" style={{ width: '100%', padding: '1.5rem', background: 'rgba(0, 212, 170, 0.1)', border: '1px solid var(--colorSecondary)', borderRadius: '12px', textAlign: 'left' }}>
            <h3 className="mb-3" style={{ color: 'var(--colorSecondary)' }}>Analysis Results</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-secondary">Prediction:</span>
              <span style={{ fontWeight: 600 }}>{result.prediction}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-secondary">Confidence:</span>
              <span style={{ fontWeight: 600 }}>{result.confidence}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
              <span className="text-secondary">Voice Risk Score:</span>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--colorSuccess)' }}>{result.score}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(160, 160, 192, 0.6)' }}>
              Disclaimer: This is a mocked analysis simulating model output. Not for clinical use.
            </p>
          </div>
        )}

      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default VoiceRecording;
