import React, {useState, useEffect} from 'react'
import "./style.css"

const getLocalData=()=>{
  const list= localStorage.getItem("mytodolist")
  if (list){
    return JSON.parse(list)
  } else{
    return []
  }
}
const Todo = () => {
  const [inputData, setInputData] = useState("")
  const [items, setItems] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false) 
  // add items 
  const addItem =() =>{
    if(!inputData){alert ("please add some thing")
  }else if(inputData && toggleButton){
    let updatedList=items.map((curElem)=>{
      if(curElem.id===isEditItem){
       curElem={...curElem, name:inputData}
      
      }
      return curElem;
    });
    setItems( updatedList)
    setInputData("")
    setIsEditItem(null)
    setToggleButton(false)
  }
  else{
    const myNewInputData= {
      id : new Date().getTime().toString(),
      name: inputData,
    }
    setItems([...items, myNewInputData])
  };
  setInputData([])
}
// how to edit item section? 
const editItem=(index)=>{
const finditem= items.find((curElem)=>{
  return curElem.id === index
})
setInputData(finditem.name)
setIsEditItem(index)
setToggleButton(true)
}

// how to delete item section 
const deletItem =(index)=>{
    const upDatedItem = items.filter((curElem)=>{
      return curElem.id !== index;
    })
    setItems (upDatedItem)
}
// remove All Section 
const removeAll=()=>{
  setItems([])
}
// useEffect hook uses return(
  useEffect(()=>{
  localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items])
  return(
    <>
    <div className='main-div'>
      <div className='child-div'>
        <figure>
          <img src='./images/todo.svg' alt='todoimg'/>
          <figcaption>here is your list</figcaption>
        </figure>
        <div className='addItems'>
          <input type="text" placeholder="✍ add items" className='form-control' 
          value={inputData} 
          onChange={ (event)=> setInputData(event.target.value)}
          />
          {toggleButton? (<i className="far fa-edit add-btn" onClick={addItem}></i>)
          :(<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
          
        </div>
        {/* show items button */}
        <div className='showItems'>
          {
            items.map((curElem,)=>{
              return (<div className='eachItem' key={curElem.id}>
              <h2>{curElem.name} </h2>
              <div className='todo-btn'>
                <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
              <i className="far fa-trash-alt  add-btn" onClick={()=> deletItem(curElem.id)}></i>
              </div>
            </div>)
            })
          }
          
        </div>
        {/* remove all button  */}
        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="remove all"
          onClick={removeAll}> <span>check list</span> </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Todo