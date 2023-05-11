import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarback from "../components/Navbarback";
import NavbarFront from "../components/NavbarFront";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import { Rating } from "react-simple-star-rating";
import ReactStars from "react-stars";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./search.css";

axios.defaults.withCredentials = true;

function GetallCoach() {
  const { userexisting } = useSelector((state) => state.session);
  const [user, setUser] = useState([]);
  const [startdate, setstartdate] = useState();
  const [inputcoach, setinputcoach] = useState({ datee: null, userid: null, patientid: null, tel: null });
  const u = JSON.parse(userexisting);
  const [usercon, setUsercon] = useState(u);
  const [idd, setid] = useState();
  const [holidays, setholidays] = useState([]);
  const [mintime, setmintime] = useState(new Date());
  const [exclusedtimee, setexclusedtimee] = useState([]);
  const [rating, setRating] = useState();
  const [coach, setcoach] = useState();
  const [userco, setUserco] = useState();
  const { isLoggedIn, isAdmin, isUser, isCoach } = useSelector((state) => state.session);
  const [rdvpatient, setrdvpatient] = useState([]);
  const [isdisabled, setisdisabled] = useState(true);
  const [validd, setValid] = useState(true);
  
  
  const [msg, setmsg] = useState("");

  const [value, setValue] = useState(new Date());
  var history = useNavigate();
  useEffect(() => {
    //setUsercon(userexisting)
    // 1. Appeler fetchData dans useEffect
   /* async function fetchData() {
      try {
        // 2. Appeler userconnecte avec await pour attendre la réponse
        const user = await userconnecte();
        setUsercon(user);
      } catch (error) {
        // 3. Gérer les erreurs s'il y en a
        console.error(error);
      
    }*/

  //  fetchData();
  }, []);

  useEffect(() => {
    // 4. Utiliser la fonction de rappel pour mettre à jour l'état de l'utilisateur
    sednRequest().then((d) => {
      setUser(d);
    });

    // 5. Enregistrer l'ID de l'intervalle pour pouvoir l'annuler plus tard
    const intervalId = setInterval(() => {
      refreshtoken();
    }, 1000 * 10000);

    // 6. Retourner une fonction de nettoyage pour annuler l'intervalle
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // 7. Appeler getData dans useEffect
    async function getData() {
      try {
        if (usercon?._id !== undefined) {
          // 8. Vérifier si usercon existe avant d'accéder à _id
          const rdv = await getrendezvousbypatient(usercon?._id);
          setrdvpatient(rdv);

        }
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [usercon]);

  console.log(rdvpatient);
  const refreshtoken = async () => {
    const res = await axios
      .get("/users/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  };
  const userconnecte = async () => {
    const res = await axios.get("/users/userconnecte", {
      withCredentials: true,
    });
    return res.data;
  };
  console.log(usercon);

  const getrendezvousbypatient = async (id) => {
    const rendezvous = await axios.get(`/coach/getrendezvousbypatient/${id}`, {
      withCredentials: true,
    });
    console.log(rendezvous.data);
    setholidays(rendezvous.data);

    console.log(holidays);

    return rendezvous.data;
  };

  const filtre = async (name) => {
    if (!name) {
      sednRequest().then((d) => {
        setUser(d);
      });
    } else {
      let filteredUsers = user;

      filteredUsers = filteredUsers.filter((f) => f.name.indexOf(name) > -1 || f.specialite.indexOf(name) > -1 || f.adresseCabinet.indexOf(name) > -1);

      setUser(filteredUsers);
    }
  };

  console.log(user);

  const sednRequest = async () => {
    const res = await axios
      .get("/coach/getallcoach", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    console.log(res.data);
    setUser(res.data);
    return res.data;
  };

  const addresndezvous = async (id) => {
    try {
      const ress = await axios.post(
        `/coach/addrendezvous/${id}`,
        {
          date: inputcoach.datee,
          userid: id,
          tel: inputcoach.tel,
          patientid: usercon._id,
        },
        { withCredentials: true }
      );

      console.log(ress.data);
      sednRequest().then((d) => {
        setUser(d);
      });
      toast.success("appointment added Successfully");
    } catch (err) {
      setValid(false);
      console.error(err.response.data);
      setmsg([...msg, err.response.data]);
      console.error(err);
      toast.error("error !!!");
    }
  };

  const getrendezvous = async (id) => {
    const rendezvous = await axios.get(`/coach/getrdvbycoach/${id}`, {
      withCredentials: true,
    });
    console.log(rendezvous.data);
    setholidays(rendezvous.data);

    console.log(holidays);

    return rendezvous.data;
  };
  const getcoachdetails = async (id) => {
    const coach = await axios.get(`/coach/getuserbyid/${id}`, {
      withCredentials: true,
    });
    console.log(coach.data);

    return coach.data;
  };

  const handleInputChange = (e) => {
    console.log(e);
    setinputcoach({ ...inputcoach, datee: e });
    if (e.getDate() > new Date().getDate()) {
      setmintime(new Date().setHours(9, 0, 0));
    } else if (e.getDate() === new Date().getDate()) {
      if (new Date().getHours() > new Date(9, 0, 0, 0).getHours()) setmintime(new Date());
    }

    setexclusedtimee(
      holidays
        .filter((holiday) => {
          return new Date(holiday.date).getDate() === e.getDate();
        })
        .map((value) => {
          return new Date(value.date);
        })
    );

    // console.log(e)
  };

  const handleDateSelect = (e) => {
    setstartdate(e);
    //console.log(e.getDate())
  };
  const handleInputChangetel = (e) => {
    setinputcoach({ ...inputcoach, tel: e.target.value });
  };
  console.log(inputcoach.datee);
  const Handelsubmit = (e) => {
    e.preventDefault();

    addresndezvous(idd);
  };

  const handelsubmitt = (idcoach) => {
    setid(idcoach);
    getrendezvous(idcoach).then((obj, err) => {
      if (err) {
        console.error(err);
      } else {
        setholidays(obj);
      }
    });
    getcoachdetails(idcoach).then((obj, err) => {
      setcoach(obj);
    });

    console.log(holidays);
    console.log(coach);
  };
  const addavis = async (id, rating) => {
    const ress = await axios.post(`/coach/addavis`, {
      nbravis: rating,
      idcoch: id,
      idpa: usercon._id,
    });
  };
  const updateavis = async (value) => {
    const ress = await axios
      .put(`/coach/updateavis/${idd}/${usercon._id}`, {
        nbravis: value,
      })
      .catch((err) => console.log(err));
    console.log(value);
  };

  const handleRating = (id, value) => {
    setUserco(id);
    setRating(value);
    // other logic
    addavis(id, value);
    sednRequest().then((d) => {
      setUser(d);
    });
  };
  const handleRatingupdate = (value) => {
    //setRating(value)
    // other logic
    console.log(value);
    updateavis(value);
    sednRequest().then((d) => {
      setUser(d);
    });
  };
  console.log(userco);
  console.log(rating);
  console.log(rdvpatient.date);

  // Optinal callback functions

  return (
    <>
      <div>
        <Navbar></Navbar>
        <section id="hero">
          <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active" style={{ backgroundImage: "url(home/assets/img/slide/R.jpg)" }}>
                <div class="carousel-container">
                  <div class="container">
                    <h2 class="animated fadeInDown">
                      Mental Health <span></span>
                    </h2>
                    <div class="title-on-header">
                      <div class="data-block">
                        <h2></h2>
                        <div class="iq-search-bar ">
                          <input type="text" class=" text search-input" placeholder="Type here to search..." onChange={(e) => filtre(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="content-page" class="content-page">
          <div class="container">
            <div class="row">
              {user &&
                user.map((item, index) => {
                  return (
                    <div class="col-md-6">
                      <div class="iq-card">
                        <div class="iq-card-body profile-page p-0">
                          <div class="profile-header-image">
                            <div class="cover-container">
                              <br></br>
                              <br></br>
                            </div>
                            <div class="profile-info p-4">
                              <div class="user-detail">
                                <div class="d-flex flex-wrap justify-content-between align-items-start">
                                  <div class="profile-detail d-flex">
                                    <div class="profile-img pr-4">
                                      <img src={item.image} alt="image2" width={150} height={300} />
                                    </div>
                                    <div class="user-data-block">
                                      <h4 class="">
                                        {item.name} {item.lastname}
                                      </h4>
                                      <h6>specialite : {item.specialite}</h6>
                                      <h6>telephone : {item.telephone}</h6>
                                      <h6>adresse : {item.adresseCabinet}</h6>
                                      <p>{item.biographie}</p>

                                      <p>
                                        {item.avis && Array.isArray(item.avis) ? (
                                          (() => {
                                            let sum = 0;
                                            let i = 0;
                                            item.avis.map((value, index) => {
                                              i = i + 1;
                                              sum += value.nbravis;
                                            });
                                            return <ReactStars isHalf={true} size={50} value={sum / i} edit={false} precision={0.1}></ReactStars>;
                                          })()
                                        ) : (
                                          <ReactStars isHalf={true} size={50} value={0} edit={false} precision={0.1}></ReactStars>
                                        )}
                                      </p>
                                    </div>
                                    <div className="App"></div>
                                  </div>
                                  {rdvpatient.length === 0 ? (
                                    <button
                                      type="button"
                                      class="buttonLink"
                                      data-toggle="modal"
                                      data-target="#exampleModal2"
                                      onClick={() => {
                                        handelsubmitt(item._id);
                                        history("/getallcoach");
                                      }}
                                    >
                                      <i class="bi bi-calendar3"></i>
                                      rendez-vouss
                                    </button>
                                  ) : (
                                    <button type="button" class="buttonLink" data-toggle="modal" data-target="#exampleModal2" onClick={() => handelsubmitt(item._id)} disabled={isdisabled}>
                                      <i class="bi bi-calendar3"></i>
                                      rendez-vous
                                    </button>
                                  )}

                                  {(() => {
                                    let etatavis = true;
                                    let updateavis = false;
                                    let id = "";

                                    item.avis.map((value, index) => {
                                      if (usercon) {
                                        id = usercon._id;
                                      }
                                      if (value.idpatientavis === id) {
                                        etatavis = false;
                                        updateavis = true;
                                      }
                                    });

                                    return (
                                      <div>
                                        {etatavis && (isUser || isAdmin) && isLoggedIn && (
                                          <button type="button" class="buttonLink" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handelsubmitt(item._id)}>
                                            <i class="fa fa-star"></i>
                                            Donner une note
                                          </button>
                                        )}
                                        {updateavis && (isUser || isAdmin) && isLoggedIn && (
                                          <button type="button" class="buttonLink" data-toggle="modal" data-target="#exampleModalCenterupdate" onClick={() => handelsubmitt(item._id)}>
                                            <i class="fa fa-star"></i>
                                            changer votre avis
                                          </button>
                                        )}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Modal title
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {coach && (
              <div class="modal-body">
                <div class="user-data-block">
                  <div class="form-group row align-items-center">
                    <div class="col-md-12">
                      <img class="profile-pic" src={coach.image} alt="profile-pic" />

                      <Rating onClick={(value) => handleRating(idd, value)} />
                    </div>
                  </div>
                </div>
                <h6 class=""> Nom coach </h6>
                <p>{coach.name} </p>
                <h6 class=""> Prenom coach </h6>
                <p>{coach.lastname}</p>
                <h6 class="">tel coach</h6>
                <p>{coach.telephone}</p>
                <h6 class="">specialite </h6>
                <p>{coach.specialite}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalCenterupdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Modal title
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="">
              {coach && (
                <div class="modal-body">
                  <div class="user-data-block">
                    <div class="form-group row align-items-center">
                      <div class="col-md-12">
                        <img class="profile-pic" src={coach.image} alt="profile-pic" />

                        <Rating
                          onClick={(value) => {
                            handleRatingupdate(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 class=""> Nom coach </h6>
                  <p>{coach.name} </p>
                  <h6 class=""> Prenom coach </h6>
                  <p>{coach.lastname}</p>
                  <h6 class="">tel coach</h6>
                  <p>{coach.telephone}</p>
                  <h6 class="">specialite </h6>
                  <p>{coach.specialite}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">
                Prendre un Rendez Vous
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {isLoggedIn ? (
                <form onSubmit={Handelsubmit}>
                  <input type="text" class="form-control" name="tel" onChange={handleInputChangetel} value={inputcoach.tel} placeholder="telephone" />
                  {!validd && <span style={{ color: "red" }}>numero invalide !! </span>}
                  <br></br>
                  <DatePicker
                    className="form-control"
                    selected={startdate}
                    name="datee"
                    value={inputcoach.datee}
                    onSelect={handleDateSelect}
                    onChange={handleInputChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="yyyy/MM/dd"
                    maxTime={new Date().setHours(17, 0, 0)}
                    minDate={new Date()}
                    minTime={mintime}
                    excludeTimes={exclusedtimee}

                    // dateFormat="dd/MM/yyyy"
                    //excludeTimes={holidays.map((value,key) => new Date(value.date))}

                    //excludeTimes={}
                  />

                  <div class="modal-footer">
                    <button type="button" className="buttonLink w-20" data-bs-dismiss="modal">
                      <i class="bi bi-x-circle-fill text-black"></i>Close
                    </button>
                    <button type="submit" className="buttonLink w-30">
                      {" "}
                      <i class="bi bi-check-circle-fill text-black"></i> Save changes
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div class="modal-body">
                    <p>Please log in to access this feature!</p>
                  </div>

                  <button
                    type="button"
                    class="btn btn-warning"
                    data-dismiss="modal"
                    aria-label="Close"
                    aria-hidden="true"
                    onClick={() => {
                      history("/SignIn");
                    }}
                  >
                    go to sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GetallCoach;