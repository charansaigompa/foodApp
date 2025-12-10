import React from "react"
class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:{
              name:"dummy name",
              location:"dummy location",
              img:"dummy img"
            }
            

        }
        console.log("i am children constructor")
    }
   async componentDidMount(){
        console.log("i am children did mount ")
        const data=await fetch("https://api.github.com/users/akshaymarch7");
        const json =await data.json();
        this.setState({
            userInfo:json,
        })
    }
    render(){
      const  {name}=this.state.userInfo;
      const {location,avatar_url}=this.state.userInfo;
      console.log("i am children render")
  
        return(
            <div className="userclass">
             <img src={avatar_url} alt=""  className="rounded-lg"/>
            <h2>Name:{name}</h2>
            <h2>Location:{location}</h2>
           
            </div>
        )
    }
}
export default UserClass;