import axios from 'axios';
const url = "http://localhost:3000/library";
export const listL= async () => {

return await axios.get(`${url}`);
}
