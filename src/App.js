import { useState, useEffect } from 'react';
import { BUSD, PRESALE, LINGO } from './interact';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [walletstring, setWalStr] = useState('Connect Wallet')
  const [buyflag, setBuy] = useState(false)
  const [claimflag, setClaim] = useState(false)
  const [account, setAccount] = useState('')
  const [rewardValue, setRewardValue] = useState(0)
  const [wladdresses, setWladdresses] = useState([])

  const buyLINGO = async () => {
    if (account === '') {
      toast(<div style={{ "color": "red" }}>Please connect wallet first.</div>)
      return
    }


    // const web3 = new Web3(Web3.givenProvider);

    // const data = BUSD.methods.approve(PRESALE._address, ethers.parseEther("10000")).encodeABI();
    // const n = await web3.eth.getTransactionCount(account);
    // const tx = {
    //   from: account,
    //   data: data,
    //   value: 0,
    //   gas: 1000000,
    //   gasPrice: 2000000000,
    //   nonce: n
    // }

    // const res = await web3.eth.accounts.signTransaction(tx, "1be87e829527b95cdde555f2176a911a2db8dd6bdadb92906a2aebfddc5f289f");
    // console.log(res);

    // var method = 'eth_signTypedData_v4';
    // var params = [account, JSON.stringify(tx)];
    // web3.currentProvider.sendAsync({
    //   method,
    //   params,
    //   account,
    // }, function (err, result) {
    //   if (err) return console.dir(err)
    //   if (result.error) {
    //     alert(result.error.message)
    //   }
    //   if (result.error) return console.error('ERROR', result)
    //   console.log('TYPED SIGNED:' + JSON.stringify(result.result))
    // })


    const busdAmount = document.getElementsByTagName('input')[0].value
    await BUSD.methods.approve(PRESALE._address, ethers.parseEther(busdAmount)).send({ from: account }, function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("Hash of the transaction: " + res)
      const link = 'https://bscscan.com/tx/' + res
      toast(<a href={link} target="_blank" style={{ "color": "green" }} rel="noreferrer"><div>View Transaction</div></a>)
    });
    
    await PRESALE.methods.Buy(ethers.parseUnits(busdAmount, 'gwei')).send({ from: account }, function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      const link = 'https://bscscan.com/tx/' + res

      toast(<a href={link} target="_blank" style={{ "color": "green" }} rel="noreferrer"><div>View Transaction</div></a>)

      console.log("Hash of the transaction: " + res)
    })
    setBuy(false)


  }

  const claim = async () => {

    await LINGO.methods.claimReward().send({ from: account }, function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      const link = 'https://bscscan.com/tx/' + res

      toast(<a href={link} target="_blank" style={{ "color": "green" }} rel="noreferrer"><div>View Transaction</div></a>)

      console.log("Hash of the transaction: " + res)
    })
    setClaim(false)
  }

  const connectWallet = () => {
    const { ethereum } = window;
    var accounts;
    if (!ethereum) {
      toast(<div style={{ "color": "red" }}>Please install Metamask!</div>)
    }
    // , params: [{ chainId: '0x61' }] 
    try {
      ethereum.request({ method: 'eth_requestAccounts' }).then(
        (res) => {
          accounts = res

          // for (let i = 0; i < wladdresses.length; i++) {
          //   if (wladdresses[i].toUpperCase() === accounts[0].toUpperCase()) {
          setWalStr(accounts[0].substr(0, 6) + '..' + accounts[0].substr(-4))
          setAccount(accounts[0])
          return
          // }
          // }
          // toast(<div style={{ "color": "red" }}>You can get $LINGO from next week.</div>)
        }
      )
    }
    catch (err) {
      console.log(err)
    }
  }

  function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
          const addresses = allText.split('\n')
          setWladdresses(addresses)
        }
      }
    }
    rawFile.send(null);
  }

  useEffect(() => {
    readTextFile('WL Lingo.txt')
  }, [])

  return (
    <div className='container'>
      <div className='subcontainer'>
        <div className='leftbox'>
          <div className='title'>BUY LINGO</div>
          <div className='description'>Welcome to LINGO GAMES. You can now deposit your BUSD to get your $LINGO.</div>
          <a href='https://lingo-games.gitbook.io/lingo-games/' target="_blank" rel="noreferrer">
            <button className='ms-btn'>Whitepaper</button></a>
          <button className='ms-btn connectbtn' id='connect' onClick={() => connectWallet()}>{walletstring}</button>
          <hr />
          <div className='row'>
            <div className='smallbox'>
              <div className='big'>40K+</div>
              <div className='description'>Creative</div>
            </div>
            <div className='smallbox'>
              <div className='big'>130K+</div>
              <div className='description'>Artwork</div>
            </div>
            <div className='smallbox'>
              <div className='big'>20K+</div>
              <div className='description'>Auctions</div>
            </div>
          </div>
        </div>

        <div className='rightbox'>
          <div className='buybox'>
            <div className='lingologo'></div>
            <div className='responsive'>
              <a href='https://lingo-games.gitbook.io/lingo-games/' target="_blank" rel="noreferrer">
                <button className='ms-btn res'>Whitepaper</button></a>
              <button className='ms-btn res connectbtn' id='connect' onClick={() => connectWallet()}>{walletstring}</button>
            </div>

            <div className='botton'>
              <div className='big lingotoken'>LINGO TOKEN</div>
              <div className='description sellprice'>Sell Price</div>
              <div className='price'>0.003 BUSD<span>(Limit $3000/wallet)</span> </div>

              {
                buyflag ? (<div><input className='inputAmount' placeholder='BUSD amount'></input>
                  <button className='ms-btn bt' onClick={() => buyLINGO()}>Confirm</button></div>)
                  :
                  (
                    claimflag ? (<div><input className='inputAmount' disabled value={rewardValue}></input>
                      <button className='ms-btn bt' onClick={() => claim()}>Claim</button></div>) :
                      (<div><button className='ms-btn bt' onClick={() => setBuy(true)}>BUY</button>
                        <button className='ms-btn bt bt1' onClick={async () => {
                          if (account === '') {
                            toast(<div style={{ "color": "red" }}>Please connect wallet first.</div>)

                            return
                          }
                          setRewardValue(await LINGO.methods.rewardBalance(account).call())

                          setClaim(true)
                        }}>REWARD</button></div>))
              }
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
