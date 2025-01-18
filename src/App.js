import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Header } from "./ui-components";
import { DataStore } from 'aws-amplify/datastore';
import { Board } from './models';
import { Amplify } from 'aws-amplify';  // 修正
import aws_exports from './aws-exports';
import { generateClient } from "aws-amplify/api";
import { listBoards, getBoard } from "./graphql/queries";

const content2 = <p>タブ2のコンテンツ</p>;
const content3 = <p>タブ3のコンテンツ</p>;
const content4 = <p>タブ4のコンテンツ</p>;

Amplify.configure(aws_exports);

function App() {
  const [content1, setContent1] = useState(); //①タブ1の表示
  const client = generateClient();

  useEffect(() => {
    async function syncModels() {
      const allBoards = await client.graphql({
        query: listBoards
      });
    
      const data = [];
      for (let i = 0; i < allBoards.data.listBoards.items.length; i++) {
        const item = allBoards.data.listBoards.items[i];
        data.push(
          <li key={item.id} className="list-group-item">
            {item.message} ({item.name})
          </li>
          );
      }
      setContent1(<ol className="my-3 list-group">{data}</ol>);
    }

    syncModels();
  }, []);

  return (
    <div className="py-4">
      <Header className="mb-4" />
      <p>※これは、UIコンポーネントを利用した表示です。</p>
      <ul className="nav nav-tabs">
        <li className="nav-item">
        <a href="#tab1" className="nav-link active" 
          data-bs-toggle="tab">List</a>
        </li>
        <li className="nav-item">
        <a href="#tab2" className="nav-link" 
          data-bs-toggle="tab">Create</a>
        </li>
        <li className="nav-item">
        <a href="#tab3" className="nav-link" 
          data-bs-toggle="tab">Update</a>
        </li>
        <li className="nav-item">
        <a href="#tab4" className="nav-link" 
          data-bs-toggle="tab">Delete</a>
        </li>
      </ul>
      <div className="tab-content">
        <div id="tab1" className="my-2 tab-pane active">
          { content1 }
        </div>
        <div id="tab2" className="my-2 tab-pane">
          { content2 }
        </div>
        <div id="tab3" className="my-2 tab-pane">
          { content3 }
        </div>
        <div id="tab4" className="my-2 tab-pane">
          { content4 }
        </div>
      </div>
        <a className="btn btn-primary" href="." onClick={async () => { await Amplify.Auth.signOut(); }}>
          Sign Out
        </a>
    </div>
  );
}

export default withAuthenticator(App);
