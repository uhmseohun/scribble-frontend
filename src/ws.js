const websocketUri = 'ws://localhost:4000/ws';

const ws = new WebSocket(websocketUri);
ws._send = (payload) => {
  ws.send(JSON.stringify(payload));
};

export default ws;
