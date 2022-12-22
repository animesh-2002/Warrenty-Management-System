import { useState } from "react";
import React, {useGlobal} from "reactn"
import ".//buyerForm.css"
import WarrantyManagementArtifact from "../../contracts/WarrantyManagement.json"
import warrantyManagement from "../../contracts/contract-address.json"

const BuyersTable = () => {
    const [account] = useGlobal("account");
    const [web3] = useGlobal("web3");
    const [transactionHash, setTransactionHash] = useState("");
    const [data, setData] = useState(
        {
            email : "",
            buyer_address : "",
        }
    )

    const handleInputChange = (event) => {
        setData((prev) => ({
            ...prev,
            [event.target.id]: event.target.value
        }));

    };

    if(web3)
    {
        console.log("web3 is defined");
    }

    const handleSubmit = async (event) => {
        let {
            email,
            buyer_address,
        } = data;
        event.preventDefault();
        console.log(data)
        const contract = new web3.eth.Contract(
            WarrantyManagementArtifact.abi,
            warrantyManagement.warrantyManagement
        );
        await contract.methods.registerBuyer(
            web3.utils.soliditySha3(account),
            email,
            buyer_address,
        ).send({
            from: account,
            gas: "2000000",
            gasPrice: "10000000000"
        }).on("receipt", (receipt) => {
            setTransactionHash(receipt.transactionHash);
        });
    };

    return (
        !account ? <div>
            <div className="form">
                <div className="form-body">
                    <p>
                        To Access a Form pls connect with wallet
                    </p>
        </div>
        </div>
        </div> : !transactionHash ? 
        <div className="form">
            <div className="form-body">
                <div className="buyer-email">
                    <label className="form__label" for="email">Buyer Email</label>
                    <input onChange={handleInputChange} className="form__input" type="text" id="email" placeholder="email"/>
                </div>
                <div className="buyer-address">
                    <label className="form__label" for="buyer_address">Buyer Address</label>
                    <input onChange={handleInputChange} className="form__input" type="text" id="buyer_address" placeholder="buyer_address"/>
                </div>
            </div>
            <div className="form-footer">
                <button onClick={handleSubmit} className="form__button">Add Buyer</button>
            </div>
        </div> : <div>
            <div className="form">
                <div className="form-body">
                    <p>
                        Transaction Successful
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

export default BuyersTable;