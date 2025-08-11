import ProjectList from '@/components/profileComponent/ProjectList'
import UserInfo from '@/components/profileComponent/UserInfo'
import React from 'react'

const page = () => {
  return (
    <div className='px-10'>
      <UserInfo />
      <ProjectList />
    </div>
  )
}

export default page
