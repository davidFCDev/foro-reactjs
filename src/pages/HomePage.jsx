import React from 'react'
import { usePosts } from '../context/PostContext'

const HomePage = () => {
  const { posts } = usePosts()

  return (
    <section>List Posts</section>
  )
}

export default HomePage