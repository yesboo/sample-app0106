import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import aws_exports from './aws-exports';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import FileSelect from "./FileSelect.js";
import { readFileAsText, mapCSVToArray } from "./helpers.js";
import { mapArrayToWorkItem } from "./WorkItem.js";

Amplify.configure(aws_exports);

const Other = () => {
    const [textFileContent, setTextFileContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [credentials, setCredentials] = useState(null);
    const [msg, setMsg] = useState(); //①タブ1の表示
    const [content, setContent] = useState(); //①タブ1の表示

/*
    useEffect(() => {
      if (credentials) {
        const getTextFileFromS3 = async () => {
          const s3Client = new S3Client({
            region: 'ap-northeast-1',
            credentials: {
              accessKeyId: credentials[0]["ACCESSKEY"],
              secretAccessKey: credentials[0]["SECRETKEY"]
            }
          });
  
          const command = new GetObjectCommand({
            Bucket: 'amplifyappcc2e9b028c7242c29b9d5b02189fad26e0bad-dev',
              Key: 'public/sample_code.txt'
            });
  
          try {
            const data = await s3Client.send(command);
            const reader = data.Body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result = '';
            let done = false;
  
            while (!done) {
              const { done: doneReading, value } = await reader.read();
              done = doneReading;
              result += decoder.decode(value, { stream: true });
            }
  
            result += decoder.decode();
            setTextFileContent(result);
          } catch (error) {
            console.error('Error fetching the file from S3:', error);
          }
        };
        getTextFileFromS3();
        }
    }, [credentials]);
*/  
    const handleSubmit = async (file) => {
      let items = [];
      try {
        const csv = await readFileAsText(file);
        const arr = mapCSVToArray(csv);
        items = mapArrayToWorkItem(arr);
        console.log(items);
      } catch (error) {
        alert(error);
      }

      //credentials
      setCredentials(items);
    };

//    const api_url = "https://vouopayma5.execute-api.ap-northeast-1.amazonaws.com/default/ampLambda-dev";
    const api_url = "https://yy49fcsalh.execute-api.ap-northeast-1.amazonaws.com/default/getListFromS3-dev";
    const runLambda = () => {
      try {
        fetch(api_url)
          .then(resp => resp.json())
          .then(result => {
            const data = [];
            for(let item of result.Contents) {
              const path = item.Key.split('/');
              const fname = path[path.length - 1] == '' 
                ? path[path.length - 2] + '/' 
                : path[path.length - 1];
              data.push(
                <li key={item.Key} className="list-group-item">
                  {fname}（size:{item.Size}）
                </li>
              );
            }
            setMsg(data);
          });
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      try{
        if (msg) {
          setContent(
            <div>
              <h5 className="text-center">
                [Lambda result]
              </h5>
              <ul className="list-group my-2">
                {msg}
              </ul>
            </div>
          );
        }
      }catch(error){
        console.log(error);
      }
    }, [msg]);
/*
    useEffect(() => {
      if (credentials) {
        const getImageFromS3 = async () => {
          const s3Client = new S3Client({
            region: 'ap-northeast-1',
            credentials: {
              accessKeyId: credentials[0]["ACCESSKEY"],
              secretAccessKey: credentials[0]["SECRETKEY"]
            }
          });

          const command = new GetObjectCommand({
            Bucket: 'amplifyappcc2e9b028c7242c29b9d5b02189fad26e0bad-dev',
            key: 'public/samplepic.jpg'
          });

          try {
            const data = await s3Client.send(command);
            const reader = data.Body.getReader();
            const chunks = [];
            let done = false;
    
            while (!done) {
              const { done: doneReading, value } = await reader.read();
              done = doneReading;
              if (value) {
                chunks.push(value);
              }
            }
    
            // 全てのチャンクを連結してUint8Arrayを作成
            const blob = new Blob(chunks, { type: 'image/jpeg' });

            // 画像URLを生成して表示する
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl); // 状態としてimageUrlを保存する

          } catch (error) {
            console.error('Error fetching the file from S3:', error);
          }
        };
        getImageFromS3();
      }
    }, [credentials]);
*/
    return (
      <div>
        <h1>Text File Content</h1>
        <div id="left-pan">
          <FileSelect onSubmit={handleSubmit} />
        </div>
        <div>
          <pre>{textFileContent}</pre>
        </div>
        <button onClick={runLambda}>Run Lambda</button>
        <div> {content} </div>
      </div>
    );
};
  
export default withAuthenticator(Other);
