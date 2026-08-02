import Logo from "../../../public/logo.png"


function Headers () {

  return (
    <header className="mb-3 border-b sticky top-0 bg-background flex justify-center items-center h-10">
      <img src={Logo} alt="" className="h-10"/>
      <h2 className="font-bold text-3xl text-center">Calc<span>Notes</span> <span className="italic font-medium">v1.3</span></h2>
    </header>
  )
}
export default Headers