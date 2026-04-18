// components/Navbar.js
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'Início' },
    { href: '/futebol', label: 'Futebol' },
    { href: '/basquete', label: 'Basquete' },
    { href: '/jogadores', label: 'Jogadores' },
  ]

  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.logo}>PLACAR 24</Link>

      {/* Desktop */}
      <div style={styles.links}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              ...styles.link,
              ...(router.pathname === l.href ? styles.linkActive : {}),
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button style={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    background: '#0A0A0F',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    borderBottom: '1px solid #1e1e2e',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '28px',
    color: '#F5C842',
    letterSpacing: '3px',
  },
  links: {
    display: 'flex',
    gap: '28px',
  },
  link: {
    color: '#888',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.15s',
  },
  linkActive: {
    color: '#fff',
  },
  burger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'absolute',
    top: '56px',
    left: 0,
    right: 0,
    background: '#0A0A0F',
    borderBottom: '1px solid #1e1e2e',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 1.5rem',
    gap: '16px',
  },
  mobileLink: {
    color: '#e2e2e2',
    fontSize: '16px',
    fontWeight: '500',
  },
}
