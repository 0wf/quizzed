import { Games } from "@mui/icons-material";
import "../App.css";
import { Link } from "react-router-dom";

function Menu() {
  const categories = [
    {
      category: "General",
      short: 9,
    },
    {
      category: "Movies",
      short: 11,
    },
    {
      category: "Music",
      short: 12,
    },
    {
      category: "Video Games",
      short: 15,
    },
    {
      category: "Math",
      short: 19,
    },
    {
      category: "Technology",
      short: 18,
    },
    {
      category: "Sports",
      short: 21,
    },
    {
      category: "Geography",
      short: 22,
    },
    {
      category: "History",
      short: 23,
    },
    {
      category: "Politics",
      short: 24,
    },
    {
      category: "Celebrities",
      short: 26,
    },
    {
      category: "Animals",
      short: 27,
    },
    {
      category: "Anime",
      short: 31,
    },
  ];

  const setCategory = (val) => {
    console.log(val);
    localStorage.setItem("category", val);
  };

  return (
    <div className="my-4 w-5/6 mx-auto gap-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 ">
      {categories.map((val, index) => {
        return (
          <Link key={index} onClick={() => setCategory(val.short)} to="/quiz">
            <div className="grey-background h-24 flex justify-center items-center rounded-2xl cursor-pointer hover:opacity-75">
              <h2 className="m-auto sm:text-xl text-lg">{val.category}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Menu;
