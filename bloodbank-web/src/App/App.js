import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import HttpService from '../services/http-service';
import Bloodreq from '../bloodreq/bloodreq';
import Bloodbank from '../bloodbank/bloodbank';

const http = new HttpService();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { bloodbank: [], bloodreq: [] };



    //Bind Functions
    this.loadBloodReqs = this.loadBloodReqs.bind(this);
    this.loadBloodReqs();

    this.loadBloodBank = this.loadBloodBank.bind(this);
    this.loadBloodBank();

    var self = this;

    setTimeout(function afterTwoSeconds() {
      self.bloodreqList = self.bloodreqList.bind(self);
      self.bloodbankList = self.bloodbankList.bind(self);
      console.log(self.state);
    }, 1000)


  }

  loadBloodReqs = () => {
    var self = this;
    http.getBloodReqs().then(bloodreqs => {
      self.setState({ bloodreq: bloodreqs })
    }, err => {

    });
  }

  loadBloodBank = () => {
    var self = this;
    http.getBloodBank().then(data => {
      self.setState({ bloodbank: data })
    }, err => {

    });
  }


  bloodbankList = () => {
    const list = this.state.bloodbank.map((bloodbank) =>
      <div className="col-sm" key={bloodbank._id}>
        <Bloodbank
          ffp_0pos={bloodbank.ffp_0pos} ffp_0neg={bloodbank.ffp_0neg} ffp_Apos={bloodbank.ffp_Apos} ffp_Aneg={bloodbank.ffp_Aneg}
          ffp_Bpos={bloodbank.ffp_Bpos} ffp_Bneg={bloodbank.ffp_Bneg} ffp_ABpos={bloodbank.ffp_ABpos} ffp_ABneg={bloodbank.ffp_ABneg}

          pc_0pos={bloodbank.pc_0pos} pc_0neg={bloodbank.pc_0neg} pc_Apos={bloodbank.pc_Apos} pc_Aneg={bloodbank.pc_Aneg}
          pc_Bpos={bloodbank.pc_Bpos} pc_Bneg={bloodbank.pc_Bneg} pc_ABpos={bloodbank.pc_ABpos} pc_ABneg={bloodbank.pc_ABneg}
        />
      </div>
    );

    return (list);
  }


  bloodreqList = () => {
    const list = this.state.bloodreq.map((bloodreq) =>
      <div className="col-sm" key={bloodreq._id}>
        <Bloodreq 
        req_date = {bloodreq.req_date} req_time = {bloodreq.req_time} blood_type_name = {bloodreq.blood_type_name}
        units = {bloodreq.units} requester_name = {bloodreq.requester_name} req_status = {bloodreq.req_status}
        />
      </div>
    );

    return (list);
  }


   render() {
     return (
       <div className="App">
         <div className="App-header">
           <img src={logo} className="App-logo" alt="" />
           <h2>National Blood Bank</h2>
         </div>
         <div>
           <h1>STORAGE</h1>
           {this.bloodbankList()}
           <div>
             <h2>FFP: Fresh Frozen Plasma PC: Platelet concentrate</h2>
           </div>
         </div>
      <div className="App-main">
        <div className = "table">
        <table>
          <thead>
                    <tr >
                      <div className="col-sm">
                        <td >Request Date</td>
                        <td >Request Time</td>
                        <td>Blood Type</td>
                        <td >Unit(s)</td>
                        <td >Requester Name</td>
                        <td >Request Status</td>

                      </div>

                    </tr>
                </thead> 
          </table>
          <div className = "table">
          {this.bloodreqList()}
          </div>
          
          
        </div>
      </div>
       </div>
     );
   }
 /*

  render() {
    return (
      <div className="App-main">
        <div className = "table">
        <table>
          <thead>
                    <tr>
                        <td>Request Date</td>
                        <td>Request Time</td>
                        <td>Blood Type</td>
                        <td>Unit(s)</td>
                        <td>Requester Name</td>
                        <td>Request Status</td>
                    </tr>
                </thead> 
          </table>
          <table>
          {this.bloodreqList()}
          </table>
        </div>
      </div>
    );
  }
*/


}





/*function App() {

  constructor(props){
    super(props);
    http.getBloodReqs();
  }

 


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>This is the National-BloodBank</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          //href="https://reactjs.org"
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
