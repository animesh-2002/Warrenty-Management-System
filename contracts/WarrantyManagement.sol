//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import "./WarrantyManagementNFT.sol";
import "./Storage.sol";

contract WarrantyManagement is WarrantyManagementNFT, Storage {


    event WarrantyCardRegistered(bytes32 id, address serielNumber, string metdata, uint256 creation_time);
    event BuyerRegistered(bytes32 id, address buyerWallet, string email_id, string contact_number, uint256 creation_time);
    event ResearchDocumentCreated(bytes32 id, bytes32 publisher, uint256 timestamp, string uri);

    constructor() WarrantyManagementNFT("WarrantyManagement", "WMM"){

    }

    function registerWarrantyCard(bytes32 buyerId, uint256 tokenId, string memory serielNumber, uint256 validity, string memory metadata ) external returns(bool){

        Structs.Buyer storage buyer = buyers[buyerId];
        require(buyers[buyerId].buyer != address(0), "buyer does exists");
        bytes32 warrantyCardId = keccak256(abi.encodePacked(buyerId, serielNumber));
        Structs.WarrantyCard memory warrantycard = Structs.WarrantyCard(buyer.buyer, serielNumber , block.timestamp, validity, 0, metadata);
        warrantycards[warrantyCardId] = warrantycard;
        buyer.total_number_of_products += 1;
        buyer.warrantycards[buyer.total_number_of_products] = warrantycard;
        emit WarrantyCardRegistered(warrantyCardId,buyer.buyer, metadata, block.timestamp);
        _mintToken(buyer.buyer, tokenId, metadata);
        return true;
    }

    function registerBuyer(bytes32 id, string memory email, string memory buyer_address ) external returns(bool) {
        Structs.Buyer storage buyer = buyers[id];
        require(buyers[id].buyer == address(0), "address already registered");
        buyer.buyer = msg.sender;
        buyer.email_id = email;
        buyers[id].contact_number = buyer_address;

        emit BuyerRegistered(id, buyer.buyer, email, buyer_address, block.timestamp);
        return true;
    }

    function claimWarranty(bytes32 buyerId, bytes32 warrantyCardId) external {
        Structs.WarrantyCard storage warrantyCard = warrantycards[warrantyCardId];
        Structs.Buyer storage buyer = buyers[buyerId];
        require(buyer.buyer == warrantyCard.buyer, "Buyer does not own this warranty card");
        require(warrantyCard.warrantyValidity > block.timestamp,"warrenty Card is Expired");
        require(warrantyCard.service_issued < 3, "All services issued");
        warrantyCard.service_issued += 1;
    }

    function destroyWarrantyCard(uint256 warrantyCardNumber, bytes32 buyerId) external {
        Structs.Buyer storage buyer = buyers[buyerId];
        require(buyer.warrantycards[warrantyCardNumber].warrantyValidity< block.timestamp,"warranty Card still Valid");
        _burn(warrantyCardNumber);
        delete buyer.warrantycards[warrantyCardNumber];
    }

    function isOwner(bytes32 warrantyCardId) external view returns(bool) {
        Structs.WarrantyCard storage warrantyCard = warrantycards[warrantyCardId];
        if(warrantyCard.buyer == msg.sender)
        {
            return true;
        }
        return false;
    }


    
}
