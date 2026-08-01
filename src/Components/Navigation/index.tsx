import { Link } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";


function Nav({name,link}: {name:string,link:string}) {

    return (
      <nav className="flex items-center gap-5">
        <Link to={`/${link}`}>
          <IoMdReturnLeft color="white" className="text-xl"/>
        </Link>
        <p className="text-xl">{name}</p>
      </nav>
    )
}
export default Nav