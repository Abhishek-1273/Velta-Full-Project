import { createPortal } from 'react-dom'
import { useAuth } from '../../context/AuthContext'
import AuthSwitch from '../ui/auth-switch'

export default function ProtectedPageWrapper({ children }) {
  const { user } = useAuth()

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {!user && createPortal(
        <AuthSwitch isModal={true} />,
        document.body
      )}
    </div>
  )
}
