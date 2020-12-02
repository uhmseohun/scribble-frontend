import axios from './axios';
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { setContext, setUserKey } from './store/actions';

export const websocketContext = createContext(null);

const websocketUri = 'ws://localhost:4000/ws';

const WebsocketProvider = ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();

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

  const eventHandler = async ({ event, payload }) => {
    switch (event) {
      case 'needRefresh':
        const { data: context } = await axios.get('/context');
        dispatch(setContext(context));
        break;
      case 'setUserKey':
        dispatch(setUserKey(payload));
        break;
      default:
        break;
    }
  };

  if (!socket) {
    socket = new WebSocket(websocketUri);
    socket.onmessage = async ({ data: message }) => {
      message = JSON.parse(message);
      if (message.type === 'event') {
        await eventHandler(message);
      }
    };

    ws = {
      socket,
      sendMessage,
      emitEvent,
    };
  }

  return (
    <websocketContext.Provider value={ws}>
      {children}
    </websocketContext.Provider>
  );
};

export default WebsocketProvider;
