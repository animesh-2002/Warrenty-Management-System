import React, {useGlobal, useState} from "reactn";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import ".//navbar.css"
import { useEffect } from "react";
const NavbarComponent = () => {
    const [account, setAccount] = useGlobal('account');
    const [chainId, setChainId] = useGlobal('chainId');

    const onClickConnect = async (event) => {
        event.preventDefault();
        try{
            if (window.ethereum){
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const chainId = await window.ethereum.request({ method: "eth_chainId" });
                await setChainId(chainId);
                await setAccount(accounts[0]);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const onClickDisconnect = async (event) => {
        try {
            event.preventDefault();
            await setAccount(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                setAccount(accounts[0]);
            });
        }
    }, [account]);

    return (
        <Navbar expand="lg" className="navigation-bar">
        <Container>
        <Navbar.Brand href="#home">AcademiaW3</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="registerBuyer">Buyer</Nav.Link>
            <Nav.Link href="claimWarranty">claimWarranty</Nav.Link>
            <Nav.Link href="registerWarrantyCard">WarrantyCard</Nav.Link>
            <Nav.Link href="destroyWarranty">destroyWarrantyCard</Nav.Link>
            {!!account ? (<button className="connect-wallet" onClick={onClickDisconnect}>Disconnect wallet</button>) : (<button className="connect-wallet" onClick={onClickConnect}>Connect wallet</button>)}
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default NavbarComponent

