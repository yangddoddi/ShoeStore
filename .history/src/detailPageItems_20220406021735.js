import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
export { DetailPageItem };

let 박스 = styled.div`
  padding-top: 30px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

function DetailPageItem(props) {
  let { id } = useParams();
  let history = useHistory();
  let newProduct = props.product.find(function (e) {
    return e.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [inputVal, setInputVal] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setAlert(true);
    };
  }, []);

  return (
    <div className="container">
      <박스>
        <제목 color="black">Detail</제목>
      </박스>
      {inputVal}
      <input
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      {alert ? <div className="myAlert">almost out of stock</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              newProduct.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{newProduct.title}</h4>
          <p>{newProduct.content}</p>
          <p>{newProduct.price}</p>
          <StackInfo stock={props.stock[newProduct.id]} />
          <button
            className="btn btn-danger"
            onClick={() => {
              let stock = [...props.stock];
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

function StackInfo(props) {
  return <p>재고 : {props.stock}</p>;
}
