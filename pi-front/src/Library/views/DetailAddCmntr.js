import Library from "./Library";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AffCmntr from "./AffCmntr";
import { useDispatch, useSelector } from "react-redux";
axios.defaults.withCredentials = true;

function DetailAddCmntr(props) {
  const { Libraryid, id } = useParams();
  const { isLoggedIn, isAdmin, isUser, userexisting } = useSelector((state) => state.session);
  const [userconnecte, setUserconnecte] = useState(JSON.parse(userexisting));

  const [data, setData] = useState([]);
  var history = useNavigate;
  useEffect(() => {
   /* userconnectee().then((d) => {
      setUserconnecte(d);
      console.log(userconnecte);
    });*/
  }, []);
  const [usercon, setUsercon] = useState();

  const userconnectee = async () => {
    const res = await axios
      .get("/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);
    if (res.data == []) {
      history("/");
    }
    return res.data;
  };
  const [state, setState] = useState({
    description: "",
    Libraryid,
    userid: userconnecte?._id,
    dateEnvoi: "",
  });
  const [user, setUser] = useState([]);
  const [msg, setmsg] = useState({});
  const [valid, setValid] = useState(true);
  const [comments, setComments] = useState([]);
  const listC = async () => {
    const response = await axios.get(`/commentaire/listc/${Libraryid}`);
    if (response.status == 200) {
      console.log("aaaaaaaaaaa", response.data);
      setData(response.data);
    }
  };
  const addC = async (data) => {
    try {
      const response = await axios.post("/commentaire/addc", {
        description: state.description,
        userid: userconnecte?._id,
        Libraryid: state.Libraryid,
        dateEnvoi: state.dateEnvoi,
      });
      setState({ ...state, description: "" }); // clear the input field

      window.location.reload();

      toast.success("comment added Successfully");
    } catch (err) {
      setValid(false);
      console.error(err.response.data);
      setmsg(err.response.data);
    }
  };

  const getuserbyid = async (id) => {
    const pa = await axios
      .get(`/commentaire/getuserbyid/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    //  setpatient(res.data)
    return pa.data;
  };

  useEffect(() => {
    getuserbyid(data).then((d) => {
      setUser(d);
      console.log(user);
    });
  }, []);
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
      .get(`/commentaire/listc/${Libraryid}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [Libraryid]);

  return (
    <div>
      {!valid && msg.description && <span style={{ color: "red" }}>{msg.description}!! </span>}

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
