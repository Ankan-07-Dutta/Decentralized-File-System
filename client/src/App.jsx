import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//   const loadProvider = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);

//         const accounts = await provider.listAccounts();
//         let userAccount;

//         if (accounts.length === 0) {
//           try {
//             const newAccounts = await provider.send("eth_requestAccounts", []);
//             userAccount = newAccounts[0];
//           } catch (err) {
//             if (err.code === -32002) {
//               console.error("MetaMask request already pending. Please check your wallet.");
//               alert("MetaMask request already pending. Please check your wallet.");
//             } else {
//               console.error("MetaMask connection error:", err);
//               alert("Error connecting to MetaMask.");
//             }
//             return;
//           }
//         } else {
//           userAccount = accounts[0];
//         }

//         setAccount(userAccount);

//         const signer = provider.getSigner();
//         const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//         const contract = new ethers.Contract(
//           contractAddress,
//           Upload.abi,
//           signer
//         );

//         setContract(contract);
//         console.log("Contract loaded:", contract);
//       } catch (error) {
//         // 🌟 Catch any unexpected errors here
//         console.error("Unexpected error during wallet connection:", error);
//         alert("Something went wrong connecting to wallet.");
//       }
//     } else {
//       alert("Please install MetaMask!");
//     }
//   };

//   loadProvider();
// }, []);

useEffect( ()=> {

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const loadProvider = async ()=> {
    if(provider){

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      })
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      //let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

      const contract = new ethers.Contract(
        contractAddress, Upload.abi, signer
      )

      //console.log(contract);
      
      setContract(contract);
      setProvider(provider);
    } else {
      console.error(" Metamask is not installed");
      
    }
  }


  provider && loadProvider();
},[]);


  return (
    <>
    {
      !modalOpen && (<button className='share' onClick={()=> setModalOpen(true)}>Share</button>)
    }{" "}
    {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      <div className="App">
      <h1 style={{color: 'white'}}>Decentralized File System</h1>
      <div className='bg'></div>
      <div className='bg bg2'></div>
      <div className='bg bg3'></div>
      <p style={{color: 'white'}}> Account : {account ? account : "Not Connected, please connect Metamask account"}</p>
      <FileUpload
        account= {account}
        provider = {provider}
        contract = {contract}></FileUpload>

        <Display
         contract={contract}
         account={account}>

        </Display>
    </div>
    </>
    
  );
}

export default App;
