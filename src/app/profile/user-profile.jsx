import {fetchUser} from "../fetcher/fetchUser"

export async function UserProfile() {
  const user = await fetchUser();
  return (
    <div key={user.id} className="profile-card">
        <img className="userImg" src={user.image} alt="User-image"></img>
        <div className="userName">
          <h1 style={{marginLeft: "-30px"}}>{user.firstName}</h1>
          <h1 
          style={{
            marginLeft: "10px",
            paddingTop: "0px"
            }}>{user.lastName}</h1>
        </div>
        <div className="userBackground">
          <button className="editBtn"> Edit Profile</button>
          <div style={{
            width: "70%",
            height: "50%",
            background: "yellow",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
            width: "100%",
            height: "50%",
            background: "black",
            display: "flex",
            // flexDirection: "column"
            justifyContent: "space-between"
          }}>
            <div style={{
            width: "30%",
            height: "100%",
            background: "aqua",
            display: "flex",
            flexDirection: "column"
          }}>
              <div>{user.company.title}</div> 
              <div>Title</div> 
            </div>
            <div style={{
            width: "30%",
            height: "100%",
            background: "blue",
            display: "flex",
            flexDirection: "column"
          }}>
            <div>{user.company.name}</div> 
            <div>Company name</div>
          </div>
            <div style={{
            width: "30%",
            height: "100%",
            background: "yellow",
            display: "flex",
            flexDirection: "column"
          }}>
            <div>{user.company.department}</div> 
            <div>Department</div>
          </div>
          </div>
            <div style={{
            width: "100%",
            height: "50%",
            background: "red",
            display: "flex",
            flexDirection: "column"
          }}>
            <div>Phone: {user.phone}</div> 
            <div>Email: {user.email}</div> 
          </div>

          </div>

        </div>
        
    </div>
  )
}
