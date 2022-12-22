//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Structs.sol";

    contract Storage {

        mapping(bytes32 => Structs.WarrantyCard) internal warrantycards;
        mapping(bytes32 => Structs.Buyer) internal buyers;
    }
