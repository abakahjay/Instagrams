import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Messages from './MessagesLink'
import { ChatGptLogo ,UpgradeLogo, MoreLogo,NewChatLogo,SearchLogos,HideSideBarLogo,MicLogo,ArrowDropLogo,HistoryLogo} from "../../assets/constants";
import NewChat from "./NewChat";
import SearchChats from "./SearchChats";
import HistoryLink from "./HistoryLink"

const SidebarItems = ({authUser,onLogout}) => {
	return (
		<>
			{/* <ChatGptLogo/>
			<UpgradeLogo/>
			<MoreLogo/>
			<NewChatLogo/>
			<SearchLogos/>
			<HideSideBarLogo/>
			<MicLogo/>
			<ArrowDropLogo/> */}
			<NewChat/>
			<SearchChats authUser={authUser}/>
			<HistoryLink/>
			{/* <Home authUser={authUser} onLogout={onLogout} />
			<Search authUser={authUser} onLogout={onLogout}/>
			<Notifications authUser={authUser} onLogout={onLogout}/>
			<CreatePost authUser={authUser} onLogout={onLogout}/>
			<Messages authUser={authUser} onLogouot={onLogout}/> */}
			<ProfileLink authUser={authUser} onLogout={onLogout} />
		</>
	);
};

export default SidebarItems;
