// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

contract DevToken {
  address public minter;
  mapping(address => uint) balances;

  event Sent(address sender, address receiver, uint numTokens);

  constructor () {
    minter = msg.sender;
  }

  function mintToken(address receiver, uint numTokens) public {
    require(msg.sender == minter);
    balances[receiver] += numTokens;
  }

  function send(address receiver, uint numTokens) public {
    require(balances[msg.sender] >= numTokens);
    balances[receiver] += numTokens;
    balances[msg.sender] -= numTokens;
    emit Sent(msg.sender, receiver, numTokens);
  }
}