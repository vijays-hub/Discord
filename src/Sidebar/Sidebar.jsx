import { Avatar } from "@material-ui/core";
import {
  Add,
  Call,
  ExpandMore,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
  SignalCellularConnectedNoInternet0Bar,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const [voiceOn, setVoiceOn] = useState(false);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Discord | Vijay </h3>
        <ExpandMore />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Text Channels</h4>
          </div>
          <Add onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => {
            return (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            );
          })}
        </div>
      </div>

      <div className="sidebar__voice" onClick={() => setVoiceOn(!voiceOn)}>
        {voiceOn ? (
          <>
            <SignalCellularAlt
              className="sidebar__voiceIconConnected"
              fontSize="large"
            />
            <div className="sidebar__voiceInfoConnected">
              <h3>Voice Connected</h3>
              <p>Stream</p>
            </div>
          </>
        ) : (
          <>
            <SignalCellularConnectedNoInternet0Bar
              className="sidebar__voiceIconDisconnected"
              fontSize="large"
            />
            <div className="sidebar__voiceInfoDisconnected">
              <h3>Voice Disconnected</h3>
              <p>Stream</p>
            </div>
          </>
        )}
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar
          onClick={(e) => auth.signOut()}
          src={user ? user.image : ""}
          title="Click to Logout"
          style={{ cursor: "pointer" }}
        />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 7)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
