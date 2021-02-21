import React from 'react'
import { Helmet } from 'react-helmet'
import s from 'styled-components'
//import MDEditor from '@uiw/react-md-editor';
import InputField from '../components/InputField.js'
import { Navbar, Button } from 'react-bootstrap'

const IndexPage = () => {
  const fullTemplate = require('../templates/json/34st-2021s.json');

  //template removes explanations for inputs
  const template= {...fullTemplate}
  delete template["explanations"]

  var jsonData = [{}]

  Object.keys(template).map(function(key, i){
    jsonData[0][key]={};
    template[key].map(function(item){
      if (item == "content") {
        jsonData[0][key][item]=[];
      } else {
        jsonData[0][key][item]="";
      }
    })
  })

  function finalizeJSON() {
    Object.keys(jsonData[0]).map(function(key, i){
      template[key].map(function(item){
        if (item == "img") {
          jsonData[0][key][item]="../../../images" + jsonData[0]["social"]["slug"] + "/" + jsonData[0][key][item];
        }
      })
    })
  }

  function downloadJSON() {
    finalizeJSON()
    let filename = "export.json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(jsonData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(jsonData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
    
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Parrot | DP Tech</title>

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
      </Helmet>

      <Navbar
        sticky="top"
        expand="lg"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 5px 6px #00000029',
          fontSize: '0.9rem',
          flexDirection: 'row',
        }}
      >
        <img src={require('../../static/headerlogo.png')}  height="50"/>
      </Navbar>

      {
        Object.keys(template).map((key, index) => {
          return (
              template[key].map((item) => {
                return (
                  <div>
                    <InputField
                      section={key}
                      title={item}
                      info={fullTemplate["explanations"][item]}
                      data={jsonData}
                    />
                  </div>
                )
              })
          )
        })
      }

      <ButtonWrapper>
        <Button style={{boxShadow: '0px 5px 6px #555',}} onClick={downloadJSON} variant="info">Download JSON</Button>{' '}
      </ButtonWrapper>

    </>
  )
}

const ButtonWrapper = s.div`
  margin: auto;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default IndexPage


