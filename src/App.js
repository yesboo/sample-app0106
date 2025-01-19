import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Header } from "./ui-components";
import { Amplify } from 'aws-amplify';  // 修正
import aws_exports from './aws-exports';
import { generateClient } from "aws-amplify/api";
import { listBoards, listBoardsByPartialNameOrMessage } from "./graphql/queries";
import BoardComponent from './ui-components/Board';

const content2 = <p>タブ2のコンテンツ</p>;
const content3 = <p>タブ3のコンテンツ</p>;
const content4 = <p>タブ4のコンテンツ</p>;

Amplify.configure(aws_exports);

function App() {
  const [content1, setContent1] = useState(); //①タブ1の表示
  const client = generateClient();
  const [input, setInput] = useState("");
  const [find, setFind] = useState(input);

  // Listタブ用イベント関数
  const doChange = (event) => {
    setInput(event.target.value);
  };

  const doFilter = (event) => {
    setFind(input);
  };

  useEffect(() => {
    async function syncModels() {
      try {
        let resultBoards;
        if (find === "") {
          resultBoards = await client.graphql({
            query: listBoards
          });
        } else {
          resultBoards = await client.graphql({
            query: listBoardsByPartialNameOrMessage,
            variables: { search: find }
          });
        }

        const data = [];
        for (let i = 0; i < resultBoards.data.listBoards.items.length; i++) {
          const item = resultBoards.data.listBoards.items[i];
          data.push(
            <BoardComponent board={item} key={item.id} className="list-group-item" />
          );
        }
        setContent1(
          <div>
            <div className="mx-0 my-3 row">
              <input type="text" className="form-control col" onChange={doChange} />
              <button className="btn btn-primary col-2" onClick={doFilter}>Click</button>
            </div>
            {data}
          </div>
        );
      } catch (error) {
        console.error("Error syncing models:", error);
        if (error && error.errors && error.errors.length > 0) {
          error.errors.forEach(err => console.error(err.message));
        }
      }
    }

    syncModels();
  }, [input, find]);

  return (
    <div className="py-4">
      <Header className="mb-4" />
      <p>※これは、UIコンポーネントを利用した表示です。</p>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#tab1" className="nav-link active" data-bs-toggle="tab">List</a>
        </li>
        <li className="nav-item">
          <a href="#tab2" className="nav-link" data-bs-toggle="tab">Create</a>
        </li>
        <li className="nav-item">
          <a href="#tab3" className="nav-link" data-bs-toggle="tab">Update</a>
        </li>
        <li className="nav-item">
          <a href="#tab4" className="nav-link" data-bs-toggle="tab">Delete</a>
        </li>
      </ul>
      <div className="tab-content">
        <div id="tab1" className="my-2 tab-pane active">
          {content1}
        </div>
        <div id="tab2" className="my-2 tab-pane">
          {content2}
        </div>
        <div id="tab3" className="my-2 tab-pane">
          {content3}
        </div>
        <div id="tab4" className="my-2 tab-pane">
          {content4}
        </div>
      </div>
      <a className="btn btn-primary" href="." onClick={async () => { await Amplify.Auth.signOut(); }}>
        Sign Out
      </a>
    </div>
  );
}

export default withAuthenticator(App);
