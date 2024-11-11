import React from 'react'
import { Candidates} from '../../../types'

interface CandidatesCardProps {
    candidate: Candidates
}

const CandidatesCard: React.FC<CandidatesCardProps> = ({candidate}) => {
  return (
    <div>
        <div style={{backgroundColor: "black",color:"white"}}>
            <p>{candidate.name}</p>
            <img src={candidate.image} alt="" />
            <p>{candidate.votes}</p>
        </div>
    </div>
  )
}

export default CandidatesCard