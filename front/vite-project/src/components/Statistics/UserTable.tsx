import React from 'react'
import { User } from '../../types'

interface UserTableProps {
    user: User
}

const UserTable: React.FC<UserTableProps> = ({user}) => {
  return (
    <div>
        <table>
    <tbody>
        <tr style={{backgroundColor: (user.hasVoted === true ? "green" :"red"),color:"black"}}>
            <td>{user.username}</td>
            
        </tr>
    </tbody>
</table>
    </div>
  )
}

export default UserTable