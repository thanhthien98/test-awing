import React, { useEffect, useState } from 'react';

const TestSecond = () => {
  const [nums, setNums] = useState([])
  const [cost, setCost] = useState([])
  const [valueNum, setValueNum] = useState() 
  const [valueCost, setValueCost] = useState() 
  const [totalCostSpend, setTotalCostSpend] = useState(0)
  

  const validate = () => {
    if(nums.length !== cost.length) {
      alert('Độ dài mảng nums và cost phải bằng nhau')
      return false
    }
    if(nums.length < 1 || cost.length < 1){
      alert('Mảng rỗng')
      return false
    }
    if (nums.length > Math.pow(10,5) || cost.length > Math.pow(10,5)){
      alert('Mảng quá dài')
      return false
    }
    return true
  }

  const getAverageValue = () => {
    let total = 0
    nums.forEach(i => {
      total += i
    })
    return Math.round(total/nums.length)
  }

  const getIdxMaxCost = () => {
    const max = Math.max(...cost)
    const arrIdx = []
    cost.forEach((i, idx) => {
      if(i === max){
        arrIdx.push(idx)
      } 
    })
    return arrIdx
  }

  const getNumCostMax = () => {
    const arr = getIdxMaxCost()
    let numMax = nums[arr[0]]
    for (let index = 1; index < arr.length; index++) {
      if(numMax < nums[arr[index]]){
        numMax = nums[arr[index]]
      }
    }
    return numMax
  }

  const checkItemNums = () => {
    return nums.every(i => i === nums[0])
  }

  const getTotalCost = () => {
    const averageValue = getAverageValue()
    const numMax = getNumCostMax()
    
    let start, end ;
    let totalCost = 0
    if(checkItemNums()) {
      setTotalCostSpend(totalCost)
      return
    }
    if(numMax > averageValue) {
      start = averageValue - 1;
      end = numMax
      for (let value = start; value >= end; value--) {
        let total = 0
        nums.forEach((e, idx) => {
          if(e !== value){
            total += Math.abs(value - e)*cost[idx]
          } 
        })
        if(totalCost !== 0 && totalCost < total) {
          break;
        }
        totalCost = total
      }
    } else {
      start = numMax ;
      end = averageValue +1
      for (let value = start; value <= end; value++) {
        let total = 0
        nums.forEach((e, idx) => {
          if(e !== value){
            total += Math.abs(value - e)*cost[idx]
          } 
        })
        if(totalCost !== 0 && totalCost < total) {
          break;
        }
        totalCost = total
      }
    }
    setTotalCostSpend(totalCost)
  }

  return (
    <div>
      <div>
        <p>
          list nums : [{nums.join(',')}]
        </p>
        <div>
          <label>add nums </label>
          <input value={valueNum} min={1} type="number" onChange={(e) => {
            if(Number(e.target.value) > 0){
              setValueNum(Math.round(Number(e.target.value)))
            } else {
              setValueNum(undefined)
            }
            }}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && (valueNum > 0 || valueNum <= Math.pow(2,53) -1) ) {
                setNums([...nums,valueNum])
                setValueNum('')
              }
            }} 
            />
          <button onClick={() => {
            if(valueNum > 0 || valueNum <= Math.pow(2,53) -1 ){
              setNums([...nums,valueNum])
              setValueNum('')
            }
            }}>+</button>
        </div>
      </div>
      <div>
      <div>
        <p>
         list cost : [{cost.join(',')}]
        </p>
        <div>
          <label>add cost </label>
          <input value={valueCost} min={1} type="number" onChange={(e) => {
            if(Number(e.target.value) > 0){
              setValueCost(Math.round(Number(e.target.value)))
            } else {
              setValueCost(undefined)
            }
            }}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && (valueCost > 0 || valueCost <= Math.pow(2,53) -1)) {
                setCost([...cost,valueCost])
                setValueCost('')
              }
            }}  
            />
          <button onClick={() => {
            if(valueCost > 0 || valueCost <= Math.pow(2,53) -1){
              setCost([...cost,valueCost])
              setValueCost('')
            }
            }}>+</button>
        </div>
      </div>
      <div>
        total spend : {totalCostSpend}
      </div>
      <div>
        <button onClick={() => {
          if(validate()){
            getTotalCost()
          }
          }}>calculator</button>
        <button onClick={() => {
          setNums([])
          setCost([])
        }}>reset</button>
      </div>
      </div>
    </div>
  );
};

export default TestSecond;