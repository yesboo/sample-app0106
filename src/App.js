import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Header } from "./ui-components";
import { Amplify } from 'aws-amplify';  // 修正
import aws_exports from './aws-exports';
import { generateClient } from "aws-amplify/api";
import { listBoards, listBoardsByPartialNameOrMessage, getPerson, getPersonByEmail, getBoard } from "./graphql/queries";
import { createBoard, updateBoard, deleteBoard } from "./graphql/mutations";
import BoardComponent from './ui-components/Board';

Amplify.configure(aws_exports);

function App() {
  //リストタブ
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

  //createタブ
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

  //Updateタブ
  const [content3, setContent3] = useState("");
  const [umsg, setUmsg] = useState("");
  const [uimg, setUimg] = useState("");
  const [seldata, setSeldata] = useState([]);
  const [selbrd, setSelbrd] = useState(null);

  useEffect(()=> {
    func3(setContent3,seldata,setSeldata,umsg,uimg,setUmsg,setUimg,selbrd,setSelbrd);
  },[content1,umsg,uimg,selbrd,seldata]);

  async function func3(setContent3,seldata,setSeldata,umsg,uimg,setUmsg,setUimg,selbrd,setSelbrd) {
    const onUMsgChange = (event)=> {
      const v = event.target.value;
      setUmsg(v);
    }
    const onUImgChange = (event)=> {
      const v = event.target.value;
      setUimg(v);
    }
    const onSelChange = async (event)=> {
      const v = event.target.value;
      //<option>のvalue属性は、Boardのidを格納している
      try{
        const gotBoard = await client.graphql({
          query: getBoard,
          variables : { id: v}
        });
        setSelbrd(gotBoard.data.getBoard);
        setUmsg(gotBoard.data.getBoard.message);
        setUimg(gotBoard.data.image);

      }catch(err){
        alert("見つかりませんでした。");
        return;
      }
    }
    
    const UpdClick =  async ()=> {
      try{
        const updBoard = await client.graphql({
          query: updateBoard,
          variables: {
            input: {
              id: selbrd.id,      // 更新するボードのID
              message: umsg,      // 更新するメッセージ
              image: uimg         // 更新する画像URL
            }
          }
        });
        alert("メッセージを更新しました。");
      }catch(err){
        alert("メッセージ更新に失敗しました。");
      }
    }
    
    //ボードのメッセージを表示
    const optionData = [
      <option key="nodata" vaue="-">-</option>
    ];
    try{
      const resultBoards = await client.graphql({
        query: listBoards,
        variables: { filter: null, limit: 5 }
      });

      // 取得したボードのリストを `createdAt` で最新順にソート
      const sortedBoards = resultBoards.data.listBoards.items.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      //ソートしたボードアイテムを表示
      for(let item of sortedBoards) {
        optionData.push(
          <option key={item.id} value={item.id}>{item.message}</option>
        );
      }
      //フックを発動
      setSeldata(optionData);
    }catch(error){
      console.error("Error fetching boards:", error);
      if (error.errors && error.errors.length > 0) {
        error.errors.forEach(err => console.error(err.message));
      }
    }

    setContent3(
      <div>
        <h3>Update new Board:</h3>
        <select className="form-select" onChange={onSelChange}>
          {seldata}
        </select>
        <div className="alert alert-primary my-3">
          <div className="mb-2">
            <label htmlFor="edit_message" className="col-form-label">
              Message</label>
            <input type="text" className="form-control" value={umsg}
              id="edit_message" onChange={onUMsgChange}/>
          </div>
          <div className="mb-2">
            <label htmlFor="edit_image" className="col-form-label">
              Image(URL)</label>
            <input type="text" className="form-control" value={uimg}
              id="edit_image" onChange={onUImgChange}/>
          </div>
          <div className="mb-2 text-center">
            <button className="btn btn-primary" onClick={UpdClick}>
              Click</button>
          </div>
        </div>
      </div>
    );
  }

  //delete
  const [content4, setContent4] = useState("");
  const [deldata, setDeldata] = useState([]);
  const [delbrd, setDelbrd] = useState(null);
  
  useEffect(()=> {
    func4(setContent4,deldata,setDeldata,delbrd,setDelbrd);
  },[content1,delbrd,deldata]);
  
  async function func4(setContent4,deldata,setDeldata,delbrd,setDelbrd) {
    const onDelChange = async (event)=> {
      const v = event.target.value;
      //<option>のvalue属性は、Boardのidを格納している
      try{
        const gotBoard = await client.graphql({
          query: getBoard,
          variables : { id: v}
        });
        
        if (!gotBoard.data.getBoard) {
          alert("見つかりませんでした。");
          return;
        }
        setDelbrd(gotBoard.data.getBoard);
      }catch(err){
        alert("見つかりませんでした。");
        return;
      }
    }
    
    const delClick = async ()=> {
      try {
        await client.graphql({
          query: deleteBoard,
          variables: {
            input: { id: delbrd.id }
          }
        });
        alert("削除されました。");
        
        // 更新されたデータを取得し、削除後のリストを表示
        const data = await getAllBoard();    
        setDeldata(data);
      } catch (err) {
        alert("削除に失敗しました。");
      }
    }
    const data = await getAllBoard();    
    setDeldata(data);
    if(!data){
      alert("なんか失敗");
    }  

    setContent4(
      <div>
        <h3>Delete Board:</h3>
        <select className="form-select" onChange={onDelChange}>
          {deldata}
        </select>
        <div className="my-2 text-center">
          <button className="btn btn-primary" onClick={delClick}>
            Click</button>
        </div>
      </div>
    );
  }
  
  async function getAllBoard(){
    const data = [
      <option key="nodata" vaue="-">-</option>
    ];
    try{
      const resultBoards = await client.graphql({
        query: listBoards
      });

      for(let item of resultBoards.data.listBoards.items) {
        data.push(
          <option key={item.id} value={item.id}>{item.message}</option>
        );
      }
      return data;
    }
    catch(err){
      return ;
    }
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
