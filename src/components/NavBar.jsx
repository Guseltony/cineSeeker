import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Trending', path: '/trending' },
    { name: 'Genres', path: '/genres' },

  ]
  return (
    <div className='hidden lg:block'>
      <nav className='flex-center space-x-16'>
        {
          links.map((link) => (
            <NavLink to={link.path} key={link.name} className={({isActive}) => isActive ? 'text-sm font-extrabold uppercase tracking-widest' : 'text-xs font-extrabold uppercase tracking-widest'} style={({ isActive }) => ({
              color: isActive ? 'var(--color-primary-hover)' : 'var(--color-secondary-hover)',
              borderBottom: isActive ? '2px solid var(--color-secondary-hover)' : 'none'
            })}>
              {link.name}
            </NavLink>
          ))
        }
      </nav>
    </div>
  )
}
