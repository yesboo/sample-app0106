
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './ui-components';

function App() {
  return (
    <div className="py-4">
      <Header className="mb-4" />
      <p>※これは、UIコンポーネントを利用した表示です。</p>
      <Hello message = "サンプルメッセージです。" type="primary"/>
      <Hello message = "表示タイプも変更か。" type="dark"/>
      <Now />
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

function onClick(){
  alert("クリックした。");
}

export default App;
