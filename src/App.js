import './App.css';
import { useState } from "react"
import StepZero from "./component/TestFirst/StepZero"
import StepOne from "./component/TestFirst/StepOne"
import TestSecond from "./component/TestTwo"


const defaultData = {
  idx: 0,
  type: 0,
  data: {}
}


function App() {
  const [type, setType] = useState(0)
  const [check, setCheck] = useState(0)
  const [typeTest, setTypeTest] = useState(0)
  const [listStepOne, setListStepOne] = useState([defaultData])
  const [dataStep0, setDataStep0] = useState({name: '', title: ''})

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!checkStep0() || checkStep1()) {
      alert('Vui lòng điền đủ thông tin')
    }
     else {
      alert('Thành công')
    }
  } 

  const checkStep0 = () => {
   return dataStep0.name.length > 0 && dataStep0.title.length > 0
  }

  const filterError = (data, type) => {
    if(type === 0) {
      return 1
    }
    if(type === 1) {
      if(!data?.email) {
        return 1
      }
      if(data?.email?.length < 1){
        return 1
      }
    }
    if(type === 2) {
      if(!data?.id || !data?.username) {
        return 1
      }
      if(data?.id.length < 1) {
        return 1
      }
      if(data?.username.length < 1) {
        return 1
      }
    }
    return 0
  }

  const checkStep1 = () => {
    let hasError = 0
    listStepOne.every(element => {
      if(filterError(element.data, element.type) === 1) {
        hasError = 1
        return false
      }
      return true
    });

    if (hasError > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        TEST
        <select value={typeTest} onChange={(e) => {setTypeTest(Number(e?.target?.value))}}>
          <option value={0}>Test - 1</option>
          <option value={1}>Test - 2</option>
        </select>
      </header>
    <div className="container">
      {
      typeTest === 1 ?
      (<div>
        <TestSecond />
      </div>)
      : 
      (
        <form onSubmit={handleSubmit}>
        <div className="row-button">
        <button onClick={(e) => {
          setType(0)
          e.preventDefault()
        }}
          >0</button>
        <button onClick={(e) => {
          e.preventDefault()
          setType(1)
          }}>1</button>
          <div>
          </div>
        <input type="submit" onClick={() => {setCheck(check +1)}} value={'submit'}></input>
        </div>
          <div className="view">
            {type === 0 ? 
              <StepZero data={dataStep0} setData={setDataStep0} check={check} /> 
              :
              <StepOne check={check} listStepOne={listStepOne} setListStepOne={setListStepOne} checkError={checkStep1} />
            }
          </div>  
      </form>
      )
      }
    </div>
    </div>
  );
}

export default App;
