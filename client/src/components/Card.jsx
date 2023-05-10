const Card = ({ Title, Year, buttonText, onClick }) => {
  return (
    <div className=" border-solid border-[1px] border-border rounded-lg flex flex-col justify-between items-center py-8 w-[250px] h-[290px] ">
      <h3 className=" text-typo font-poppins font-medium text-lg w-[70%] text-center">
        {Title} {Year}
      </h3>
      <button
        className="bg-primary text-white px-8 py-2 rounded-md"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
