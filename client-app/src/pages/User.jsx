import { Card, UserModal } from "../components";
import { Logo, Logout } from "../assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const User = () => {
  const elections = [
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2023",
      list: [
        "Ala Baganne",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
      ],
    },
    {
      title: "Presidential election",
      year: "2022",
      list: [
        "Ala Baganne zsadaesvfgvbnbgvfcjnbgfvcngbfvcbgfv defsvbgnh,,nhbgvfcdngbfvc",
        "Rami Ferjani",
        "Chebbi Mohamed Aziz",
        "Chebbah Mohamed Amine",
        "Chebbah Mohamed Amine",
        "Chebbah Mohamed Amine",
        "Chebbah Mohamed Amine",
        "Chebbah Mohamed Amine",
      ],
    },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/Login");
  };

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [list, setList] = useState([]);

  const handleConnectClick = (title, year, list) => {
    setShowModal(true);
    setTitle(title);
    setYear(year);
    setList(list);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="w-screen h-screen ">
      <div className="w-screen h-[10%] flex justify-center">
        <div className="flex-row flex justify-between w-[90%] h-full px-8 items-center border-b-2 border-solid border-border navbar">
          <img src={Logo} alt="Logo" />
          <div className=" flex gap-10">
            <button onClick={handleClick} className="bg-transparent">
              <img src={Logout} alt="Logout" />
            </button>
            <h1 className="">Username</h1>
          </div>
        </div>
      </div>
      <div className=" flex flex-row w-screen h-[90%] justify-center mb-10">
        <div className=" flex flex-wrap gap-4 w-[90%] h-full mt-20 pb-10 justify-center items-center overflow-y-auto">
          {elections.map((e, i) => (
            <Card
              key={i}
              Title={e.title}
              Year={e.year}
              buttonText={"Vote"}
              onClick={() => {
                handleConnectClick(e.title, e.year, e.list);
              }}
            />
          ))}
          {showModal && (
            <UserModal
              onClose={handleCloseModal}
              title={title}
              year={year}
              list={list}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default User;
