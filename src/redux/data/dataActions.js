// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();

      // Fetch the balances of the tokens
      const balances = {};
      for (let token of ['ETH', 'USDC', 'MATIC', 'OP']) {
        if (token === 'ETH') {
          balances[token] = await store.getState().blockchain.web3.eth.getBalance(store.getState().blockchain.account);
        } else {
         

    // Call the balanceOf function
    const balance = await tokenContract.methods.balanceOf(store.getState().blockchain.account).call();

    balances[token] = balance;
        }
      }

      // Fetch the other cool info
      const blockNumber = await store.getState().blockchain.web3.eth.getBlockNumber();
      const network = await store.getState().blockchain.web3.eth.net.getNetworkType();
      const gasPrice = await store.getState().blockchain.web3.eth.getGasPrice();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          balances,
          blockNumber,
          network,
          gasPrice,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
