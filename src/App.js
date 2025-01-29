import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Header } from "./ui-components";
import { Amplify } from 'aws-amplify';  // 修正
import aws_exports from './aws-exports';
import { generateClient } from "aws-amplify/api";
import { listBoards, listBoardsByPartialNameOrMessage, getPerson, getPersonByEmail } from "./graphql/queries";
import { createBoard } from "./graphql/mutations";
import BoardComponent from './ui-components/Board';

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
        let gotPerson;
        for (let i = 0; i < resultBoards.data.listBoards.items.length; i++) {
          //personからメアドを取得
          gotPerson = await client.graphql({
            query: getPerson,
            //idを使った検索
            variables: { id: resultBoards.data.listBoards.items[i].personID } // idを使った検索
          });
          const item = resultBoards.data.listBoards.items[i];
          const emailAddress = gotPerson.data.getPerson.email;
          data.push(
            <div key={item.id}>
              <BoardComponent board={item} key={item.id} className="list-group-item" />
              <p className="text-end">posted by {emailAddress}</p>
            </div>
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

  const [content2, setContent2] = useState("");
  const [fmsg, setFmsg] = useState("");
  const [femail, setFemail] = useState("");
  const [fimg, setFimg] = useState("");

  useEffect(()=> {
    func2(setContent2,fmsg,femail,fimg,setFmsg,setFemail,setFimg);
  },[fmsg,femail,fimg]);

  async function func2(setContent2,fmsg,femail,fimg,setFmsg,setFemail,setFimg) {
    const onEmailChange = (event)=> {
      const v = event.target.value;
      setFemail(v);
    }
    const onMsgChange = (event)=> {
      const v = event.target.value;
     setFmsg(v);
    }
    const onImgChange = (event)=> {
      const v = event.target.value;
      setFimg(v);
    }
    
    const onClick = async ()=> {
      try{
        const result = await client.graphql({
          query: getPersonByEmail,
          //emailを使った検索
          variables: { email: femail} // emailを使った検索
        });
        const personInfo = result.data.getPersonByEmail.items;
        if (personInfo.length > 0) {
          const personName = personInfo[0].name;
          const personId = personInfo[0].id
          const newBoard = await client.graphql({
            query: createBoard,
            variables: {
                input: {
                  message:fmsg,
                  name: personName,
                  image:fimg == "" ? null : fimg,
                  personID: personId
                }
            }  
          });
        }else{
          alert("メールアドレスが見つかりません");
        }
        alert("保尊しました");
      }
      catch (error) {
        console.error("Error syncing models:", error);
        if (error && error.errors && error.errors.length > 0) {
          error.errors.forEach(err => console.error(err.message));
        }
      }
    }
    
    setContent2(
      <div>
        <h3>Create new Board:</h3>
        <div className="alert alert-primary my-3">
          <div className="mb-2">
            <label htmlFor="add_message" className="col-form-label">
              Message</label>
            <input type="text" className="form-control"
              id="add_message" onChange={onMsgChange}/>
          </div>
          <div className="mb-2">
            <label htmlFor="add_email" className="col-form-label">
              Email</label>
            <input type="text" className="form-control"
              id="add_email" onChange={onEmailChange}/>
          </div>
          <div className="mb-2">
            <label htmlFor="add_image" className="col-form-label">
              Image(URL)</label>
            <input type="text" className="form-control" 
              id="add_image" onChange={onImgChange}/>
          </div>
          <div className="mb-2 text-center">
            <button className="btn btn-primary" onClick={onClick}>
              Click</button>
          </div>
        </div>
      </div>
    );
  }

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
