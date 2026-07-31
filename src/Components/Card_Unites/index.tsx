import { useContext, useState } from "react"
import { DataContext } from "../../utils/context/data_context"
import Popup from "reactjs-popup"


function CardUnite ({name,children,coef,id,index}) {
  const [data,setData] = useContext(DataContext)
  const [isOpen,setIsoPen] = useState(false)
  const [nameClasses,setNameClasses] = useState("")
  const [coefClasses,setCoefClasses] = useState(0)
  const [controlDifficulty,setControlDifficulty] = useState("")
  const [examDifficulty,setExamDifficulty] = useState("")


  function DeleteUnite() {
    const newData = {...data}
    const newArray = data.etudiant.filter((element) => id !== element.id)
    newData.etudiant = newArray
    setData(newData)
  }
  const handleOpen = () => {setIsoPen(true)}
  const handleClose = () => {setIsoPen(false)}
  const addClasses = ()=> {
    const newArray = {...data}
    const idClasses = newArray.etudiant[index].data.length + 1
    newArray.etudiant[index].data.push({id:idClasses,unitesId:id, name:nameClasses, coef:coefClasses, difficultyTest:controlDifficulty as 'low' | 'middle' | 'good' | 'high', difficultyExam:examDifficulty as 'low' | 'middle' | 'good' | 'high'})
    setData(newArray)
    setNameClasses("")
    setCoefClasses(0)
    setIsoPen(false)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 border rounded-2xl p-2">
      <div className="flex justify-between items-center w-full gap-5 p-2">
        <h3 className="text-xl font-bold border-b">UE: {name} (coef: {coef})</h3>
        <button className="text-red-400 active:scale-95" onClick={DeleteUnite}>supprimer</button>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-row flex-wrap gap-4">
        {children}
      </div>
      <div className="flex justify-center items-center bg-low p-2 rounded-lg text-black active:scale-95 hover:scale-105" onClick={handleOpen}>
        <button>Ajouter une matière</button>
      </div>


        <Popup 
          open={isOpen}
          onClose={handleClose}
          modal
          nested
        >
          <div className="bg-background-card shadow-black shadow-2xl p-4 rounded-2xl flex flex-col ">
            <h1 className="font-bold underline-offset-4 underline text-2xl text-center mb-4">Ajouter une matière</h1>

            <form className="" onSubmit={(e)=>{
              e.preventDefault()
              addClasses()
              }}>

              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Nom de la matière:</label>
                <input type="text" value={nameClasses} onChange={(e)=>{setNameClasses(e.target.value)}} className="p-2 border rounded-xl" required placeholder="ex: Mathématique"/>
              </div>

              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Coefficient:</label>
                <input type="number" value={coefClasses} onChange={(e)=>{setCoefClasses(Number(e.target.value))}} className="p-2 border rounded-xl" required placeholder="ex: 5"/>
              </div>

              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Niveau de difficulté:</label>
                <i className="text-text-second">Branche de notes pouvant être obtennu</i>
                <div className="flex justify-around items-center">
                  <div className="flex flex-col gap-3 flex-wrap border-r pr-4">
                    <h3 className="font-semibold">Contrôle continu</h3>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>Low (0-4)</label>
                      <input type="radio" required value="low" checked={controlDifficulty === "low"} onChange={(e)=>{setControlDifficulty(e.target.value)}}  name="difficultyControl" className="appearance-none border w-3 h-3 p-2 checked:bg-low rounded-2xl"/>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>Middle (5-9)</label>
                      <input type="radio"  value="middle" checked={controlDifficulty === "middle"} onChange={(e)=>{setControlDifficulty(e.target.value)}} name="difficultyControl" className="appearance-none border w-3 h-3 p-2 checked:bg-mid rounded-2xl"/>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>Good (10-14)</label>
                      <input type="radio"  value="good" checked={controlDifficulty === "good"} onChange={(e)=>{setControlDifficulty(e.target.value)}} name="difficultyControl" className="appearance-none border w-3 h-3 p-2 checked:bg-good rounded-2xl"/>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>High (15-19)</label>
                      <input type="radio"  value="high" checked={controlDifficulty === "high"} onChange={(e)=>{setControlDifficulty(e.target.value)}} name="difficultyControl" className="appearance-none border w-3 h-3 p-2 checked:bg-high rounded-2xl"/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-wrap pl-3">
                    <h3 className="font-semibold">Examen</h3>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>Low (0-4)</label>
                      <input type="radio" required value="low" checked={examDifficulty === "low"} onChange={(e)=>{setExamDifficulty(e.target.value)}} name="difficultyExam" className="appearance-none border w-3 h-3 p-2 checked:bg-low rounded-2xl"/>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>Middle (5-9)</label>
                      <input type="radio"  value="middle" checked={examDifficulty === "middle"} onChange={(e)=>{setExamDifficulty(e.target.value)}} name="difficultyExam" className="appearance-none border w-3 h-3 p-2 checked:bg-mid rounded-2xl"/>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>Good (10-14)</label>
                      <input type="radio"  value="good" checked={examDifficulty === "good"} onChange={(e)=>{setExamDifficulty(e.target.value)}} name="difficultyExam" className="appearance-none border w-3 h-3 p-2 checked:bg-good rounded-2xl"/>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-3"></span>
                      <label>High (15-19)</label>
                      <input type="radio"  value="high" checked={examDifficulty === "high"} onChange={(e)=>{setExamDifficulty(e.target.value)}} name="difficultyExam" className="appearance-none border w-3 h-3 p-2 checked:bg-high rounded-2xl"/>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <button className="p-3 rounded-xl bg-text-second text-black hover:scale-105 active:scale-95" type="button" onClick={handleClose}>Annuler</button>
                  <button className="py-3 px-5 rounded-xl bg-red-500 hover:scale-105 active:scale-95" type="submit">Ajouter</button>
                </div>
              </div>
            </form>
          </div>
        </Popup>
    </div>
  )
}

export default CardUnite