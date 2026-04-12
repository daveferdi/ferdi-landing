import PainObject from './PainObject'

export default function PainProtoPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#EEF3F8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '700px',
        height: '500px',
        position: 'relative',
      }}>
        <PainObject />
      </div>
    </div>
  )
}
