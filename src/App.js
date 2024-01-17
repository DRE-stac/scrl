import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, List, ListItem, ListItemText, Typography,
  createMuiTheme, ThemeProvider, Grid, Paper, Slide, Select, MenuItem,
  InputLabel, FormControl, IconButton, Zoom, Fade, makeStyles, Tooltip,
  Drawer, AppBar, Toolbar, BottomNavigation, BottomNavigationAction, CssBaseline,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tabs, Tab, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DepositIcon from '@material-ui/icons/AccountBalanceWallet';
import ExecuteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import WithdrawIcon from '@material-ui/icons/MoneyOff';
import TransferIcon from '@material-ui/icons/Send';
import MintIcon from '@material-ui/icons/Brush';
import SetAddressIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import LinkIcon from '@material-ui/icons/Link';
import ApproveIcon from '@material-ui/icons/CheckCircleOutline';
import ViewSetIcon from '@material-ui/icons/Visibility';
import BurnIcon from '@material-ui/icons/Whatshot';
import BurnNFTIcon from '@material-ui/icons/Cancel';
import CreateCollectionIcon from '@material-ui/icons/CreateNewFolder';
import OpenChannelIcon from '@material-ui/icons/OpenInNew';
import CloseChannelIcon from '@material-ui/icons/Close';
import ContractABI from './abi.js';
import axios from 'axios';
import UserNFTsDisplay from './UserNFTsDisplay'; // Adjust the path as necessary

import { useDispatch, useSelector } from "react-redux";
import { connect, mintNFT } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import { fetchNFTs } from "./redux/blockchain/blockchainActions";

function HowToUseDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>How to Use</DialogTitle>
      <DialogContent>
        <DialogContentText>
          // Your "How to Use" content goes here...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}



const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#f44336',
    },
  },
  spacing: 8,
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  disabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.12) !important',
    color: 'rgba(255, 255, 255, 0.5) !important',
    border: '1px solid rgba(255, 255, 255, 0.12) !important',
    cursor: 'not-allowed !important',
  },
});

