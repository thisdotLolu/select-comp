import { useState } from "react"
import { Select } from "./Selelct"

const options=[
  {label:'First', value:1},
  {label:'Second', value:2},
  {label:'Third', value:3},
  {label:'Fourth', value:4},
  {label:'Fifth', value:5},
]


function App() {
  const[value,setValue]=useState<typeof options[0] | undefined>(options[0])

  return (
    <div className="App">
      <Select options={options} value={value} onChange={o=>setValue(o)}/>
    </div>
  )
}

export default App
