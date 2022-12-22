//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Structs {

    struct WarrantyCard {
        address buyer;
        string productSerielNumber;
        uint256 purchaseTime;
        uint256 warrantyValidity;
        uint256 service_issued;
        string metadata;
    }

    struct Buyer {
        address buyer;
        string email_id;
        string contact_number;
        uint256 total_number_of_products;
        mapping(uint256 => WarrantyCard) warrantycards;
    }
}