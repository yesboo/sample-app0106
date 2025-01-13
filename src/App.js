
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './ui-components';
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const onClick = () =>{
    setCount(count + 1);
    setMsgs([
      "Hello, " + msg + "!",
      "こんにちは、" + msg + "さん。"
    ]);
  }

  const onChange = (event) => {
    setMsg(event.target.value);
  }

  return (
    <div className="py-4">
      <Header className="mb-4" />
      <p>※これは、UIコンポーネントを利用した表示です。</p>
      <div className="mx-0 my-3 row">
        <input type="text" className = "form-control col" onChange={onChange}/ >
        <button className="btn btn-primary col-2" onClick={onClick}> Click</button>
      </div>
      <Hello message = {msgs[0]} type="primary"/>
      <Hello message = {msgs[1]} type="dark"/>
      <Now />
      <div className ="alert alert-primary">Count : {count} </div>
      <button className= "btn btn-primary" onClick={onClick} > Click me!!</button>
    </div>
  );
}

function Hello(props) {
  return (
    <p className= {"alert alert-" + props.type}>
      {props.message }
    </p>
  );
}

function Now() {
  return (
    <p className="bg-secondary text-dark bg-opacity-25 p-3 my-3">
      現在は、{
        new Date().getHours()
      }時です。
    </p>
  );
}

//function onClick(){
//  alert("クリックした。");
//}

export default App;
