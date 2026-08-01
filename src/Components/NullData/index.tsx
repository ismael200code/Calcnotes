

function NullData({eleve}:{eleve:boolean}) {
  return (
    <div className="flex justify-center items-center w-full">
      <h3 className="text-center text-text-second">{eleve ?"Aucune Matière ajouter": "Aucune Unité ajouter"}</h3>
    </div>
  )
}

export default NullData