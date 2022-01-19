import "../App.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { map } from "@firebase/util";

function Leaderboards(props) {
  let uid = props.uid;

  const [users, setUsers] = useState([]);

  const getLeaderboards = () => {
    Axios.get(`/server/leaderboards`).then((response) => {
      console.log(response);
      const myData = response.data;
      setUsers(myData);
    });
  };

  useEffect(() => getLeaderboards(), []);

  return (
    <div className="flex flex-col justify-center items-center">
      <table className="gray-text mt-12">
        <tr>
          <th className="px-12">Name</th>
          <th className="px-2">Correct Answers</th>
        </tr>
        {users.map((user, index) => {
          return (
            <tr>
              <td className="text-center">{user.username}</td>
              <td className="text-center">{user.score}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Leaderboards;
