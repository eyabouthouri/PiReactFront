import Library from "./Library";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AffCmntr from "./AffCmntr";
axios.defaults.withCredentials = true;

function DetailAddCmntr(props) {
  const { Libraryid, id } = useParams();
  const [state, setState] = useState({
    description: "",
    Libraryid,
    name: "",
    adresse: "",
    pays: "",
    email: "",
    tel: "",
    Image: "",
  });
  const [comments, setComments] = useState([]);

  const addC = async (data) => {
    const response = await axios.post("/commentaire/addc", data, { withCredentials: true });

    return response.data;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addC(state).then((newComment) => {
      setComments([...comments, newComment]);
      setState({ ...state, description: "" }); // clear the input field
    });
  };

  useEffect(() => {
    axios
      .get("/commentaire/getc")
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div>
        {comments.map((comment, index) => (
          <AffCmntr key={index} comment={comment} />
        ))}
      </div>
      <form class="comment-text d-flex align-items-center mt-3" method="POST" onSubmit={handleSubmit}>
        <input type="text" class="form-control rounded" name="description" placeholder="commenter" onChange={handleInputChange} value={state.description} />
        <div class="comment-attagement d-flex">
          <a href="javascript:void();">
            <i class="ri-link mr-3"></i>
          </a>
          <a href="javascript:void();">
            <i class="ri-user-smile-line mr-3"></i>
          </a>
          <a href="javascript:void();">
            <i class="ri-camera-line mr-3"></i>
          </a>
        </div>
      </form>
    </div>
  );
}

export default DetailAddCmntr;
