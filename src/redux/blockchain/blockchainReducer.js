const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  web3: null,
  errorMsg: "",
  owner: "",  
  feePercent: 0,  
  depositedBalances: {},
  paymentSchedule: {},
  isMinter: {},
  bookPrices: {},
  gasPrice: null,
  network: null,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
        balances: action.payload.balances,
        blockNumber: action.payload.blockNumber,
        network: action.payload.network,
        gasPrice: action.payload.gasPrice,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
      case 'APPROVE_TOKEN_REQUEST':
  return {
    ...state,
    // Update state based on approval request, e.g., set a loading flag
  };
  case 'APPROVAL_SUCCESS':
    // Update state to reflect approval success
    break;
  case 'APPROVAL_FAILED':
    // Update state to reflect approval failure
    break;
    default:
      return state;
  }
};

export default blockchainReducer;
