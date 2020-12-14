import { DeleteForever } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../features/appSlice";
import { setMessages } from "../features/chatSlice";
import db from "../firebase";
import "./SidebarChannel.css";

const SidebarChannel = ({ id, channelName }) => {
  const dispatch = useDispatch();

  const handleChannelDelete = () => {
    db.collection("channels").doc(id).delete();
    dispatch(
      setMessages({
        messages: [],
      })
    );
  };

  return (
    <div className="sidebarChannel">
      <h4
        onClick={() =>
          dispatch(setChannelInfo({ channelId: id, channelName: channelName }))
        }
      >
        <span className="sidebarChannel__hash">#</span>
        {channelName}
      </h4>
      <DeleteForever onClick={handleChannelDelete} />
    </div>
  );
};

export default SidebarChannel;