function App() {
  const classes = useStyles();
  const [token, setToken] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [start, setStart] = useState('');
  const [interval, setInterval] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [forwardAddress, setForwardAddress] = useState('');
  const [spender, setSpender] = useState('');
const [tokenId, setTokenId] = useState('');
const [collection, setCollection] = useState('');
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [layers, setLayers] = useState('');
const [initialChapterHash, setInitialChapterHash] = useState('');
const [newCost, setNewCost] = useState('');
const [feePercent, setFeePercent] = useState('');
const [symbol, setSymbol] = useState('');
const [participant1, setParticipant1] = useState('');
const [participant2, setParticipant2] = useState('');
const [initialBalance1, setInitialBalance1] = useState('');
const [initialBalance2, setInitialBalance2] = useState('');
const [channelId, setChannelId] = useState('');
const [newNonce, setNewNonce] = useState('');
const [newViewCount, setNewViewCount] = useState('');
const [newChapterURI, setNewChapterURI] = useState('');
const [nonce, setNonce] = useState('');
const [finalViewCount, setFinalViewCount] = useState('');
const [_tokens, setTokens] = useState('');
const [balances, setBalances] = useState('');
const [buyTokenId, setBuyTokenId] = useState("");
const [setPrice, setSetPrice] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [abi, setAbi] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const tokens = [
    { name: 'ETH', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025', contractAddress: '' },
  ]; // replace with your actual tokens and contract addresses
  const [ipfsHash, setIpfsHash] = useState(''); // Initialize with an empty string

  const [metadata, setMetadata] = useState(null);
  const [nftMetadata, setNftMetadata] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Connect to Interact");
  const [Depositing, setDepositing] = useState(false);
  const Form = useSelector((state) => state.ContactForm);
  const [nextIPFSHash, setNextIPFSHash] = useState("");
  const { account, userNFTs } = useSelector(state => state.blockchain);
  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("Submitted next IPFS hash:", nextIPFSHash);
    // You can clear the input if you want
    setNextIPFSHash("");
  };
  const Deposit = async (amount, token) => {
    if (amount <= 0) {
      return;
    }
    setFeedback("Depositing...");
    setDepositing(true);

    // Convert the amount to Wei
    const amountInWei = blockchain.web3.utils.toWei(amount.toString(), 'ether');

    if (token === 'ETH') {
      // Deposit Ether
      await blockchain.smartContract.methods
        .depositEther()
        .send({
          gasLimit: "500000",
          from: blockchain.account,
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          value: amountInWei,
        })
        .once("error", (err) => {
          console.log(err);
          setFeedback("Sorry, something went wrong please try again later.");
          setDepositing(false);
        })
        .then((receipt) => {
          setFeedback("Successful Deposit!");
          setDepositing(false);
          dispatch(fetchData(blockchain.account));
        });
    } else {

      

      // Deposit the tokens
      await blockchain.smartContract.methods
        .deposit(contractAddress, amountInWei)
        .send({
          gasLimit: "500000",
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          from: blockchain.account,
        })
        .once("error", (err) => {
          console.log(err);
          setFeedback("Sorry, something went wrong please try again later.");
          setDepositing(false);
        })
        .then((receipt) => {
          setFeedback("Successful Deposit!");
          setDepositing(false);
          dispatch(fetchData(blockchain.account));
        });
    }
  };


  const Withdraw = async (_amount, _token) => {
    setFeedback("Withdrawing...");
    setDepositing(true);

    const transactionOptions = {
      gasLimit: "500000",
      from: blockchain.account,
    };

    if (_token === 'ETH' && _amount) {
      // Add value to transaction only when _amount is provided and _token is 'ETH'
      transactionOptions.to = "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB";
      transactionOptions.value = blockchain.web3.utils.toWei((_amount).toString(), "ether");
    }

    if (_token === 'ETH') {
      // Withdraw Ether
      blockchain.smartContract.methods
        .withdrawAllEther()
        .send({ from: blockchain.account })
        .then((receipt) => {
          console.log(receipt);
          setFeedback("Successful Withdrawal!");
          setDepositing(false);
          dispatch(fetchData(blockchain.account));
        })
        .catch((err) => {
          console.log(err);
          setFeedback("Sorry, something went wrong please try again later.");
          setDepositing(false);
        });
    } else {

      // Withdraw token
      const tokenContractAddress = 'Replace this with the contract address of the token';
      const tokenAbi = 'Replace this with the ABI  the token';
      const tokenContract = new blockchain.web3.eth.Contract(tokenAbi, tokenContractAddress);

      // Withdraw the tokens
      await blockchain.smartContract.methods
        .withdrawTokens(tokenContractAddress, _amount ? blockchain.web3.utils.toWei((_amount).toString(), "ether") : "0")
        .send(transactionOptions)
        .once("error", (err) => {
          console.log(err);
          setFeedback("Sorry, something went wrong please try again later.");
          setDepositing(false);
        })
        .then((receipt) => {
          setFeedback("Successful Withdrawal!");
          setDepositing(false);
          dispatch(fetchData(blockchain.account));
        });
    }
  };

  const mintNFT = async (collection, recipient, tokenURI) => {
    setFeedback("Minting...");
    setDepositing(true);

    try {
      // Mint NFT
      const receipt = await blockchain.smartContract.methods
        .mintNFT(collection, recipient, tokenURI)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });

      setFeedback("Successful Mint!");
      setDepositing(false);
      dispatch(fetchData(blockchain.account));
    } catch (err) {
      console.log(err);
      setFeedback("Sorry, something went wrong please try again later.");
      setDepositing(false);
    }
  };

  const buyBook = async (_tokenId) => {
    setFeedback("Initiating book purchase...");
    setDepositing(true); // Assuming you use the same state for indicating ongoing transactions
  
    try {
      // Buy Book
      const receipt = await blockchain.smartContract.methods
        .buyBook(_tokenId)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });
  
      setFeedback("Successfully purchased the book!");
      setDepositing(false);
      dispatch(fetchData(blockchain.account)); // Refresh UI data
    } catch (err) {
      console.log(err);
      setFeedback("Sorry, something went wrong. Please try again later.");
      setDepositing(false);
    }
  };
  
  const setBookPrice = async (_tokenId, _price) => {
    setFeedback("Setting book price...");
    setDepositing(true); // Assuming you use the same state for indicating ongoing transactions
  
    try {
      // Set Book Price
      const receipt = await blockchain.smartContract.methods
        .setPrice(_tokenId, _price)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });
  
      setFeedback("Successfully set the book price!");
      setDepositing(false);
      dispatch(fetchData(blockchain.account)); // Refresh UI data
    } catch (err) {
      console.log(err);
      setFeedback("Sorry, something went wrong. Please try again later.");
      setDepositing(false);
    }
  };

  const approve = async (contractAddress, spender, amount) => {
    console.log("Contract ABI: ", ContractABI); // Debug line

    setFeedback("Approving...");
    setDepositing(true);
    
    // Convert the amount to Wei
    const amountInWei = blockchain.web3.utils.toWei(amount.toString(), 'ether');
  
    // Create a contract instance of the ERC20 token
    const tokenContract = new blockchain.web3.eth.Contract(ContractABI, contractAddress);
  
    try {
      // Call the approve function of the ERC20 token
      const receipt = await tokenContract.methods
        .approve(contractAddress, spender, amountInWei)
        .send({
          gasLimit: "500000",
          from: blockchain.account,
        });  
      setFeedback("Approved successfully!");
      dispatch(fetchData(blockchain.account));
    } catch (err) {
      console.log(err);
      setFeedback("Approval failed. Please try again.");
    }
  };
  

  const getChannelParticipants = async (channelId) => {
    try {
      const participants = await blockchain.smartContract.methods
        .getChannelParticipants(channelId)
        .call({to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
        gasLimit: "500000", 
          from: blockchain.account });
  
      console.log("Channel Participants: ", participants);
    } catch (err) {
      console.log(err);
    }
  };
  
  const setViewCost = async (newCost) => {
    setFeedback("Setting view cost...");
    try {
      const receipt = await blockchain.smartContract.methods
        .setViewCost(newCost? blockchain.web3.utils.toWei((newCost).toString(), "ether") : "0")
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });  
      setFeedback("View cost set successfully!");
      dispatch(fetchData(blockchain.account));
    } catch (err) {
      console.log(err);
      setFeedback("Setting view cost failed. Please try again.");
    }
  };
  
  const ForwardAddress = async (forwardAddress) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .setForwardAddress(forwardAddress)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const FeePercent = async (feePercent) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .setFeePercent(feePercent)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const burnToken = async (token, amount) => {
        // Convert the amount to Wei
        const amountInWei = blockchain.web3.utils.toWei(amount.toString(), 'ether');
    try {
      const receipt = await blockchain.smartContract.methods
        .burnToken(contractAddress, amountInWei)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const burnNFT = async (collection, tokenId) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .burnNFT(collection, tokenId)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const schedulePayment = async (pType, token, recipient, amount, start, interval, changeRate) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .schedulePayment(pType, contractAddress, recipient, amount, start, interval, changeRate)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const executePayments = async () => {
    try {
      const receipt = await blockchain.smartContract.methods
        .executePayments()
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const directTransfer = async (token, to, amount, tokenId) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .directTransfer(contractAddress, to, amount, tokenId)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const createCollection = async (collection, name, symbol) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .createCollection(collection, name, symbol)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const mintNFTWithMetadata = async (collection, recipient, name, description, layers, initialChapterHash) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .mintNFTWithMetadata(collection, recipient, name, description, layers, initialChapterHash)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const addMetadata = async (tokenId, name, description, layers, chapterHash) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .addMetadata(tokenId, name, description, layers, chapterHash)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const getMetadata = async (tokenId) => {
    try {
      const metadata = await blockchain.smartContract.methods
        .getMetadata(tokenId)
        .call({ 
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account });
      return metadata;
    } catch (err) {
      console.log(err);
    }
  };

  const openChannel = async (participant1, participant2, initialBalance1, initialBalance2, tokenId) => {
    try {
      const channelId = await blockchain.smartContract.methods
        .openChannel(participant1, participant2, initialBalance1, initialBalance2, tokenId)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      return channelId;
    } catch (err) {
      console.log(err);
    }
  };

  const transferEtherToChannel = async (channelId, value) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .transferEtherToChannel(channelId)
        .send({ 
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account, value: value });
      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const updateChannel = async (channelId, newNonce, newViewCount, newChapterURI, signature) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .updateChannel(channelId, newNonce, newViewCount, newChapterURI, signature)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  const closeChannel = async (channelId, nonce, finalViewCount, tokens, balances, v, r, s) => {
    try {
      const receipt = await blockchain.smartContract.methods
        .closeChannel(channelId, nonce, finalViewCount, tokens, balances, v, r, s)
        .send({
          to: "0x26D702b6Ab8ccf8527ff639E1f10158ef824f7BB",
          gasLimit: "500000",
          from: blockchain.account,
        });      // Handle the receipt or other actions
    } catch (err) {
      console.log(err);
    }
  };

  


  


  
  

  const connectWallet = async () => {
    setConnecting(true);
    try {
      await dispatch(connect());
    } catch (error) {
      // Handle any errors that occur during the connection process.
      console.log(error);
    } finally {
      setConnecting(false);
      dispatch(fetchData(blockchain.account));
    }
  };



  const [selectedBook, setSelectedBook] = useState(null);
  const [Bookchapters, setBookChapters] = useState([]);
  
  const [isCustomHash, setIsCustomHash] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");
  
  // Dummy chapters and their corresponding IPFS hashes
  const chapters = [
    { name: "Chapter 1", hash: "QmTN62Na4U74SPruDRsB1N5kRBGhFB9caAoAoK5tB1zd1L" },
    { name: "Chapter 2", hash: "QmVjqp4AWHG8XH69UkTkCuRxXiVFd4JoGDKrxK4CMrHJHr" },
    // ...more chapters
  ];


  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const [nftPopupOpen, setNftPopupOpen] = useState(false);
  const [nftTitles, setNftTitles] = useState({}); // Stores titles indexed by NFT ID

  const [aboutOpen, setAboutOpen] = useState(false);
  const [howToUseOpen, setHowToUseOpen] = useState(false);
  const [bookViewerOpen, setBookViewerOpen] = useState(false);
  const handleBookViewerOpen = () => {
    setBookViewerOpen(true);
  };

  const handleBookViewerClose = () => {
    setBookViewerOpen(false);
  };
  const handleContractAddressChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const result = await contract.methods.myFunction().call({ from: blockchain.account });
      console.log('Function result:', result);
    } catch (err) {
      console.error('Failed to call function:', err);
    }
  };

  <Button onClick={handleButtonClick}>Call Function</Button>

  const handleAboutOpen = () => {
    setAboutOpen(true);
  };

  const handleAboutClose = () => {
    setAboutOpen(false);
  };
  const handleHowToUseOpen = () => {
    setHowToUseOpen(true);
  };

  const handleHowToUseClose = () => {
    setHowToUseOpen(false);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [bottomNavValue, setBottomNavValue] = useState(0);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);

  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);

  };

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };
  const handleTransaction = (transactionType, transactionData) => {
    // logic to handle transaction...

    // Add transaction to history at the beginning
    setTransactionHistory(prevHistory => [
      {
        type: transactionType,
        data: transactionData,
        timestamp: new Date(),
      },
      ...prevHistory,
    ]);

    // Reset form and selected function
    setSelectedFunction(null);
    setToken('');
    setRecipient('');
    setAmount('');
    setSpender('');
    
    // Reset Payment and Transfers Fields
    setStart('');
    setInterval('');
    setTokenId('');
    
    // Reset NFT Operations Fields
    setTokenURI('');
    setCollection('');
    setName('');
    setDescription('');
    setLayers('');
    setInitialChapterHash('');
    setSymbol('');
    setBuyTokenId('');
    setSetPrice('');
    
    // Reset Channel Management Fields
    setParticipant1('');
    setParticipant2('');
    setInitialBalance1('');
    setInitialBalance2('');
    setChannelId('');
    setNewNonce('');
    setNewViewCount('');
    setNewChapterURI('');
    setNonce('');
    setFinalViewCount('');
    setTokens('');
    setBalances('');
    
    // Reset Settings and Configuration Fields
    setForwardAddress('');
    setNewCost('');
    setFeePercent('');
  };

  const openDiscord = () => {
    window.open('https://discord.gg/Mr3yFuKgzY', '_blank');
  };

  const handleInputChange = (setter, value, functionName) => {
    setter(value);
    setSelectedFunction(functionName);
  };

  const isDisabled = (field, selectedFunction) => {
    const functionFields = {
      'Schedule Payment': ['token', 'recipient', 'amount', 'start', 'interval'],
      'Execute Payments': [],
      'Deposit': ['token', 'amount'],
      'Deposit Ether': ['amount'],
      'Withdraw': ['token', 'amount'],
      'Withdraw All Tokens': ['token'],
      'Withdraw All Ether': [],
      'Transfer': ['token', 'recipient', 'amount', 'tokenId'],
      'Mint NFT': ['recipient', 'tokenURI'],
      'Mint NFT With Metadata': ['collection', 'recipient', 'name', 'description', 'layers', 'initialChapterHash'],
      'Burn NFT': ['collection', 'tokenId'],
      'Set Forward Address': ['forwardAddress'],
      'Set View Cost': ['newCost'],
      'Set Fee Percent': ['_feePercent'],
      'Approve': ['token', 'spender', 'amount'],
      'Create Collection': ['collection', 'name', 'symbol'],
      'Open Channel': ['participant1', 'participant2', 'initialBalance1', 'initialBalance2', 'tokenId'],
      'Update Channel': ['channelId', 'newNonce', 'newViewCount', 'newChapterURI'],
      'Close Channel': ['channelId', 'nonce', 'finalViewCount', 'tokens', 'balances'],
      'Transfer Ether To Channel': ['channelId'],
      'Connect': [],
      
          // ... (Same as before)
        };
      
        // If a function is selected, then disable fields that are not needed for that function
        if (selectedFunction) {
          return !functionFields[selectedFunction].includes(field);
        }
      
        // If no function is selected, then disable fields that are not common to all functions
        const allFields = Object.values(functionFields).flat();
        const uniqueFields = Array.from(new Set(allFields));
        
        return !uniqueFields.includes(field);
      };
      
      const [combinedData, setCombinedData] = useState([]);
  const [value, setValue] = useState(0);
  const [books, setBooks] = useState([
    { name: 'The Unseen Revolution', hash: 'QmX2enz1b2v9RJ4rNWjnNzd6LgE6KNJE4J5Rv7kLkHkmFi' },
    { name: 'The Bible', hash: 'QmaBopgC994zie1Dn5jt1BuRFe13ZLgHrZYWDRiYYd8TB1' },
    // ... more books
  ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isButtonDisabled = (buttonFunction) => {
    const functionFields = {
      'Schedule Payment': ['token', 'recipient', 'amount', 'start', 'interval'],
      'Execute Payments': [],
      'Deposit': ['token', 'amount'],
      'Deposit Ether': ['amount'],
      'Withdraw': ['token', 'amount'],
      'Withdraw All Tokens': ['token'],
      'Withdraw All Ether': [],
      'Transfer': ['token', 'recipient', 'amount', 'tokenId'],
      'Mint NFT': ['recipient', 'tokenURI'],
      'Mint NFT With Metadata': ['collection', 'recipient', 'name', 'description', 'layers', 'initialChapterHash'],
      'Burn Token': ['token', 'amount'],
      'Burn Ether': ['amount'],
      'Burn NFT': ['collection', 'tokenId'],
      'Set Forward Address': ['forwardAddress'],
      'Set View Cost': ['newCost'],
      'Set Fee Percent': ['_feePercent'],
      'Approve': ['token', 'spender', 'amount'],
      'Create Collection': ['collection', 'name', 'symbol'],
      'Open Channel': ['participant1', 'participant2', 'initialBalance1', 'initialBalance2', 'tokenId'],
      'Update Channel': ['channelId', 'newNonce', 'newViewCount', 'newChapterURI'],
      'Close Channel': ['channelId', 'nonce', 'finalViewCount', '_tokens', 'balances'],
      'Transfer Ether To Channel': ['channelId'],
      'Connect': [],
    };

    const requiredFields = functionFields[buttonFunction];
    const fieldValues = {
      token,
      recipient,
      amount,
      start,
      interval,
      tokenId,
      tokenURI,
      collection,
      name,
      description,
      layers,
      initialChapterHash,
      forwardAddress,
      newCost,
      feePercent,
      spender,
      symbol,
      participant1,
      participant2,
      initialBalance1,
      initialBalance2,
      channelId,
      newNonce,
      newViewCount,
      newChapterURI,
      nonce,
      finalViewCount,
      _tokens,
      buyTokenId,
      setPrice,
      balances
    };
    
    return requiredFields.some(field => !fieldValues[field]);
  };

  const fetchNFTMetadata = (tokenURI) => {
    return async (dispatch) => {
      const cachedMetadata = localStorage.getItem(tokenURI);
      if (cachedMetadata) {
        dispatch({
          type: "FETCH_NFT_METADATA_SUCCESS",
          payload: JSON.parse(cachedMetadata),
        });
        return;
      }
  
      try {
        const response = await axios.get(tokenURI);
        localStorage.setItem(tokenURI, JSON.stringify(response.data));
        dispatch({
          type: "FETCH_NFT_METADATA_SUCCESS",
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_NFT_METADATA_FAILED",
          payload: error.message,
        });
      }
    };
  };
  

  const fetchBookData = async (bookHash) => {
    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${bookHash}`);
      console.log("Full response:", response);
  
      // Access the response data directly
      if (response.data && response.data.Bookchapters) {
        setBookChapters(response.data.Bookchapters);
      } else {
        setBookChapters([]);
      }
    } catch (error) {
      console.error("Error fetching book data from IPFS:", error);
      setBookChapters([]);
    }
  };
  
  
  useEffect(() => {
    const fetchAndSetNFTTitle = async (nft) => {
        const ipfsGatewayUrl = `https://ipfs.io/ipfs/${nft.hash}`; // Replace 'nft.hash' with the actual property name

        try {
            const response = await axios.get(ipfsGatewayUrl);
            const title = response.data.title; // Adjust based on the structure of your metadata
            setNftTitles(prevTitles => ({
                ...prevTitles,
                [nft.id]: title
            }));
        } catch (error) {
            console.error("Error fetching NFT title from IPFS:", error);
            setNftTitles(prevTitles => ({
                ...prevTitles,
                [nft.id]: "Error loading title" // Or a default error message
            }));
        }
    };

    if (nftPopupOpen && combinedData && combinedData.length > 0) {
        combinedData.forEach(fetchAndSetNFTTitle);
    }
}, [nftPopupOpen, combinedData]);

  
  const displayChapter = async (chapterHash) => {
    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${chapterHash}`);
      setMetadata(response.data); // Assumes chapter content is in the response data
    } catch (error) {
      console.error("Error fetching chapter from IPFS:", error);
    }
  };
  
  useEffect(() => {
    // Function to fetch and update metadata for a single NFT
    const fetchAndSetNFTMetadata = async (nft) => {
        console.log(`Fetching metadata for NFT with ID: ${nft.id}`);
        const ipfsGatewayUrl = `https://ipfs.io/ipfs/${nft.hash}`; // Replace 'nft.hash' with the actual property name
        console.log(`IPFS Gateway URL: ${ipfsGatewayUrl}`);

        try {
            const response = await axios.get(ipfsGatewayUrl);
            console.log(`Metadata fetched for NFT ID ${nft.id}:`, response.data);
            setNftMetadata(prevMetadata => {
                const updatedMetadata = {
                    ...prevMetadata,
                    [nft.id]: response.data
                };
                console.log(`Updated metadata state for NFT ID ${nft.id}:`, updatedMetadata);
                return updatedMetadata;
            });
        } catch (error) {
            console.error(`Error fetching NFT metadata from IPFS for NFT ID ${nft.id}:`, error);
            setNftMetadata(prevMetadata => {
                const updatedMetadata = {
                    ...prevMetadata,
                    [nft.id]: { error: "Failed to load metadata" }
                };
                console.log(`Updated metadata state with error for NFT ID ${nft.id}:`, updatedMetadata);
                return updatedMetadata;
            });
        }
    };

    // Trigger the metadata fetch when the NFT viewer is opened and NFTs are available
    if (nftPopupOpen && combinedData && combinedData.length > 0) {
        console.log('NFT viewer is open, and combined data is available. Starting to fetch metadata for all NFTs.');
        combinedData.forEach(fetchAndSetNFTMetadata);
    } else {
        console.log('NFT viewer is not open or no combined data available.');
    }
}, [nftPopupOpen, combinedData]);


  useEffect(() => {
    if (userNFTs && userNFTs.length > 0) {
        const formattedNFTs = userNFTs.map(nft => ({
            name: `NFT ID: ${nft.id}`, // or any other identifier
            hash: nft.tokenURI,
        }));
        setCombinedData([...books, ...formattedNFTs]);
    }
}, [userNFTs]); // Depend on userNFTs

  const fetchUserNFTs = async () => {
    if (blockchain.account && blockchain.smartContract) {
      dispatch(fetchNFTs(blockchain.account));
    }
  };

  useEffect(() => {
    fetchUserNFTs();
  }, [blockchain.account]);

  useEffect(() => {
    getData();
  }, [blockchain.account]);
  
  useEffect(() => {
    if (bookViewerOpen && ipfsHash) {
      // Use an IPFS gateway to fetch the metadata
      const ipfsGatewayUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

      // Fetch metadata from IPFS
      axios.get(ipfsGatewayUrl)
        .then(response => {
          // Handle successful fetch
          setMetadata(response.data);
        })
        .catch(error => {
          // Handle errors here
          console.error("Error fetching from IPFS:", error);
        });
    }
  }, [bookViewerOpen, ipfsHash]);
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontFamily: '"Roboto Mono", monospace' }}>
  The_Scroll.x
