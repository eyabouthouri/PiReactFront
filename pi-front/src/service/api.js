import axios from 'axios';
const url = "/library";
export const listL= async () => {

return await axios.get(`${url}`);
}
