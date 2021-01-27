import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, Row, Col} from 'react-onsenui';
import {notification} from 'onsenui';

import "./style.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //空白=0、〇=1、✕=2
    this.state = {
      data: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      turn:0,
    };

    this.getMassDate = this.getMassDate.bind(this);
    this.markSet = this.markSet.bind(this);
    this.Align = this.Align.bind(this);
  }

  getMassDate(value){

    if(value == 1){
      return "〇";
    }

    if(value == 2){
      return "×";
    }

    return "";

  }

  markSet(va, si) {
      var s = this.state; // stateの内容を取得
      if(this.state.data[va][si] != 0){
        return;
      }

      if(s.turn % 2 == 0){
        s.data[va][si] = 1;
      }

      else{
        s.data[va][si] = 2;
      }

      s.turn += 1;

      this.setState(s);

    var result = this.Align();
    console.log(result);

    if(result == 1){
      notification.alert('〇の勝ち');
    }

    if(result == 2){
      notification.alert('✕の勝ち');
    }

    if(result == 3){
      notification.alert('引き分け');
    }
  }


  Align() {
    var data = this.state.data;
    //横が揃っていたら・・・
     if(data[0][0] == data[1][0] && data[2][0] == data[1][0]  && data[1][0] !=0 )
    {
      return data[1][0];
    }

    if(data[0][1] == data[1][1] && data[2][1] == data[1][1]  && data[2][1] !=0)
    {
      return data[1][1];
    }

    if(data[0][2] == data[1][2] && data[2][2] == data[1][2]  && data[1][2] !=0)
    {
      return data[1][2];
    }

    if(data[0][0] == data[0][1] && data[0][2] == data[0][1]  && data[0][1] !=0)
    {
      return data[0][1];
    }

    if(data[1][0] == data[1][1] && data[1][1] == data[1][2]  && data[1][1] !=0)
    {
      return data[1][1];
    }

    if(data[2][0] == data[2][1] && data[2][1] == data[2][2]  && data[2][1] !=0)
    {
      return data[2][1];
    }

    if(data[0][0] == data[1][1] && data[1][1] == data[2][2]  && data[1][1] !=0)
    {
      return data[1][1];
    }

    if(data[0][2] == data[1][1] && data[1][1] == data[2][0]  && data[1][1] !=0)
    {
      return data[1][1];
    }

    var i,j;
    for(i=0;i<3;i++){
      for(j=0;j<3;j++){
        if(data[i][j] == 0){
          return 0;
        }
      }
    }

    return 3;
  }



  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>〇✕ゲーム</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <div className="sample">
          <Row>
            <Col className="Box" onClick={() => this.markSet(0, 0)}>{this.getMassDate(this.state.data[0][0])}</Col>
            <Col className="Box" onClick={() => this.markSet(0, 1)}>{this.getMassDate(this.state.data[0][1])}</Col>
            <Col className="Box" onClick={() => this.markSet(0, 2)}>{this.getMassDate(this.state.data[0][2])}</Col>
          </Row>
          <Row>
            <Col className="Box" onClick={() => this.markSet(1, 0)}>{this.getMassDate(this.state.data[1][0])}</Col>
            <Col className="Box" onClick={() => this.markSet(1, 1)}>{this.getMassDate(this.state.data[1][1])}</Col>
            <Col className="Box" onClick={() => this.markSet(1, 2)}>{this.getMassDate(this.state.data[1][2])}</Col>
          </Row>
          <Row>
            <Col className="Box" onClick={() => this.markSet(2, 0)}>{this.getMassDate(this.state.data[2][0])}</Col>
            <Col className="Box" onClick={() => this.markSet(2, 1)}>{this.getMassDate(this.state.data[2][1])}</Col>
            <Col className="Box" onClick={() => this.markSet(2, 2)}>{this.getMassDate(this.state.data[2][2])}</Col>
          </Row> 
        </div>        
      </Page>
    );
  }
}