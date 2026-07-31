





const BullettinEleve = ({data}) => {

  // Schema
  //       {/** Level high */}
  //       {data.data.exam.high.length>0 && data.data.exam.high.map((element:[string,number,number,number])=> (
  //         <tr key={(element[0]+element[1]+element[2]).replaceAll(" ","")}>
  //           <td>{element[0]}</td> {/**Name */}
  //           <td>{element[2]}</td> {/**Coef */}
  //           <td>{element[1]}</td> {/**Notes */}
  //         </tr>
  //       ))}

  return (
    <table className="font-table">
      <thead>
        <tr className="lg:text-2xl md:text-2xl font-semibold">
          <td>Matières</td>
          <td>Coefficient</td>
          <td>Moyenne</td>
        </tr>
      </thead>
      <tbody className="text-sm lg:text-xl md:text-xl">

        {/** Level high */}
        {data.data.exam.high.length>0 && data.data.exam.high.map((element:[string,number,number,number])=> (
          <tr key={(element[0]+element[1]).replaceAll(" ","")}>
            <td>{element[0]}</td>
            <td>{element[2]}</td>
            <td>{element[1]}</td> 
          </tr>
        ))}

        {/** Level good */}
        {data.data.exam.good.length>0 && data.data.exam.good.map((element:[string,number,number,number])=> (
          <tr key={(element[0]+element[1]).replaceAll(" ","")}>
            <td>{element[0]}</td>
            <td>{element[2]}</td>
            <td>{element[1]}</td>
          </tr>
        ))}

        {/** Level middle */}
        {data.data.exam.middle.length>0 && data.data.exam.middle.map((element:[string,number,number,number])=> (
          <tr key={(element[0]+element[1]).replaceAll(" ","")}>
            <td>{element[0]}</td>
            <td>{element[2]}</td>
            <td>{element[1]}</td>
          </tr>
        ))}

        {/** Level low */}
        {data.data.exam.low.length>0 && data.data.exam.low.map((element:[string,number,number,number])=> (
          <tr key={(element[0]+element[1]).replaceAll(" ","")}>
            <td>{element[0]}</td>
            <td>{element[2]}</td>
            <td>{element[1]}</td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

export default BullettinEleve