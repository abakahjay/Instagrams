import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import API from "../utils/api";


const useGetSuggestedUsers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();

	useEffect(() => {
        const controller = new AbortController();
		const getSuggestedUsers = async () => {
			setIsLoading(true);
			try {
                const response =await API.get(`/api/v1/users/`,{
                    signal: controller.signal,
                })
                let users = response.data.users

				users = users.filter(f => f._id !== authUser._id);
				users.forEach((user,index) =>{
						authUser.following.forEach((following)=>{
							if(user._id===following){
								users.splice(index,1)
							}
						})
					
				})
				setSuggestedUsers(users);
			} catch (error) {
				const message = error.response?.data?.error || error.message
				if(error.message==='canceled')return
			    showToast("Error", message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		if (authUser) getSuggestedUsers();
        return ()=>{//This is a cleanup function
            controller.abort();
        }
	}, [authUser, showToast]);
	return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
