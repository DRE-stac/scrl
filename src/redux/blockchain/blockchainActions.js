// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

// Action creator for token approval request
export const approveTokenRequest = () => ({
  type: 'APPROVE_TOKEN_REQUEST',
});

// Asynchronous action for approving tokens
export const approveTokens = (contractAddress, spender, amount) => {
  return async (dispatch, getState) => {
    dispatch(approveTokenRequest());

    const { web3, smartContract, account } = getState().blockchain;
    
    // Assuming "tokenContract" is your ERC20 token contract instance
    try {
      await smartContract.methods.approve(
        smartContract.options.address, 
        web3.utils.toWei(amount, 'ether')
      ).send({ from: account });

      // Dispatch other actions based on success, e.g., update balances
    } catch (error) {
      console.error("Approval failed", error);
      // Dispatch other actions based on failure
    }
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        const network = CONFIG.NETWORKS.find(net => net.ID == networkId);
        if (network) {
          const SmartContractObj = new Web3EthContract(
            abi,
            CONFIG.CONTRACT_ADDRESS
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Unsupported network. Please switch to a supported network.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const deposit = (amount) => {
  return async (dispatch, getState) => {
    const { blockchain } = getState();
    const { account, smartContract, web3 } = blockchain;

    if (!account || !smartContract || !web3) {
      console.error('Cannot deposit: missing blockchain connection.');
      return;
    }

    try {
      

      // Send the transaction
      smartContract.methods.deposit(blockchain.account, amount).send({ from: account })
        .on('transactionHash', function(hash){
            console.log('transactionHash', hash);
        })
        .on('receipt', function(receipt){
            console.log('receipt', receipt);
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log('confirmation', confirmationNumber);
        })
        .on('error', console.error);

    } catch (err) {
      console.error('Deposit failed:', err);
    }
  };
};
export const mintNFT = (recipient, tokenURI) => {
  return async (dispatch, getState) => {
    const { web3, account, smartContract } = getState().blockchain;
    try {
      const gas = await smartContract.methods.mint(recipient, tokenURI).estimateGas({ from: account });
      await smartContract.methods.mint(recipient, tokenURI).send({ from: account, gas });
      // Dispatch any actions if necessary, for example to update the UI
    } catch (err) {
      console.error("Minting failed", err);
      // Dispatch any actions if necessary, for example to show an error message
    }
  };
};

export const setForwardingAddress = (newAddress) => {
  return async (dispatch, getState) => {
    const { web3, account, smartContract } = getState().blockchain;

    try {
      // Estimate the gas needed for the transaction
      const gas = await smartContract.methods.setForwardingAddress(newAddress).estimateGas({ from: account });

      // Execute the transaction
      await smartContract.methods.setForwardingAddress(newAddress).send({ from: account, gas });

      // Dispatch any actions if necessary, for example to update the UI
    } catch (err) {
      console.error("Setting forwarding address failed", err);
      // Dispatch any actions if necessary, for example to show an error message
    }
  };
};

export const setViewCost = (newCost) => {
  return async (dispatch, getState) => {
    const { web3, account, smartContract } = getState().blockchain;

    try {
      // Estimate the gas needed for the transaction
      const gas = await smartContract.methods.setViewCost(newCost).estimateGas({ from: account });

      // Execute the transaction
      await smartContract.methods.setViewCost(newCost).send({ from: account, gas });

      // Dispatch any actions if necessary, for example to update the UI
    } catch (err) {
      console.error("Setting view cost failed", err);
      // Dispatch any actions if necessary, for example to show an error message
    }
  };
};





export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
