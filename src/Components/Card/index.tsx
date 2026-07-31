
import Level from "../Level"
import { DataContext } from "../../utils/context/data_context"
import { useContext } from "react"



function Card({ classes, coef, qualif, choice, id ,secondIndex}) {
  const [data,setData] = useContext(DataContext)

  function deleteDataEleve(indexRemove: number) {
    const newData = {...data}
    if (qualif==="eleve") {
      const newArray = data.eleve.filter((_,index) => indexRemove !== index)
      newData.eleve = newArray
      setData(newData)
    }
  }

  function deleteDataEtudiant(indexRemove: number,id: number) {
    const newData = {...data}
    if (qualif==="etudiant") {
      const newArray = data.etudiant[indexRemove].data.filter((element) => id !== element.id)
      newData.etudiant[indexRemove].data = newArray
      setData(newData)
    }
  }

  if (qualif === "etudiant") {
    return (
      <div className="bg-background-card border border-border-card rounded-xl w-80 lg:w-100 md:w-90 p-3 ">

        <div className="border-b flex justify-between">
          <h3 className="font-semibold">{classes} (coef: {coef})</h3>
          <button className="text-red-400 active:scale-95" onClick={()=>{deleteDataEtudiant(id[0],id[1])}}>supprimer</button>
        </div>

        <div className="mt-1">
          <h3 className="font-light">Contrôle continnu:</h3>
          <div className="flex justify-center">
            <Level secondIndex={secondIndex} choiceUser={choice[1]} index={id[0]} type={"control"}/>
          </div>
        </div>

        <div className="mt-1">
          <h3 className="font-light">Examen:</h3>
          <div className="flex justify-center">
            <Level secondIndex={secondIndex} choiceUser={choice[0]} index={id[0]} type={"exam"}/>
          </div>
        </div>

      </div>
    )
  }
  else if (qualif === "eleve") {
    return (
      <div className="bg-background-card border border-border-card rounded-xl w-80 lg:w-100 md:w-90 p-3 ">

        <div className="border-b flex justify-between">
          <h3 className="font-semibold">{classes} (coef: {coef})</h3>
          <button className="text-red-400 active:scale-95" onClick={()=>{deleteDataEleve(id)}}>supprimer</button>
        </div>

        <div className="mt-1">
          <h3 className="font-light">Moyenne:</h3>
          <div className="flex justify-center">
            <Level secondIndex="" choiceUser={choice[2]} index={id} type="moyenne"/>
          </div>
        </div>

      </div>
    )
  }
}
export default Card