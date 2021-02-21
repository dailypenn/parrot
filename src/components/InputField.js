import React, { useState } from 'react';
import s from 'styled-components'
import MDEditor from '@uiw/react-md-editor';
//import { BoldText, RegularText } from './shared.js'

const Wrapper = s.div`
  margin: auto;
  width: 92%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #333;
  padding: 0.8rem;
  border-radius: 8px;
`
const Title = s.div`
    font-family: "futura-pt", sans-serif;
    color: #fff;
    font-weight: 100;
    font-size: 30px;
    line-height: 1.2;
`
const Info = s.div`
    font-family: "futura-pt", sans-serif;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.2;
    padding-top: 0.2rem;
    padding-bottom: 0.8rem;
    font-style: italic;
`

function setData(section, title, data, value) {
    if (title == "content") {
        data[0][section][title]=value.trim().split("\n\n");
    } else {
        data[0][section][title]=value.trim();
    }
}

const InputField = ({ section, title, info, data }) => {
    const [value, setValue] = useState("");

    var explanation = info !== undefined ? info : ""

    return (
        <Wrapper>
            <Title>{section + " - " + title}</Title>
            <Info>
                <MDEditor.Markdown source={explanation} />
            </Info>
            <MDEditor
                value={value}
                onChange={setValue}
                onBlur={setData(section, title, data, value)}
            />
        </Wrapper>
    )
}

export default InputField