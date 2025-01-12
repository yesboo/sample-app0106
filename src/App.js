
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sample React app</h1>
        <h2><a className="App-header" href="." onClick={async () => { await Amplify.Auth.signOut(); }}>Sign Out</a></h2> {/* 修正 */}
      </header>
    </div>
  );
}

export default withAuthenticator(App);

