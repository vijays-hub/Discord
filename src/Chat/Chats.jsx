import { AddCircle, EmojiEmotions, SendRounded } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import { selectMessages } from "../features/chatSlice";
import { setMessages } from "../features/chatSlice";
import { selectUser } from "../features/userSlice";
import ChatHeader from "./ChatHeader";
import "./Chats.css";
import Message from "./Message";
import db from "../firebase";
import Picker from "emoji-picker-react";
import HyperModal from "react-hyper-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chats = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          let allNewMessages = snapshot.docs.map((doc) => doc.data());
          setAllMessages(allNewMessages);
        });
    }
  }, [channelId]);

  useEffect(() => {
    toast.warn(
      "Select existing channel or create a new one to experience this app",
      {
        position: "top-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  const setAllMessages = (allMessages) => {
    // Since Actions cant be used inside async functions, we have separate function to
    // manipulate store.
    dispatch(
      setMessages({
        messages: allMessages,
      })
    );
  };

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: new Date().toLocaleString(),
    });

    setInput("");
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + "" + emojiObject.emoji);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="chat">
      <ToastContainer />
      <div className="chat__header">
        <ChatHeader channelName={channelName} />
      </div>
      <div className="chat__messages">
        {messages?.map((message) => {
          return (
            <Message
              timestamp={message.timestamp}
              user={message.user}
              message={message.message}
            />
          );
        })}
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form>
          <input
            type="text"
            placeholder={
              channelId
                ? `Ping #${channelName}`
                : "Tap on a channel to start texting!"
            }
            disabled={!channelId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          {channelId ? (
            <EmojiEmotions
              fontSize="large"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <HyperModal isOpen={isModalOpen} requestClose={closeModal}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      </HyperModal>
    </div>
  );
};

export default Chats;
