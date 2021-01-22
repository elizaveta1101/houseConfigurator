import React from 'react'

import CentralCircle from './CentralCircle/CentralCircle'
import VideoButton from './VideoButton/VideoButton'
import CompletedProjects from './ProjectsButton/CompletedProjects'

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
