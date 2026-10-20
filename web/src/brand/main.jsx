import React from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import BrandApp from './BrandApp.jsx'
import '../styles/fonts.js'
import '../styles/base.css'
import './brand.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <BrandApp />
    </MotionConfig>
  </React.StrictMode>
)
