import React from 'react'

import CentralCircle from './CentralCircle'
import VideoButton from './VideoButton'
import CompletedProjects from './CompletedProjects'

import './MainPage.css'

function MainPage() {
  return (
    <>
      <div className="central-block">
        <CentralCircle />
        <CompletedProjects />
        <VideoButton />
      </div>
    </>
  )
}

export default MainPage
