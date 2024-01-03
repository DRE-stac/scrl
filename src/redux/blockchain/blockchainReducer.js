// Action Types
const FETCH_NFTS_REQUEST = "FETCH_NFTS_REQUEST";
const FETCH_NFTS_SUCCESS = "FETCH_NFTS_SUCCESS";
const FETCH_NFTS_FAILED = "FETCH_NFTS_FAILED";


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
  userNFTs: [],  // Initialize userNFTs as an empty array
  transactionHistory: [],
  userNFTsMetadata: [],
  pendingTransactions: [],

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
      case FETCH_NFTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_NFTS_SUCCESS:
        return {
          ...state,
          loading: false,
          userNFTs: action.payload,  // Update the userNFTs with the fetched data
        };
      case FETCH_NFTS_FAILED:
        return {
          ...state,
          loading: false,
          errorMsg: action.payload,
        };
      case "FETCH_NFT_METADATA_SUCCESS":
      return {
        ...state,
        userNFTsMetadata: [...state.userNFTsMetadata, action.payload],
      };
       case "FETCH_NFT_METADATA_FAILED":
      // Handle error
      return {
        ...state,
        errorMsg: action.payload,
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
