import Nav from "../../Components/Navigation";


function NotFound() {

  return (
    <div className="">
      <Nav link="" name="Not found"/>
      <h1 className="text-3xl mt-20 text-center text-low">Cette Address n'existe pas. <i>Error: 404</i></h1>
    </div>
  )
}
export default NotFound