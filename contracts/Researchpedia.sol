//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import "./ResearchpediaNFT.sol";
import "./Storage.sol";

contract Researchpedia is ResearchpediaNFT, Storage {

    event PublisherRegistered(bytes32 id, address publisherWallet, string organization, string qualification);
    event ReviewerRegistered(bytes32 id, address reviewerWallet, string uri, string department);
    event ResearchDocumentCreated(bytes32 id, bytes32 publisher, uint256 timestamp, string uri);

    constructor() ResearchpediaNFT("REPEDIA", "RPD"){

    }

    function registerPublisher(bytes32 id, string memory organization, string memory qualification) external returns(bool){

        Structs.Publisher memory publisher = Structs.Publisher(id, _msgSender() , organization, qualification, 0);
        Publishers[id] = publisher;
        emit PublisherRegistered(id, _msgSender(), organization, qualification);
        return true;
    }

    function registerReviewer(bytes32 id, string memory uri, string memory department) external returns(bool) {
        Structs.Reviewer memory reviewer = Structs.Reviewer(id, _msgSender(), uri, department);
        Reviewers[id] = reviewer;
        emit ReviewerRegistered(id, _msgSender(), uri, department);
        return true;
    }

    function publishResearchDocument(bytes32 id, bytes32 publisher_id, string memory uri) external {
        require(Publishers[publisher_id].publisherWallet == _msgSender(), "Researchpedia : Publisher Does not exist");
        Structs.ResearchDocument memory researchdocument = Structs.ResearchDocument(id, publisher_id, block.timestamp, 0, uri);
        ResearchDocuments[id] = researchdocument;
        emit ResearchDocumentCreated(id, publisher_id, block.timestamp, uri);
        // TODO : find a better way to assign tokenId
        _mintToken(_msgSender(),block.number, uri);
    }


    
}