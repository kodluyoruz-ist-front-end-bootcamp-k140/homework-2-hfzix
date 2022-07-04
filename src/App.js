import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [firstpage, setFirstpage] = useState(0);
  const [secondpage, setSecondpage] = useState(50);
  const [pagenumber, setPagenumber] = useState(4);
  const [dataid, setDataid] = useState(true);
  const [datatitle, setDatatitle] = useState(true);
  const [arr, setArr] = useState([1, 2, 3, 4]);
  const pageDataCount = Math.floor(item.length / pagenumber);
  const empty = [];

  useEffect(() => {
    const user = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setItem(data);
    };
    user();
  }, [arr]);

  // Silme
  const onRemove = (id) => {
    setItem((item) => {
      item.splice(id, 1);
      return [...item];
    });
  };

  // Düzenleme
  const onEdit = (id) => {
    setItem((i) => {
      i.map((x) => {
        if (x === id) {
          console.log("a3", x);
          x.title = title;
          checked ? (x.completed = true) : (x.completed = false);
        }
      });
      return [...i];
    });
  };

  // Sayfala sayısı
  const Pagination = (num) => {
     setFirstpage();
     setSecondpage(0);
     const datacount = num * pagenumber-50
    
    setFirstpage(datacount);
    setSecondpage(datacount+pagenumber);

    console.log(firstpage, secondpage, "sayfaid", num, pagenumber, pageDataCount);
    console.log(datacount, Number(datacount)+Number(pagenumber));
  };

  // Sayfadaki veri sayısı
  const List = () => {
    if (pagenumber == Number(pagenumber))
      for (var i = 0; i < pagenumber; i++) empty.push(i);

    setArr(empty);
  };

  var cekilenveriler = item
    .sort((a, z) => {
      var val = dataid ? a.id - z.id : z.id - a.id;
      //console.log(dataid)
      return val
      
    })
    .slice(firstpage, secondpage)
    .map((x, i) => (
      <tr value={i} key={i}>
        <td>{x.id}</td>
        <td>{x.title}</td>
        <td>{x.completed ? "Yapıldı" : "Yapılmadı"}</td>
        <td>
          <button onClick={() => onRemove(i)}>Delete</button>
        </td>
        <td>
          <button onClick={() => onEdit(x)}>Edit</button>
        </td>
      </tr>
    ));

  // HTML
  return (
    <div>
      {/* Sayfalama */}
      <button value="2" onClick={(e) => List(e.target.value)}>
        Page Count
      </button>
      <input
        type="text"
        onChange={(e) => setPagenumber(e.target.value)}
      ></input>
      {pageDataCount ? " "+pagenumber+" Page per data " : "Plase write number "}
      {arr.map((x) => (
        <button value={x} onClick={(e) => Pagination(e.target.value)}>
          {x}
        </button>
      ))}

      {/* Listeleme */}
      <table>
        <tr>
          <td
            onClick={() => {dataid ? setDataid(false) : setDataid(true)}}
          >
            ID
          </td>
          <td onClick={() => {datatitle ? setDatatitle(false) : setDatatitle(true)}}
          >
            Title
          </td>
          <td>Completed</td>
          <td>
            <td>Delete</td>
          </td>
          <td>
            <td>Edit</td>
          </td>
        </tr>
        {cekilenveriler}
      </table>

      {/* Düzenleme */}
      <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
      <input
        type="checkbox"
        onChange={(e) => setChecked(e.target.checked)}
      ></input>
    </div>
  );
}

export default App;
