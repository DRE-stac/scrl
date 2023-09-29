const initialState = {
  loading: false,
  totalSupply: 0,
  cost: 0,
  error: false,
  errorMsg: "",
  owner: "",  
  feePercent: 0,  
  depositedBalances: {},
  paymentSchedule: {},
  isMinter: {},
  bookPrices: {},
  gasPrice: "",
  network: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        balances: action.payload.balances,
        blockNumber: action.payload.blockNumber,
        network: action.payload.network,
        gasPrice: action.payload.gasPrice,
        error: false,
        errorMsg: "",
      };
    case "FETCH_OWNER_SUCCESS":
      return {
        ...state,
        loading: false,
        owner: action.payload,
        error: false,
        errorMsg: "",
      };
    case "FETCH_FEE_PERCENT_SUCCESS":
      return {
        ...state,
        loading: false,
        feePercent: action.payload,
        error: false,
        errorMsg: "",
      };
    case "FETCH_DEPOSITED_BALANCES_SUCCESS":
      return {
        ...state,
        loading: false,
        depositedBalances: action.payload,
        error: false,
        errorMsg: "",
      };
    case "FETCH_PAYMENT_SCHEDULE_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentSchedule: action.payload,
        error: false,
        errorMsg: "",
      };
    case "FETCH_IS_MINTER_SUCCESS":
      return {
        ...state,
        loading: false,
        isMinter: action.payload,
        error: false,
        errorMsg: "",
      };
    case "FETCH_BOOK_PRICES_SUCCESS":
      return {
        ...state,
        loading: false,
        bookPrices: action.payload,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
