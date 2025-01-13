
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './ui-components';
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState(input);
  const [msgs, setMsgs] = useState(msg);
  const data = [
    ["おやすみ、", "..."],
    ["おはよう、", "！"],
    ["こんにちは、", "さん。"],
    ["こんばんは、", "さん。"]
  ]

  const onClick = () =>{
    setCount(count + 1);
    setMsg(input);
  }

  const onChange = (event) => {
    setInput(event.target.value);
  }

  useEffect(()=>{
    if (msg==""){
      setMsgs("no massage.");
    }else{
      const h = Math.floor(new Date().getHours() / 6) ;
      setMsgs(data[h][0] + msg + data[h][1]);
    }
  }, [msg]);

  return (
    <div className="py-4">
      <Header className="mb-4" />
      <p>※これは、UIコンポーネントを利用した表示です。</p>
      <div className="mx-0 my-3 row">
        <input type="text" className = "form-control col" onChange={onChange}/ >
        <button className="btn btn-primary col-2" onClick={onClick}>Click</button>
      </div>
      <Hello message = {msgs} type="primary"/>
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
