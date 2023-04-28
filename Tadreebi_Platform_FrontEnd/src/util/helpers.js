import { message } from 'antd';

export const displayMessage = (type, content) => {
  message[type](content);
};