</Typography>



          {blockchain.account && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" style={{ lineHeight: 1 }}>
                  Wallet Address: {blockchain.account}
                </Typography>
                </div>
              {/* Add other cool information here */}
              
            </div>
          )}
          <img src="./logo512.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
        </Toolbar>
      </AppBar>

            



      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button onClick={handleHowToUseOpen}>
            <ListItemText primary="How to Use" />
          </ListItem>
          <ListItem button onClick={handleBookViewerOpen}>
            <ListItemText primary="BookViewer" />
          </ListItem>
          <ListItem button onClick={() => setNftPopupOpen(true)}>
  <ListItemText primary="View NFTs" />
</ListItem>

          <ListItem button onClick={handleAboutOpen}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={() => console.log('Clicked on Logout')}>
            <ListItemText primary="Logout" style={{ color: 'red' }} />
          </ListItem>
        </List>

      </Drawer>
      <Dialog open={howToUseOpen} onClose={handleHowToUseClose}>
    <DialogTitle>How to Use The_Scroll.x</DialogTitle>
    <DialogContent>
        <DialogContentText>
            <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
                Getting Started with The_Scroll.x
            </Typography>

            <Typography variant="body1" gutterBottom>
                Welcome to our platform, where literature meets blockchain. Here's a simple guide to get you started.
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>BookViewer:</strong><br />
                Explore a variety of digital books. Dive into different chapters and discover new stories.
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>NFT Minting:</strong><br />
                Turn your creations into NFTs. A small deposit is needed to begin minting, which helps maintain our platform.
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>Interactive Elements:</strong><br />
                Enjoy interactive elements in our books, like multimedia and author notes, for a richer experience.
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>Community Forum:</strong><br />
                Join discussions, share ideas, and connect with fellow enthusiasts in our community forum.
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>Getting Started:</strong><br />
                1. Connect your wallet to interact with the platform.<br />
                2. Visit 'NFT Operations' to mint your NFTs easily.<br />
                3. Check out the BookViewer for digital literature.<br />
                4. Engage with the community and share your journey.
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>Need Help?</strong><br />
                Our Help Center and Contact Us section are here for support. Also, check our FAQs for quick answers.
            </Typography>

            <Typography variant="body1" gutterBottom>
                Thank you for joining The_Scroll.x. We're excited to have you on this literary and technological journey!
            </Typography>
        </DialogContentText>
    </DialogContent>
        <DialogActions>
          <Button onClick={handleHowToUseClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={nftPopupOpen} onClose={() => setNftPopupOpen(false)} fullWidth maxWidth="md">
  <DialogTitle>Your NFTs</DialogTitle>
  <DialogContent>
    <UserNFTsDisplay />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setNftPopupOpen(false)} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

      <Dialog 
  open={bookViewerOpen} 
  onClose={() => {
    setBookViewerOpen(false);
  }}
