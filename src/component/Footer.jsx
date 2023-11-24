import React from 'react'
import { ImGithub, ImHeart } from 'react-icons/im'
import "../Footer.css"

const Footer = () => {
  return (
    <div>
    <footer>
    <h3>Designed By Akash Vishwa </h3>
    <ImHeart size={20} style={{color:"red",margin:"0 10px"}}/>
    <a href="https://github.com/akash1617/React-Movies-App"><ImGithub size={20}/></a>
    </footer>
    </div>
  )
}

export default Footer