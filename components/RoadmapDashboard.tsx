import React from 'react'
import { Post } from '../types/data'

interface RoadmapProps {
  setOpenRoadmapPage: React.Dispatch<React.SetStateAction<boolean>>
  suggestionsData: Post[]
  setSuggestionsData: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function RoadmapDashboard({
  setOpenRoadmapPage,
  suggestionsData,
}: RoadmapProps) {
  return (
    <div className="roadmapContainer">
      <div className="roadmapHeader">
        <h2>Roadmap</h2>
        <a onClick={() => setOpenRoadmapPage(true)}>View</a>
      </div>

      <div className="statusContainer">
        <div className="status">
          <div className="circle"></div>
          <p>Planned</p>
          <p>
            {
              suggestionsData?.filter((item: any) => item.status === 'Planned')
                .length
            }
          </p>
        </div>
        <div className="status">
          <div className="circle"></div>
          <p>In-Progress</p>
          <p>
            {
              suggestionsData?.filter(
                (item: any) => item.status === 'In-Progress'
              ).length
            }
          </p>
        </div>
        <div className="status">
          <div className="circle"></div>
          <p>Live</p>
          <p>
            {
              suggestionsData?.filter((item: any) => item.status === 'Live')
                .length
            }
          </p>
        </div>
      </div>
    </div>
  )
}
