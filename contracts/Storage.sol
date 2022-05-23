//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Structs.sol";

    contract Storage {

        mapping(bytes32 => Structs.Publisher) internal Publishers;
        mapping(bytes32 => Structs.Reviewer) internal Reviewers;
        mapping(bytes32 => Structs.ResearchDocument) internal ResearchDocuments;
    }