>
  <DialogTitle>
    Book Viewer
  </DialogTitle>

  <DialogContent 
    style={{
      overflow: 'auto', 
      maxHeight: '600px', 
      scrollbarWidth: 'thin', 
      scrollbarColor: 'black grey',
      padding: '5px 10px'  // Adjusts padding; smaller values will reduce the border around the text.

    }}
  >
  <DialogContentText>
  {metadata ? (
    <div style={{ whiteSpace: 'pre-line' }}>  
      <Typography 
        variant="h6" 
        style={{ marginBottom: '20px', fontSize: '24px' }}  
      >
        {metadata.title}
      </Typography>
      <Typography 
        variant="body1" 
        style={{ textAlign: 'justify', lineHeight: '1.6', marginBottom: '10px', fontSize: '18px' }} 
      >
        {metadata.chapter}
      </Typography>
      <Typography 
        variant="body1" 
        style={{ textAlign: 'justify', lineHeight: '1.3', fontSize: '12px' , 'fontFamily': 'Monaco, monospace'}}  
      >
        {metadata.text}
      </Typography>
    </div>
  ) : (
    "Loading..."
  )}
</DialogContentText>

  </DialogContent>

  <DialogActions 
    style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '8px' 
    }}
  >

<div style={{ marginBottom: '10px' }}>
<TextField
  select
  label="Select Book"
  value={selectedBook}
  onChange={(e) => {
    const selectedBookObj = combinedData.find(book => book.name === e.target.value);
    if (selectedBookObj) {
      setSelectedBook(selectedBookObj.name);
      fetchBookData(selectedBookObj.hash);
    }
  }}
