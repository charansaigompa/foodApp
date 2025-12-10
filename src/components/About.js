import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

// const About=()=>{
//     console.log("i m about")
//     return(

//     );
// }
class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("parent componten constructor");
  }
  componentDidMount(){
    console.log("I am parent did mount");
  }
  render() {
    console.log("i am parent render")
    return (
      <div className="p-5 m-5">
        <h1>Your are in about page</h1>
         <UserContext.Consumer>
          {({loggedInUser})=>(<h1 className="font-bold ">{loggedInUser}</h1>
          )}
         </UserContext.Consumer>
        <h2>This is done through react router</h2>
        {/* {<User name={"jay dev"} location={"jaipur"}></User> */}
        {/* <UserClass name={"upendra"} location={"karnataka"}></UserClass>
        <UserClass name={"ram"} location={"andhra"}*/}
        <UserClass/>

      </div>
    );
  }
}
export default About;
