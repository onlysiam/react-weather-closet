import React from "react";
//styled
import styled from "styled-components";
const Alertemailexist = () => {
  return (
    <Body>
      <div className="alertText">
        <h1>Email Already Exist</h1>
        <p>The Email You Have Entered Is Already In Use.</p>
        <p> Please try a diffetent Email.</p>
      </div>
    </Body>
  );
};

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .alertText {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: -7vw;
    border-radius: 20px;
    background-color: rgba(255, 0, 0, 1);
    width: 80vw;
    height: 20vh;
    padding: 10px;
    h1 {
      text-align: center;
      font-size: 2.7vh;
      color: white;
    }
    p {
      text-align: center;
      font-size: 1.7vh;
      color: white;
    }
  }
`;

export default Alertemailexist;