>
{combinedData.map((item, index) => (
    <MenuItem key={index} value={item.name}>
      {item.name}
    </MenuItem>
  ))}
</TextField>


    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {isCustomHash ? (
          <TextField
            label="Custom IPFS Hash"
            variant="outlined"
            size="small"
            value={nextIPFSHash}
            onChange={(e) => setIpfsHash(e.target.value)}
          />
        ) : (
<TextField
  select
  label="Select Chapter"
  value={selectedChapter}
  onChange={(e) => {
    setSelectedChapter(e.target.value);
    displayChapter(e.target.value);
  }}
>
  {Bookchapters && Bookchapters.map((chapter, index) => (
    <MenuItem key={index} value={chapter.hash}>
      {chapter.name}
    </MenuItem>
  ))}
</TextField>


        )}
      
      </div>
    <Button 
      onClick={() => {
        setBookViewerOpen(false);
      }} 
      color="primary"
    >
      Close
    </Button>
  </DialogActions>

  <style jsx global>{`
    /* Style the scrollbar */
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: black;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: white;
    }
    ::-webkit-scrollbar-track {
      background: grey;
      border-radius: 5px;
    }
  `}</style>
</Dialog>

<Dialog open={aboutOpen} onClose={handleAboutClose} fullWidth={true}
  maxWidth="md" >
        <DialogTitle>How to Use</DialogTitle>
        <DialogContent>
        <iframe 
      src="/Whitepaper.pdf" 
      width="100%" 
      height="400px">
    </iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAboutClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      <Container maxWidth="lg" justifyContent="center" alignItems="center">
        <Typography variant="h4" style={{fontFamily: '"Roboto Mono", monospace' }} component="h1" gutterBottom>
        <br />
          Dashboard
        </Typography>

        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
                    <Grid item xs={12} md={4}>
            <Paper style={{ padding: theme.spacing(1), color: theme.palette.text.secondary }}>
              <Grid item xs={12} md={12}>


