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

const fetchNFTMetadata = (tokenURI) => {
  return async (dispatch) => {
    try {
      const metadata = await axios.get(tokenURI);
      dispatch({
        type: "FETCH_NFT_METADATA_SUCCESS",
        payload: metadata.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_NFT_METADATA_FAILED",
        payload: error.message,
      });
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


// Action Type
const FETCH_NFTS_REQUEST = "FETCH_NFTS_REQUEST";
const FETCH_NFTS_SUCCESS = "FETCH_NFTS_SUCCESS";
const FETCH_NFTS_FAILED = "FETCH_NFTS_FAILED";

// Action Creator for Fetching NFTs
// Specify the desired collection address here
// Specify the desired collection address here
const DESIRED_COLLECTION_ADDRESS = "0x846b8114870A9dBB9dA855A7ec2fb28E5CCCA352";

export const fetchNFTs = (account) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_NFTS_REQUEST });
    console.log(`Fetching NFTs for account: ${account}`); // Log the account being queried

    try {
      const { smartContract } = getState().blockchain;
      console.log("Smart contract address:", smartContract.options.address); // Log the smart contract address

      // Assuming you have a method to get all token IDs for an account
      const tokenIds = await smartContract.methods.tokensOfOwner(account).call();
      console.log(`Found ${tokenIds.length} token(s) for account:`, tokenIds); // Log the token IDs found

      const nftData = await Promise.all(tokenIds.map(async (tokenId) => {
        // Confirm ownership
        const owner = await smartContract.methods.ownerOf(tokenId).call();
        console.log(`Token ID ${tokenId} is owned by: ${owner}`); // Log the owner of each token

        // Get token URI
        const tokenURI = await smartContract.methods.tokenURI(tokenId).call();
        console.log(`Token URI for ID ${tokenId}: ${tokenURI}`); // Log the token URI

        return { id: tokenId, tokenURI }; // Only return the data you need
      }));

      // Filter out nulls in case some tokens weren't owned by the user
      const ownedNFTs = nftData.filter(nft => nft !== null);
      console.log("Owned NFTs:", ownedNFTs); // Log the final filtered NFTs

      dispatch({ type: FETCH_NFTS_SUCCESS, payload: ownedNFTs });
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
      dispatch({ type: FETCH_NFTS_FAILED, payload: error.message });
    }
  };
};

// Replace this function with your actual logic for extracting the collection address
function extractCollectionFromURI(tokenURI) {
  // Implement your logic to extract the collection address from the tokenURI or another property
  // This could involve fetching the metadata from the URI and parsing the collection address
  return "ExtractedCollectionAddress";
}





export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
