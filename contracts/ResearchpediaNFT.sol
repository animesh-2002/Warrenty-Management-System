//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ACL.sol";

contract ResearchpediaNFT is ERC721URIStorage, ACL {
    address deployer = address(0);

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        deployer = _msgSender();
    }

    function _mintToken(address _to, uint256 _tokenId, string memory _uri) internal {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }



 function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl, ERC721) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
