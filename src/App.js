
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Header } from './ui-components';

function App() {
  return (
    <div className="py-4">
      <Header className="mb-4" />
      <p>※これは、UIコンポーネントを利用した表示です。</p>
      <Hello />
      <Now />
    </div>
  );
}


function Hello() {
  return (
    <p className="border border-primary p-3 my-3">
      こんにちは！
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

export default withAuthenticator(App);
