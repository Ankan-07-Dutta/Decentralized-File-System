import React from 'react';
import { useEffect } from 'react';
import "./Modal.css";

const Modal = ({setModalOpen, contract}) => {
  const sharing = async()=>{
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    console.log("shared");
    
  };

  useEffect(()=> {
    const accessList = async()=> {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for(let i =0; i<options.length; i++){
        let opt = options[i];
        let element = document.createElement("option");
        element.textContent = opt;
        element.value = opt;
        select.appendChild(element);
      }
    }
    contract && accessList();
  },[]);

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='title'>
          Share with
        </div>
        <div className='body'>
          <input type="text" className='address' placeholder='Enter Address' />
        </div>
        <form id='myForm'>
          <select id="selectNumber">
            <option className='address'>
              People with access
            </option>
          </select>
        </form>
        <div className='footer'>
          <button onClick={()=> {setModalOpen(false)}}
            id='cancelBtn'>Cancel</button>
            <button onClick={()=> sharing()}>Share</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
