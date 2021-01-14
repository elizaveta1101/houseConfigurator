import React from 'react'
import './MainPage.css'
import CentralCircle from './CentralCircle'
import VideoButton from './VideoButton'
import CompletedProjects from './CompletedProjects'
import CentralButton from './CentralBtn'

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
