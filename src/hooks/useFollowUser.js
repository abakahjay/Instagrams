import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import API from "../utils/api";
const useFollowUser = (userId) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setAuthUser);
	const { userProfile, setUserProfile } = useProfileStore();
	const showToast = useShowToast();
    // authUser._id&&console.log(authUser?._id)
    // console.log(userId)
    
	const handleFollowUser = async () => {
        setIsUpdating(true);
		try {
            
            
            if (isFollowing) {
                // unfollow
                const datas=await API.patch(`/api/v1/users/${authUser._id}/unfollow`,{userId})
                const frs=await datas.data
                if(frs.error){
                    throw new Error(fr.error)
                }
                // console.log(frs)
				setAuthUser({
                    ...authUser,
					following: authUser.following.filter((uid) => uid !== userId),
				});
				if (userProfile)
					setUserProfile({
                        ...userProfile,
                        user: frs.following//userProfile.followers.filter((uid) => uid !== authUser.uid),
                    });
                setIsFollowing(false);

            } else {
                // follow
                const data=await API.patch(`/api/v1/users/${authUser._id}/follow`,{userId})
                const fr=await data.data
                if(fr.error){
                    throw new Error(fr.error)
                }
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId],
                });
                if (userProfile)
                    setUserProfile({
                        ...userProfile,
                        user: fr.following//followers: [...userProfile.followers, authUser.uid],
                    });
                setIsFollowing(true);
			}
		} catch (error) {
			const message = error.response?.data?.error || error.message
			showToast("Error", message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	useEffect(() => {
		if (authUser) {
			const isFollowing =authUser.following? authUser.following.includes(userId):authUser.user.following.includes(userId);
			setIsFollowing(isFollowing);
            // console.log(userProfile)
            // console.log(authUser)
		}
	}, [authUser, userId]);

	return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
