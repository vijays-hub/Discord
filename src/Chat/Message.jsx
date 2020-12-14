import { Avatar } from "@material-ui/core";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
  return (
    <div className="message">
      <Avatar src={user.image} />
      <h3 className="message__info">
        <h4>
          {user.displayName}{" "}
          <span className="message__timeStamp">{timestamp}</span>
        </h4>
        <p>{message}</p>
      </h3>
    </div>
  );
};

export default Message;
