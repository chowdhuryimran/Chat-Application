import Chatting from "../Components/Chatting";
import Friends from "../Components/Friends";
import Header from "../Components/Header";
import MsgGroup from "../Components/MsgGroup";


const Chat = () => {
    return (
       <>
       <Header></Header>
       <div className="container mx-auto flex justify-between px-[100px]">
        <div className="w-[35%] shadow-md border-2 border-gray-400 rounded-lg p-2">
            <div>
                <Friends></Friends>
            </div>
            
            <div>
              <MsgGroup></MsgGroup>
            </div>
            
        </div>
       
        <div className="w-[60%] shadow-lg border-2 border-gray-400 rounded-lg p-2">
            <Chatting></Chatting>
        </div>
       </div>
       </>
    );
};

export default Chat;