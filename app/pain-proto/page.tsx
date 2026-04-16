'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import OptionA from './OptionA'
import OptionB from './OptionB'
import OptionC from './OptionC'

function ProtoContent() {
  const params = useSearchParams();
  const show = params.get('show'); // ?show=a, ?show=b, ?show=c, or null=all

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontWeight: 600 as const,
    color: '#0D3E7A',
    marginBottom: '12px',
    letterSpacing: '0.04em',
  };

  const frameStyle = {
    width: '100%',
    aspectRatio: '700 / 550',
    position: 'relative' as const,
    background: '#EEF3F8',
    borderRadius: '12px',
    border: '1px solid rgba(6,30,68,0.06)',
    overflow: 'hidden' as const,
  };

  const showA = !show || show === 'a';
  const showB = !show || show === 'b';
  const showC = !show || show === 'c';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#EEF3F8',
      padding: '40px 20px',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        color: '#6B7B8D',
        marginBottom: '40px',
      }}>
        Pain Object — 3 Directions {show ? `(${show.toUpperCase()} only)` : ''}
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {showA && (
          <div>
            <p style={labelStyle}>A — The Monolith</p>
            <div style={frameStyle}><OptionA /></div>
          </div>
        )}

        {showB && (
          <div>
            <p style={labelStyle}>B — The Mass</p>
            <div style={frameStyle}><OptionB /></div>
          </div>
        )}

        {showC && (
          <div>
            <p style={labelStyle}>C — The Cage</p>
            <div style={frameStyle}><OptionC /></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PainProtoPage() {
  return (
    <Suspense>
      <ProtoContent />
    </Suspense>
  );
}
