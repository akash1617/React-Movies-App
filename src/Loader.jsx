import React from 'react'
import loaderstyles from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={loaderstyles.main}>
    <span className={loaderstyles.loader}></span>
    </div>
  )
}

export default Loader