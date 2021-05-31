import sendIcon from "../assets/send.png";
import attachment from "../assets/paper-clip.png";
import cancel from "../assets/cancel.png";
import image from "../assets/image.png";

/**
 * @author
 * @function MessagesControl
 **/

const MessagesControl = (props) => {
  const {
    sendMessage,
    value,
    onChange,
    groupMessage,
    sortNames,
    username,
    receiver,
    setMedia,
    onChatClose,
    media,
  } = props;

  const messages = groupMessage
    ? groupMessage[sortNames(username, receiver)]
    : [];

  return (
    <div>
      <div className="online-users-header">
        <div style={{ margin: "0 10px" }}>{receiver}</div>
        <div style={{ margin: "0 10px", cursor: "pointer" }}>
          <img onClick={onChatClose} width={10} src={cancel} alt="close" />
        </div>
      </div>
      <div className="message-area">
        <ul>
          {messages && messages.length > 0
            ? messages.map((msg, index) => (
                <li
                  style={{
                    flexDirection:
                      username === msg.receiver ? "row" : "row-reverse",
                  }}
                  key={index}
                >
                  <div className="user-pic">
                    <img src={require(`../users/${msg.avatar}`).default} />
                  </div>
                  <div>
                    {msg.media && msg.media.image ? (
                      <div className="image-container">
                        <img src={msg.media.content} width="200" alt="" />
                      </div>
                    ) : null}
                    {msg.message !== "" ? (
                      <div className="message-text">{msg.message}</div>
                    ) : null}
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div>
        {media !== null ? (
          <div className="attachement-display">
            <img src={image} alt={""} />
            <span className="attachment-name">{media.name}</span>
            <span className="remove-attachment">x</span>
          </div>
        ) : null}

        <form onSubmit={sendMessage} className="message-control">
          <textarea
            value={value}
            onChange={onChange}
            placeholder="Type something...!"
          />
          <div className="file-input-container">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  console.log(reader.result);
                  setMedia({
                    image: true,
                    content: reader.result,
                    name: file.name,
                  });
                };
                reader.onerror = function (error) {
                  console.log(error);
                };
              }}
              id="hidden-file"
            />
            <label htmlFor="hidden-file">
              <img width="20" src={attachment} alt={""} />
            </label>
          </div>
          <button>
            <img src={sendIcon} />
            <span style={{ display: "inline-block" }}>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesControl;
