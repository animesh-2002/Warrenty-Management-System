import React, {useGlobal,getGlobal, useState, useEffect} from "reactn"
import "./ClaimWarrantyCard.css";
import WarrantyManagementArtifact from "../../contracts/WarrantyManagement.json"
import WarrantyManagement from "../../contracts/contract-address.json"

const ClaimWarrantyCard = () => {

    const [account] = useGlobal("account");
    const [web3, setWeb3] = useGlobal("web3");
    const [transactionHash, setTransactionHash] = useState("");
    const [data, setData] = useState({
        buyerId : "",
        warrantyCardId : "",
    })

    const handleInputChange = (event) => {
        setData((prev) => ({
            ...prev,
            [event.target.id]: event.target.value
        }));
    };

    if(web3) {
        console.log("web3 is defined");
        }

    const handleSubmit = async (event) => {
        let {
            buyerId,
            warrantyCardId,
        } = data;
        event.preventDefault();
        console.log(data)
        const contract = new web3.eth.Contract(
            WarrantyManagementArtifact.abi,
            WarrantyManagement.warrantyManagement
        );
        await contract.methods.claimWarranty(
            
            buyerId,
            warrantyCardId,
        ).send({
            from: account,
            gas: "1000000",
            gasPrice: "10000000000"
        }).on("receipt", (receipt) => {
            setTransactionHash(receipt.transactionHash);
        }   );
    };

        
    return (
        !account ? (<div className="form"><div className="form-body">To Access a Form pls connect with wallet</div></div>) : !transactionHash ? <div className="form">
            <div className="form-body">
                <div className="buyer-Id">
                    <label className="form__label" for="Buyer Id">Buyer Id</label>
                    <input onChange={handleInputChange} className="form__input" type="text" id="buyerId" placeholder="buyerId"/>
                </div>
                <div className="warrantyCardId">
                    <label className="form__label" for="buyer-token-id">WarrantyCard Id</label>
                    <input onChange={handleInputChange} className="form__input" type="text" id="warrantyCardId" placeholder="warrantyCardId"/>
                </div>
            </div>
            <div className="form-footer">
                <button onClick={handleSubmit} className="form__button">Claim WarrantyCard</button>
            </div>
        </div> : <div className="form">
        <div className="form-body">
            <div className="form__success">
                <p>
                    Transaction Successful!
                </p>
                <p>
                    Transaction Hash: 
                </p>
                <p>
                {transactionHash}
                </p>
            </div>
        </div>
    </div>
    );
    
}

export default ClaimWarrantyCard;