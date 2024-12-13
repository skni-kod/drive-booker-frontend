import { ApiRoutes } from "@/enums/routes.enums";
import { axiosServerInstance } from "@/lib/axiosInstance";
import { User_Page } from "@/types/user_page";
import { getTokenFromSession } from "@/utils/authToken";
import ProfileContent from "./ProfileContent";


const fetchUserData = async (): Promise<User_Page | null> => {
    try {
        const accessToken = await getTokenFromSession();
        const response = await axiosServerInstance(accessToken).get(`${ApiRoutes.User}`);
        const userData = response.data;
        return userData;
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        return null;
    }
};

const ProfilePage = async () => {
    const user = await fetchUserData();
    console.log(user)

    if (!user) {
        return <div>Failed to load user data.</div>;
    }

    return (
        <div>
            <ProfileContent user={user} />
        </div>
    );
};

export default ProfilePage;
