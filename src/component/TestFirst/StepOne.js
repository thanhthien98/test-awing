import React, { useEffect, useState } from 'react'
import '../styles.css'

const template1 = [
  { name: 'email', require: true },
  { name: 'age' },
  { name: 'gender' },
]

const template2 = [
  { name: 'id', require: true },
  { name: 'username', require: true },
  { name: 'password' },
]


const StepOne = ({ check, checkError, listStepOne, setListStepOne }) => {
  const [tab, setTab] = useState(listStepOne[0])
  const [type, setType] = useState(0)
  const [error, setError] = useState(false)


  useEffect(() => {
    const getType = () => {
      const tabActive = listStepOne.find(item => item.idx === tab.idx)
      setType(tabActive?.type)
    }
    getType()
  }, [tab])



  useEffect(() => {
    if (check > 0) {
      if(checkError()) {
        setError(true)
      }
    }
  }, [check])

  const saveData = () => {
    setListStepOne(listStepOne.map((item, idx) => {
      if (idx === tab.idx) {
        return { idx, type: type, data: tab.data }
      } else {
        return item
      }
    }))
  }

  const handlerViewTab = (e) => {
    const { value } = e.target
    setListStepOne(listStepOne.map((item, idx) => {
      if (idx === tab.idx) {
        const data = { idx, type: Number(value), data: {} }
        setTab(data)
        return data
      } else {
        return item
      }
    }))
    setType(Number(value))
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!checkError()) {
      const newData = { idx: listStepOne.length, type: 0, data: {} }
      setListStepOne([...listStepOne, newData])
      setTab(newData)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleInputValue = (e) => {
    const { name, value } = e.target
    setTab({
      ...tab,
      data: {
        ...tab.data,
        [name]: value
      }
    })
  }

  const handleBlurInput = () => {
    saveData()
  }

  const renderError = (item) => {
    if(error && item.require) {
      if(tab.data?.[`${item.name}`]?.length < 1 || !tab.data?.[`${item.name}`]) {
        return  <span className="error">Error</span>

      }
    }
    return null
  }

  const renderTemplate = () => {
    const tabActive = listStepOne.find(item => item.idx === tab.idx)
    if (tabActive?.type === 1) {
      return template1.map(item => (
        <div className="input" key={item.name}>
          <label>{item.name}:</label>
          <input
            type="text"
            name={item.name}
            value={tab.data?.[`${item.name}`]}
            onChange={handleInputValue}
            onBlur={handleBlurInput}
          />
          {renderError(item)}
        </div>
      ))
    }
    if (tabActive?.type === 2) {
      return template2.map(item => (
        <div className="input" key={item.name}>
          <label>{item.name}:</label>
          <input
            type="text"
            name={item.name}
            value={tab.data?.[`${item.name}`]}
            onChange={handleInputValue}
            onBlur={handleBlurInput}
          />
          {renderError(item)}
        </div>
      ))
    }
    return null
  }

  return (
    <div className="content">
      <div>
        {listStepOne.map((item, idx) => (
          <button
            className={`tab ${idx === tab.idx ? 'active' : ''}`}
            key={idx}
            onClick={(e) => {
              e.preventDefault()
              saveData()
              setTab(item)
            }}
          >
            view{idx}
          </button>
        ))}
        <button onClick={handleAdd}>+</button>
      </div>
      <div style={{position: 'relative'}}>
        <label>Template</label>
        <select name="template" onChange={handlerViewTab} value={type}>
          <option value={0}>none</option>
          <option value={1}>template 1</option>
          <option value={2}>template 2</option>
        </select>
        {error && type === 0 && <span className="error">Error</span>}
      </div>
      {renderTemplate()}
    </div>
  )
}

export default StepOne