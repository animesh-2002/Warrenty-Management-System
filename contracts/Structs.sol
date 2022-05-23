//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Structs {

    struct Reviewer {
        bytes32 reviewer_id;
        address reviewer_wallet;
        string uri;
        string department;
    }

    struct Publisher {
        bytes32 publisher_id;
        address publisherWallet;
        string organization;
        string qualification;
        uint256 Reputation_points;
    }

    struct ResearchDocument {

        bytes32 researchdocument_id;
        bytes32 publisher_id;
        uint256 timestamp;
        uint256 trustscore;
        string uri;
    }
}