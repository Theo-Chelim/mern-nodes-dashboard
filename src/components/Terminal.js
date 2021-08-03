import React, { Component } from "react";
import { XTerm } from "xterm-for-react";

import socketIOClient from "socket.io-client";
import { Box } from "@material-ui/core";

const ENDPOINT = "http://localhost:9000";

class Terminal extends Component {
  socket;

  constructor(props) {
    super(props);

    this.socket = socketIOClient(ENDPOINT);
    this.xtermRef = React.createRef();

    this.state = {
      command: "",
      history: [],
    };
  }

  componentDidMount() {
    this.socket.on("data", (data) => {
      console.log(data);
      console.log("test", this.xtermRef);
      this.xtermRef.current.terminal.write(data);
    });
  }

  onSend = () => {
    this.socket.emit("input", this.state.command);
    this.setState({ command: "" });
  };

  handleKey = (key) => {
    if (key.charCodeAt(0) === 13) {
      this.xtermRef.current.terminal.write("\n");
      this.onSend();
    } else if (key.charCodeAt(0) === 127) {
      this.xtermRef.current.terminal.write("\b \b");
    } else {
      this.xtermRef.current.terminal.write(key);
      this.setState({ command: this.state.command + key });
    }
  };

  render = () => {
    return (
      <Box>
        <br />
        <XTerm
          ref={this.xtermRef}
          onKey={(e) => {
            this.handleKey(e.key);
          }}
        />
      </Box>
    );
  };
}

export default Terminal;
