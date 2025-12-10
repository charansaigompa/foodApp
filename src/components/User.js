const User=(props)=>{
    const{name,location}=props;
    return(
        <div className="userFunc">
            <h1>This is Information realted to creators</h1>
            <h2>Name:{name}</h2>
            <h2>Location:{location}</h2>
        </div>
    )
}
export default User;