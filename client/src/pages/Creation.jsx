import { useState } from "react";
import { Link } from "react-router-dom";
import { Add, Close } from "../assets";

const Creation = () => {
  const [electionTitle, setElectionTitle] = useState("");
  const [year, setYear] = useState("");
  const [list, setList] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [listItems, setListItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { electionTitle, year };
    setIsPending(true);
  };
  const deleteItem = (itemToDelete) => {
    const updatedItems = listItems.filter((item) => item !== itemToDelete);
    setListItems(updatedItems);
  };

  const addItem = () => {
    if (list) {
      setListItems((prev) => [...prev, list]);
      setList("");
    }
  };
  return (
    <section className=" mt-2 flex flex-col justify-start items-center w-full">
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-[90%] ss:w-[60%] sm:w-[40%] md:w-[35%] p-10 sm:p-16 flex flex-col gap-8 justify-center items-center"
      >
        <label className="w-full flex flex-col gap-2">
          <p className=" font-poppins text-sm text-primary tracking-wider">
            Election title
          </p>
          <input
            className="w-full p-2 rounded-sm border-border border-solid border-2 outline-0"
            type="text"
            name="title"
            value={electionTitle}
            onChange={(e) => setElectionTitle(e.target.value)}
          />
        </label>

        <label className="w-full flex flex-col gap-2">
          <p className=" font-poppins text-sm text-primary tracking-wider">
            Year
          </p>
          <input
            className="w-full p-2 rounded-sm border-border border-solid border-2 outline-0"
            type="text"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>

        <label className="w-full flex flex-col gap-2">
          <p className=" font-poppins text-sm text-primary tracking-wider">
            Add to list
          </p>
          <div className="flex flex-row justify-center items-center">
            <input
              className="w-[80%] p-2 border-border border-solid border-2 outline-0"
              type="text"
              name="list"
              value={list}
              onChange={(e) => setList(e.target.value)}
            />
            <button
              onClick={addItem}
              className="w-[20%] h-[44px] p-2 border-border border-solid border-2 outline-0 flex justify-center items-center border-l-0"
            >
              <img src={Add} alt="Add" className=" w-[22px] h-[22px] " />
            </button>
          </div>
        </label>

        <div className=" w-full max-h-36 overflow-x-auto rounded-sm flex flex-col gap-4">
          {listItems.map((item, index) => (
            <div className="flex flex-row w-full justify-between gap-4 items-center rounded-sm py-2 px-4 bg-green-200">
              <p className="  w-[70%] break-normal" key={index}>
                {" "}
                {item}
              </p>
              <img
                src={Close}
                alt="close"
                className=" h-3 w-3 cursor-pointer"
                onClick={() => deleteItem(item)}
              />
            </div>
          ))}
        </div>

        {!isPending && (
          <input
            className=" text-white bg-primary px-8 py-3 font-poppins font-medium text-xs tracking-widest rounded-sm w-full cursor-pointer"
            type="submit"
            value="Submit"
          />
        )}
        {isPending && (
          <input
            disabled
            className=" text-white bg-primary px-8 py-3 font-poppins font-medium text-xs tracking-widest rounded-sm w-full cursor-pointer"
            type="submit"
            value="Loading ..."
          />
        )}
        <Link
          to="/Election"
          className="border-solid border-2 border-primary font-medium text-primary font-poppins px-8 py-3 text-xs tracking-widest rounded-sm w-full cursor-pointer text-center"
        >
          <button>Cancel</button>
        </Link>
      </form>
    </section>
  );
};

export default Creation;
