import { UserContext, UserContextType } from "../context/UserContext.js";

import { useContext } from "react";
import Logout from "../components/Logout.js";

function Profile() {
    const { user, setUser } = useContext(UserContext) as UserContextType;
    return (
        <div>
            {user?.name} <Logout></Logout>
        </div>
    );
}
export default Profile;
