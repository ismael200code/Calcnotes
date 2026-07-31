import { Link, Navigate, useParams } from "react-router-dom"
import Nav from "../../Components/Navigation"
import Card from "../../Components/Card"
import { useContext, useState } from "react"
import { DataContext } from "../../utils/context/data_context"
import NullData from "../../Components/NullData"
import CardUnite from "../../Components/Card_Unites"
import Popup from "reactjs-popup"
import type { DataTypeEleve } from "../../types/data_type"



function Configuration() {
  const { studentStatut } = useParams()
  const [data,setData] = useContext(DataContext)
  const [eleveIsOpen,setEleveIsOpen] = useState(false)
  const [uniteIsOpen,setUniteIsOpen] = useState(false)
  const [classesName,setClassesName] = useState("")
  const [classesCoef,setClassesCoef] = useState(0)
  const [classesDifficult,setClassesDifficult] = useState("low")
  const [unitesName,setUnitesNames] = useState("")
  const [unitesCoef,setUnitesCoef] = useState(0)

  
  if (studentStatut === "eleve") {

    const handleClose = ()=>{setEleveIsOpen(false)}
    const handleOpen = ()=>{setEleveIsOpen(true)}
    const addClasses = (datastudent:DataTypeEleve)=>{
      const newArray = {...data}
      const id = newArray.eleve.length + 1
      newArray.eleve.push({id: id, coef:datastudent.coef, difficultyMoyenne:datastudent.difficultyMoyenne, name: datastudent.name})
      setData(newArray)
      setEleveIsOpen(false)
    }
    return (
      <div className="">
        <Nav link="" name="Configuration" />
        <div className="flex justify-center gap-6 mt-4">
          <label className="font-semibold">Moyenne voulu: </label>
          <input type="number" value={data.moyenneEleve} onChange={(e)=>{
            const newArray = {...data}
            newArray.moyenneEleve = Number(e.target.value)
            setData(newArray)
          }} min={0} max={20} className="text-center border border-border-card rounded w-20 active:decoration-0" />
        </div>

        <div className="mt-10 w-full flex flex-col lg:flex-row gap-3 flex-wrap">
          {data.eleve.length ?
            data.eleve.map((element,index) => (
              <Card secondIndex="" key={element.id} id={index} coef={element.coef} classes={element.name} qualif={studentStatut} choice={["","",element.difficultyMoyenne]}/>
            ))
            : <NullData eleve={true} />}

        </div>
        <div className="fixed z-40 right-2 bottom-15 bg-low w-17 h-17 px-5 rounded-2xl flex justify-center items-center shadow-2xl shadow-black hover:scale-105 active:scale-95" onClick={handleOpen}>
          <h3 className="text-center text-4xl"> + </h3>
        </div>


        <Popup 
          open={eleveIsOpen}
          onClose={handleClose}
          modal
          nested
        >
          <div className="bg-background-card shadow-black shadow-2xl p-4 rounded-2xl flex flex-col ">
            <h1 className="font-bold underline-offset-4 underline text-2xl text-center mb-4">Ajouter une matière</h1>
            <form className="" onSubmit={(e)=>{
              e.preventDefault()
              const datastudent: DataTypeEleve = {id:0, name:classesName, coef:classesCoef, difficultyMoyenne:classesDifficult as 'low' | 'middle' | 'good' | 'high'}
              addClasses(datastudent)
              setClassesCoef(0)
              setClassesName("")
              }}>
              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Nom de la matière:</label>
                <input type="text" name="name" value={classesName} onChange={(e)=>{setClassesName(e.target.value)}} className="p-2 border rounded-xl" required placeholder="ex: Mathématique"/>
              </div>
              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Coefficient:</label>
                <input type="number" name="coef" value={classesCoef} onChange={(e)=>{setClassesCoef(Number(e.target.value))}} className="p-2 border rounded-xl" required placeholder="ex: 5"/>
              </div>
              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Niveau de difficulté:</label>
                <i className="text-text-second">Branche de notes pouvant être obtennu</i>
                <div className="flex flex-col gap-3 flex-wrap">
                  <div className="flex gap-1 items-center">
                    <span className="w-3"></span>
                    <label>Low (0-4)</label>
                    <input type="radio" required value="low" checked={classesDifficult === "low"} onChange={(e)=>{setClassesDifficult(e.target.value)}} name="difficulty" className="appearance-none border w-3 h-3 p-2 checked:bg-low rounded-2xl"/>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="w-3"></span>
                    <label>Middle (5-9)</label>
                    <input type="radio"  value="middle" checked={classesDifficult === "middle"} onChange={(e)=>{setClassesDifficult(e.target.value)}} name="difficulty" className="appearance-none border w-3 h-3 p-2 checked:bg-mid rounded-2xl"/>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="w-3"></span>
                    <label>Good (10-14)</label>
                    <input type="radio"  value="good" checked={classesDifficult === "good"} onChange={(e)=>{setClassesDifficult(e.target.value)}} name="difficulty" className="appearance-none border w-3 h-3 p-2 checked:bg-good rounded-2xl"/>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="w-3"></span>
                    <label>High (15-19)</label>
                    <input type="radio"  value="high" checked={classesDifficult === "high"} onChange={(e)=>{setClassesDifficult(e.target.value)}} name="difficulty" className="appearance-none border w-3 h-3 p-2 checked:bg-high rounded-2xl"/>
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

        <div className={`sticky bottom-0 bg-background p-3 ${data.eleve.length ? "flex justify-center" : "hidden"}`}>
          <Link className="px-2 py-1 border-border-card border rounded-lg text-center bg-red-500 w-3/4 hover:scale-105 active:scale-95" to={"/result/" + studentStatut}>Calculer</Link>
        </div>
      </div>
    )
  }




  else if (studentStatut === "etudiant") {

    const handleClose = ()=>{setUniteIsOpen(false)}
    const handleOpen = ()=>{setUniteIsOpen(true)}
    const addUnites = ()=>{
      const newArray = {...data}
      const id = newArray.etudiant.length + 1
      newArray.etudiant.push({id:id, name:unitesName, coef:unitesCoef, data: []})
      setData(newArray)
      setUnitesNames("")
      setUnitesCoef(0)
      setUniteIsOpen(false)
    }

    return (
      <div className="">
        <Nav link="" name="Configuration" />
        <div className="flex justify-center gap-6 mt-4">
          <label className="font-semibold">Moyenne voulu: </label>
          <input type="number" value={data.moyenneEtudiant} onChange={(e)=>{
            const newArray = {...data}
            newArray.moyenneEtudiant  = Number(e.target.value)
            setData(newArray)
          }} min={0} max={20} className="text-center border border-border-card rounded w-20 active:decoration-0" />
        </div>

        <div className="mt-10 w-full flex flex-col lg:flex-row gap-3 flex-wrap justify-center items-center">
          {data.etudiant.length ?
            data.etudiant.map((element,index) => (
              <CardUnite id={element.id} name={element.name} coef={element.coef} key={element.id} index={index}>
                {
                data.etudiant.length &&
                data.etudiant[index].data.map((secondElement,secondIndex)=> (
                  <Card secondIndex={secondIndex} key={secondElement.id} id={[index,secondElement.id]} classes={secondElement.name} coef={secondElement.coef} choice={[secondElement.difficultyExam,secondElement.difficultyTest,""]} qualif={studentStatut}/>
                ))
                }
              </CardUnite>
            ))
            : <NullData eleve={false} />}

        </div>

        <Popup 
          open={uniteIsOpen}
          onClose={handleClose}
          modal
          nested
        >
          <div className="bg-background-card shadow-black shadow-2xl p-4 rounded-2xl flex flex-col ">
            <h1 className="font-bold underline-offset-4 underline text-2xl text-center mb-4">Ajouter une Unités</h1>
            <form className="" onSubmit={(e)=>{
              e.preventDefault()
              addUnites()
              }}>
              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Nom de l'Unité:</label>
                <input type="text" value={unitesName} onChange={(e)=>{setUnitesNames(e.target.value)}} className="p-2 border rounded-xl" required placeholder="ex: Communication"/>
              </div>
              <div className="flex flex-col gap-1 m-2">
                <label className="font-semibold">Coefficient:</label>
                <input type="number" value={unitesCoef} onChange={(e)=>{setUnitesCoef(Number(e.target.value))}} className="p-2 border rounded-xl" required placeholder="ex: 5"/>
              </div>
              <div className="flex justify-between items-center mt-5">
                <button className="p-3 rounded-xl bg-text-second text-black hover:scale-105 active:scale-95" type="button" onClick={handleClose}>Annuler</button>
                <button className="py-3 px-5 rounded-xl bg-red-500 hover:scale-105 active:scale-95" type="submit">Ajouter</button>
              </div>
            </form>
          </div>
        </Popup>


        <div className="fixed z-40 right-2 bottom-15 bg-low w-17 h-17 px-5 rounded-2xl flex justify-center items-center shadow-2xl shadow-black hover:scale-105 active:scale-95" onClick={handleOpen}>
          <h3 className="text-center text-4xl"> + </h3>
        </div>

        <div className={`sticky bottom-0 bg-background p-3 ${data.etudiant.length ? "flex justify-center" : "hidden"}`}>
          <Link className="px-2 py-1 border-border-card border rounded-lg text-center bg-red-500 w-3/4 hover:scale-105 active:scale-95" to={"/result/" + studentStatut}>Calculer</Link>
        </div>
      </div>
    )
  }
  return <Navigate to="/" />

}
export default Configuration