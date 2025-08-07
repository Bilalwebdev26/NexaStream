import React from 'react'
import { useParams } from 'react-router'

const ChatPage = () => {
  const{id}=useParams()
  return (
    <div>
      Chat Page {id}
    </div>
  )
}

export default ChatPage
