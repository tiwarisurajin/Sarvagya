import { Outlet } from 'react-router-dom'
import { colors } from '../../styles/tokens'

export default function AuthShell() {
  return (
    <div style={{
      minHeight: '100vh',
      background: colors.cream,
      fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient green glow — top right and bottom left */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 75% 15%, ${colors.mint}20 0%, transparent 55%),
          radial-gradient(ellipse at 15% 85%, ${colors.sage}14 0%, transparent 50%)
        `,
      }} />

      {/* Page renders here — Login, Register, Onboarding */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420 }}>
        <Outlet />
      </div>
    </div>
  )
}
