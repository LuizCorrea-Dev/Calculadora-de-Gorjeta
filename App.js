import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components/native';


const Page = styled.SafeAreaView`
  flex:1;
  align-items:center;
`;
const HeaderText = styled.Text`
  margin-top:20px;
  font-size: 25px;
`;
const Input = styled.TextInput`
  height:50px;
  width: 90%;
  font-size:18px;
  margin-top:20px;
  border-radius:10px;
  background-color: #eee;
  padding:10px;
`;
const ResultArea = styled.View`
  margin-top:30px;
  background-color:#eee;
  padding:20px;
  justify-content: center;
  align-items:center;
  width: 100%;
`;
const ResultItemTitle = styled.Text`
  font-size:18px;
  font-weight:bold;
`;
const ResultItem = styled.Text`
  font-size:15px;
  margin-bottom: 20px;
`;

const PctArea = styled.View`
  flex-direction:row;
  width: 90%;
  justify-content: space-around;
  margin: 20px;
`;
const PctItem = styled.Text`
  padding-top: 15px;
  text-align:center;
  width:50px;
  height:50px;
  border-radius:25px;
  background-color: #16a5cc;
  color:#fff;
`;
const total = styled.Text`
  font-weight:bold;
`;

export default () => {
  const [ bill, setBill ] = useState(''); // valor ca conta
  const [ tip, setTip ] = useState(0); // valor do desconto
  const [ pct, setPct ] = useState(10); // valor padrão do desconto

  const calc = () => {
    let nBill = parseFloat(bill); // transforma em numero

    if(nBill) {
      setTip( nBill * (pct/100))
    }
  }

  useEffect(()=>{
    calc();
  }, [pct, bill]);

  return (
    <Page>
      <HeaderText>Calculadora de Gorjeta</HeaderText>
      <Input 
        placeholder="Quanto ficou a conta?"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={bill}
        onChangeText={n=>setBill(n)}
      />

      <PctArea>
        <PctItem title="5%" onPress={()=>setPct(5)}>5%</PctItem>
        <PctItem title="10%" onPress={()=>setPct(10)}>10%</PctItem>
        <PctItem title="15%" onPress={()=>setPct(15)}>15%</PctItem>
        <PctItem title="20%" onPress={()=>setPct(20)}>20%</PctItem>
      </PctArea>

 
        {tip != '' && bill>0 &&
        <ResultArea>
          <ResultItemTitle>Valor da Conta</ResultItemTitle>
          <ResultItem>R$ {parseFloat(bill).toFixed(2)}</ResultItem>

          <ResultItemTitle>Valor da Gorjeta</ResultItemTitle>
          <ResultItem>R$ {tip.toFixed(2)}   {pct}%</ResultItem>

          <ResultItemTitle>Valor Total</ResultItemTitle>
          <ResultItem >R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultItem>
        </ResultArea>
      }
    </Page>
  );
}
