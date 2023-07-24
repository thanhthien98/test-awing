import React, { useEffect, useState } from 'react';
import '../styles.css'

const StepZero = ({check, data, setData}) => {  
  const [error, setError] = useState(false)

  useEffect(() => {
    if(check > 0) {
      if(data.name.length > 0 && data.title.length > 0) {
        setError(false)
      } else {
        setError(true)
      }
    }
  },[check])

  const handleChange = (e) => {
    const {name, value} = e?.target
    setData((preData) => ({
      ...preData,
      [name]: value
    }))
  }

  return (
    <div className="content">
      <div className="input">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        {(error && data.name.length < 1) && <span className="error">Error</span>}
      </div>
      <div className="input">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        {(error && data.title.length < 1) && <span className="error">Error</span>}
      </div>
    </div>
  );
};

export default StepZero;
