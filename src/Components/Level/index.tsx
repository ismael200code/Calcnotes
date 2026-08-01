import { useContext, useState } from "react"
import { DataContext } from "../../utils/context/data_context"




function Level({choiceUser,index,type,secondIndex}:{choiceUser:string,index:number[],type:string,secondIndex:number}) {
  const [choice,setChoice] = useState(choiceUser)
  const [data,setData] = useContext(DataContext)

  function savedData(etat: 'low' | 'middle' | 'good' | 'high',) {
    const newData = {...data}
    if (type==="moyenne") {
      newData.eleve[index[0]].difficultyMoyenne = etat
    }
    else if (type==="exam") {
      newData.etudiant[index[0]].data[secondIndex].difficultyExam = etat
    }
    else if (type==="control") {
      newData.etudiant[index[0]].data[secondIndex].difficultyTest = etat
    }
      setData(newData)
  }
  return (
    <div className="flex text-black">
      <div className={`p-2  w-15 rounded-l-lg bg-low ${choice==="low" && "border-white border text-white"}`} onClick={()=>{
        setChoice("low")
        savedData("low")
      }}>
        <h4 className="text-center">Low</h4>
      </div>
      <div className={`p-2  w-17 bg-mid ${choice==="middle" && "border-white border text-white"}`} onClick={()=>{
        setChoice("middle")
        savedData("middle")
      }}>
        <h4 className="text-center">Middle</h4>
      </div>
      <div className={`p-2  w-17 bg-good ${choice==="good" && "border-white border text-white"}`} onClick={()=>{
        setChoice("good")
        savedData("good")
      }}>
        <h4 className="text-center">Good</h4>
      </div>
      <div className={`p-2  w-15 rounded-r-lg bg-high ${choice==="high" && "border-white border text-white"}`} onClick={()=>{
        setChoice("high")
        savedData("high")
      }}>
        <h4 className="text-center">High</h4>
      </div>
    </div>
  )
}
export default Level