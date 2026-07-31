import { Link } from "react-router-dom"


function Home() {

  return (
    <div className="my-8 lg:px-30 md:px-30 lg:mt-30 md:mt-25 flex flex-col justify-center items-center">
      <h1 className="text-center font-bold font-serif text-3xl lg:text-5xl mb-3">Visualisez votre réussite, note par note.</h1>
      <p className="text-text-second text-center">Bienvenue sur
        <span className="font-bold text-white"> CalcNotes, </span>
        l'outil de simulation intelligent conçu pour les étudiants qui veulent piloter leur réussite.</p>


      <h2 className="font-bold text-center text-2xl mt-5">Faites une prévisualisation. Êtes vous ?</h2>
      <div className="flex justify-around mt-3 items-center w-full">
        <Link to="/config/eleve" className="border p-3 border-border-card rounded-lg bg-background-card hover:scale-109 active:scale-95 transition-all">Élève</Link>
        <p>ou</p>
        <Link to="/config/etudiant" className="border p-3 border-border-card rounded-lg bg-background-card hover:scale-109 active:scale-95 transition-all">Étudiant/e</Link>
      </div>
    </div>
  )
}

export default Home