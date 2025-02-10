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
    const [credentials, setCredentials] = useState(null);

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

    return (
      <div>
        <h1>Text File Content</h1>
        <div id="left-pan">
          <FileSelect onSubmit={handleSubmit} />
        </div>
        <div>
          <pre>{textFileContent}</pre>
        </div>
      </div>
    );
};
  
export default withAuthenticator(Other);
