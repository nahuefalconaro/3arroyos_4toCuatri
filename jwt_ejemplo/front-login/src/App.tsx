import { useState, FormEvent } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('john')
  const [password, setPassword] = useState('changeme')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        const errMsg = (data && (data.message || data.error)) || res.statusText || 'Login failed'
        setMessage(`Error: ${errMsg}`)
      } else {
        setMessage('Login exitoso')
        const token = data?.access_token || data?.token || (data ? JSON.stringify(data) : null)
        if (token) {
          const ts = typeof token === 'string' ? token : JSON.stringify(token)
          setToken(ts)
          console.log("Token recibido", token);
          try { localStorage.setItem('token', ts) } catch {}
        }
      }
    } catch (err: any) {
      setMessage(`Error de red: ${err?.message || String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto', padding: 20, border: '1px solid #eee', borderRadius: 8, fontFamily: 'system-ui, sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
          {loading ? 'Enviando...' : 'Iniciar sesión'}
        </button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      {token && (
        <div style={{ marginTop: 12 }}>
          <strong>Token guardado:</strong>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: 6 }}>{token}</pre>
        </div>
      )}
    </div>
  )
}

export default App