<div>
    <Tabs value={value} onChange={handleChange}  variant="scrollable" scrollButtons="auto" TabIndicatorProps={{ style: { backgroundColor: 'green' } }}>
      <Tab label="General Operations" />
      <Tab label="NFT Operations" />
    </Tabs>
    <Box hidden={value !== 0}>
      {/* General Operations Fields */}
      <FormControl fullWidth margin="normal">
  <InputLabel id="token-label">Token</InputLabel>
  <Select
    labelId="token-label"
    value={token}
    onChange={e => {
      const selectedTokenObject = tokens.find(t => t.name === e.target.value);
      if (selectedTokenObject) {
        setToken(selectedTokenObject.name);
        setContractAddress(selectedTokenObject.contractAddress);
      }
    }}
  >
    {tokens.map((token, index) => (
      <MenuItem value={token.name} key={index}>
        <img src={token.logo} alt={token.name} style={{ width: '25px', marginRight: '10px' }} />
        {token.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            <TextField label="Recipient" value={recipient} onChange={e => handleInputChange(setRecipient, e.target.value, 'Transfer')} fullWidth margin="normal" className={isDisabled('recipient') ? classes.disabled : ''} disabled={isDisabled('recipient')} />
            <TextField label="Amount" value={amount} onChange={e => handleInputChange(setAmount, e.target.value, 'Deposit')} fullWidth margin="normal" className={isDisabled('amount') ? classes.disabled : ''} disabled={isDisabled('amount')} />

    </Box>
    <Box hidden={value !== 2}>
      {/* Payment and Transfers Fields */}
      <List>
      {/* Include your TextField components for Schedule Payment, Deposit, Withdraw, Transfer, etc. here */}
      </List>
    </Box>
    <Box hidden={value !== 1}>
      {/* NFT Operations Fields */}
      <List>
            {/* Include your TextField components for Mint NFT, Burn NFT, Create Collection, etc. here */}
            <TextField label="Token URI" value={tokenURI} onChange={e => handleInputChange(setTokenURI, e.target.value, 'Mint NFT')} fullWidth margin="normal" className={isDisabled('tokenURI') ? classes.disabled : ''} disabled={isDisabled('tokenURI')} />
<TextField label="Collection" value={collection} onChange={e => handleInputChange(setCollection, e.target.value, 'Mint NFT With Metadata')} fullWidth margin="normal" className={isDisabled('collection') ? classes.disabled : ''} disabled={isDisabled('collection')} />
<TextField label="Name" value={name} onChange={e => handleInputChange(setName, e.target.value, 'Create Collection')} fullWidth margin="normal" className={isDisabled('name') ? classes.disabled : ''} disabled={isDisabled('name')} />
<TextField label="Symbol" value={symbol} onChange={e => handleInputChange(setSymbol, e.target.value, 'Create Collection')} fullWidth margin="normal" className={isDisabled('symbol') ? classes.disabled : ''} disabled={isDisabled('symbol')} />
          </List>
    </Box>
    <Box hidden={value !== 3}>
      {/* Channel Management Fields */}
      <List>
 {/* Include your TextField components for Open Channel, Update Channel, Close Channel, etc. here */}
          </List>
    </Box>
    <Box hidden={value !== 4}>
      {/* Settings and Configuration Fields */}
      <List>
            
            {/* Include your TextField components for Set Forward Address, Set View Cost, Set Fee Percent, Transfer Ether To Channel, etc. here */}

            </List>
    </Box>
  </div>
       
      </Grid>

            </Paper>
          </Grid>

          <Grid item xs={12} md={8} style={{ marginBottom: '60px' }}>
            <Paper style={{ padding: theme.spacing(2), color: theme.palette.text.secondary }}>
              <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Tooltip title={isButtonDisabled('Connect') ? 'Fill all required fields' : 'Connect'}>
                  <span>
                    <IconButton onClick={connectWallet} disabled={isButtonDisabled('Connect') || connecting}>
                      {connecting ? <CircularProgress size={24} /> : <LinkIcon />}
                    </IconButton>

                  </span>
                </Tooltip>
              </Zoom>
              {blockchain.errorMsg !== "" ? (
                <>
                  <Typography variant="body1" style={{ marginTop: '1rem', textAlign: "center" }}>
                    {blockchain.errorMsg}
                  </Typography>

                </>
              ) : null}


              <Typography variant="body1" component="p" gutterBottom>
              Revolutionize your literary journey with The_Scroll. Empowered by blockchain, NFTs, and smart contracts, we offer a transparent, censorship-resistant ecosystem. Publish freely, own your content through unique NFTs, and engage directly with readers.                </Typography>



             

              <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Tooltip title={isButtonDisabled('Deposit') ? 'Fill all required fields' : 'Deposit'}>
                  <span>
                    <IconButton onClick={() => Deposit(amount, token)} disabled={isButtonDisabled('Deposit')}>
                      <DepositIcon />
                    </IconButton>

                  </span>
                </Tooltip>
              </Zoom>



<Zoom in={true} style={{ transitionDelay: '500ms' }}>
  <Tooltip title="Create Collection">
    <span>
      <IconButton onClick={() => createCollection(collection, name, symbol)} disabled={isButtonDisabled('Create Collection')}>
        <CreateCollectionIcon />
      </IconButton>
    </span>
  </Tooltip>
</Zoom>





              <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                <Tooltip title={isButtonDisabled('Withdraw') ? 'Fill all required fields' : 'Withdraw'}>
                  <span>
                    <IconButton onClick={() => Withdraw(amount, token)} disabled={isButtonDisabled('Withdraw')}>
                      <WithdrawIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Zoom>


             
              <Zoom in={true} style={{ transitionDelay: '600ms' }}>
                <Tooltip title={isButtonDisabled('Mint NFT') ? 'Fill all required fields' : 'Mint NFT'}>
                  <span>
                    <IconButton onClick={() => { handleTransaction('Mint NFT', { recipient, tokenURI }); mintNFT(collection, recipient, tokenURI); }} disabled={isButtonDisabled('Mint NFT')}>
                      <MintIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Zoom>




              


            </Paper>
          </Grid>


        </Grid>
      </Container>
      <BottomNavigation value={bottomNavValue} onChange={handleBottomNavChange} style={{ position: 'fixed', bottom: 0, width: '100%' }}>
  <Tooltip title="Coming Soon" enterDelay={500} leaveDelay={200}>
    <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
  </Tooltip>
  <BottomNavigationAction label="Help" icon={<HelpIcon />} onClick={openDiscord} />
  {/* Add more bottom navigation items here */}
</BottomNavigation>
    </ThemeProvider>
  );
}

export default App;