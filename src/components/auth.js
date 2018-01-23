import React from 'react';
import {Tabs, Tab} from 'material-ui';
import Register from './Register';
import Authenticate from './Login'
const EnterApp = () => {
return(
  <div className="addBook">
    <Tabs>
      <Tab label="Login"><Authenticate/></Tab>
      <Tab label="Sign Up"><Register/></Tab>
    </Tabs>
  </div>
);
}
export default EnterApp;
