import axios from './axios';
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, setContext, setUserKey } from './store/actions';

export const websocketContext = createContext(null);

const websocketUri = 'ws://481de54ecca4.ngrok.io/ws';
const socket = new WebSocket(websocketUri);

const WebsocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  socket.onmessage = async ({ data: message }) => {
    message = JSON.parse(message);
    if (message.type === 'event') {
      await eventHandler(message);
    } else if (message.type === 'message') {
      await messageHandler(message);
    }
  };

  const sendMessage = (message) => {
    socket.send(JSON.stringify({
      type: 'message',
      payload: message,
    }));
  };

  const emitEvent = (event, payload = undefined) => {
    socket.send(JSON.stringify({
      type: 'event',
      event,
      ...(payload ? {
        payload
      } : {}),
    }));
  };

  const sendDrawing = (event, payload = undefined) => {
    socket.send(JSON.stringify({
      type: 'draw',
      event,
      payload,
    }));
  };

  const eventHandler = async ({ event, payload }) => {
    switch (event) {
      case 'needRefresh':
        const { data: context } = await axios.get('/context');
        dispatch(setContext(context));
        break;
      case 'setUserKey':
        dispatch(setUserKey(payload));
        break;
      case 'alert':
        alert(payload);
        break;
      case 'answerWord':
        alert(`${payload}를 그리세요.`);
        break;
      default:
        break;
    }
  };

  const messageHandler = async ({ payload: message }) => {
    dispatch(addMessage(message));
  };

  const ws = {
    socket,
    sendMessage,
    emitEvent,
    sendDrawing,
  };

  return (
    <websocketContext.Provider value={ws}>
      {children}
    </websocketContext.Provider>
  );
};

export default WebsocketProvider;
