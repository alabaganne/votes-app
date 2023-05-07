import { Card, AdminModal } from "../components";
import { useState } from "react";

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

const Election = () => {
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
    <section className=" flex flex-wrap gap-4 w-[90%] mt-20 mb-10 justify-center overflow-y-auto">
      {elections.map((e, i) => (
        <Card
          key={i}
          Title={e.title}
          Year={e.year}
          buttonText={"Check"}
          onClick={() => {
            handleConnectClick(e.title, e.year, e.list);
          }}
        />
      ))}
      {showModal && (
        <AdminModal
          onClose={handleCloseModal}
          title={title}
          year={year}
          list={list}
        />
      )}
    </section>
  );
};

export default Election;
