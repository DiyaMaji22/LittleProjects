import React from 'react'
import { Background } from './Background'
import { TopBar } from './TopBar'
import { ContentPanel } from './ContentPanel'
import { NavArrow } from './UI/NavArrow'
import MusicPlayer from './MusicPlayer'
import { useCharacterNav } from '../Hooks/userCharacterNav'
import { CHARACTERS } from '../Data/character.js'

export default function CharacterGallery({ onBack }) {
  const { 
    activeIndex, 
    contentKey, 
    isAnimating, 
    goTo, 
    goPrev, 
    goNext 
  } = useCharacterNav(CHARACTERS.length)

  const char = CHARACTERS[activeIndex]

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* 1. LAYER: Background Canvas (Stars, Particles, Overlay) */}
      <Background
        characters={CHARACTERS}
        activeIndex={activeIndex}
        isAnimating={isAnimating}
      />

      {/* 2. LAYER: Top Navigation Bar */}
      <TopBar
        characters={CHARACTERS}
        activeIndex={activeIndex}
        char={char}
        goTo={goTo}
        onBack={onBack}
      />

      {/* 3. LAYER: Content (Text, Stats, etc.) */}
      <ContentPanel
        char={char}
        contentKey={contentKey}
      />

      <MusicPlayer />

      {/* 4. LAYER: Navigation Arrows (Floating) */}
      {/* Left Arrow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 40,
        transform: 'translateY(-50%)',
        zIndex: 20
      }}>
        <NavArrow 
          onClick={goPrev} 
          accent={char.accent} 
          label="Previous Character"
        >
          ‹
        </NavArrow>
      </div>

      {/* Right Arrow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: 40,
        transform: 'translateY(-50%)',
        zIndex: 20
      }}>
        <NavArrow 
          onClick={goNext} 
          accent={char.accent} 
          label="Next Character"
        >
          ›
        </NavArrow>
      </div>

    </div>
  )
}
