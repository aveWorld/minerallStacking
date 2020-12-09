import axios from 'axios';

export async function sendMail(data) {
  const response = await axios({
    method: 'post',
    url: '/mail',
    data,
  });
  return response;
}
