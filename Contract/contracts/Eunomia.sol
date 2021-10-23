// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Eunomia {
     
    uint256 total_paid;
    uint256 total_weight;
    uint256 total_dump;

    constructor() payable {
        total_weight = 0;
        total_paid = 0;
        total_dump = 0;

        console.log("We have been constructed!");
    }


    function send_eth( uint256 trash_type, uint256 weight) public{
        uint256 prizeAmount = (trash_type*75 + weight*25)*0.000001 ether;
        total_weight += weight;
        total_paid += prizeAmount;
        total_dump += 1;

        require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
    }

    function get_weight() public view returns (uint256){
        return total_weight;
    }

    function get_paid() public view returns (uint256){
        return total_paid;
    }

    function get_dump() public view returns (uint256){
        return total_dump;
    }

}

