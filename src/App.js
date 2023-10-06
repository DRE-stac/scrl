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

import { useDispatch, useSelector } from "react-redux";
import { connect, mintNFT } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

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
  const [connecting, setConnecting] = useState(false);

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Connect to Interact");
  const [Depositing, setDepositing] = useState(false);
  const Form = useSelector((state) => state.ContactForm);
  const [nextIPFSHash, setNextIPFSHash] = useState("");

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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
      transactionOptions.to = "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77";
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
        .call({to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
          to: "0x81B1e0e0cFCA9aFcb2Ff5D513c754F192Deeec77",
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
      

  const [value, setValue] = useState(0);
  const [books, setBooks] = useState([
    { name: 'The Unseen Revolution', hash: 'QmQDkhXQN7GjPamjJj4ZkNuMSoQDMHZ3ekZ8Q47wUUBHxx' },
    { name: 'Book 2', hash: 'ipfsHash2' },
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

  const fetchChapters = (bookHash) => {
    const ipfsGatewayUrl = `https://ipfs.io/ipfs/${bookHash}`;
  
    axios.get(ipfsGatewayUrl)
      .then(response => {
        // Assume the response data contains an array of chapters
        // in the form { name: 'Chapter 1', hash: 'chapHash1' }
        setBookChapters(response.data.Bookchapters);
      })
      .catch(error => {
        console.error("Error fetching chapters from IPFS:", error);
      });
  };
  

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
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                <Typography variant="body2" style={{ lineHeight: 1, marginLeft: '1rem' }}>
                  Network: {blockchain && blockchain.network ? blockchain.network : 'Loading...'}
                </Typography>
                <Typography variant="body2" style={{ lineHeight: 1, marginLeft: '1rem' }}>
                  Gas Price: {blockchain && blockchain.gasPrice ? blockchain.gasPrice : 'Loading...'}
                </Typography>
              </div>
            </div>
          )}
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
          
          <ListItem button onClick={() => console.log('Clicked on About')}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={() => console.log('Clicked on Logout')}>
            <ListItemText primary="Logout" style={{ color: 'red' }} />
          </ListItem>
        </List>

      </Drawer>
      <Dialog open={howToUseOpen} onClose={handleHowToUseClose}>
        <DialogTitle>How to Use</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
              How to Use
            </Typography>
            <Typography variant="body1">
              <strong>Token Management Section:</strong>
              <br />
              <strong>Transaction Actions Section:</strong>
              <br />
              This section contains action buttons for different transactions. Each button is represented by an icon and a tooltip that appears when you hover over the icon. The tooltip provides a brief description of the action.
              <br /><br />
              Here's a rundown of the actions:
              <br /><br />
              <strong>Deposit:</strong> This allows you to deposit a specific amount of a token. You'll need to input the token and the amount.
              <br /><br />
              <strong>Withdraw:</strong> This allows you to withdraw a specific amount of a token. You'll need to input the token and the amount.
              <br /><br />
              <strong>Mint NFT:</strong> This allows you to mint a new NFT to a recipient. You'll need to input the recipient and the token URI.
              <br /><br />
              <strong>Set Forward Address:</strong> This allows you to set a forward address. You'll need to input the forward address.
            </Typography>         </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHowToUseClose} color="primary">
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
      scrollbarColor: 'black grey'
    }}
  >
    <DialogContentText>
      {metadata ? (
        <div style={{ whiteSpace: 'pre-line' }}>
          <Typography 
            variant="h6" 
            style={{ marginBottom: '20px' }}
          >
            {metadata.title}
          </Typography>
          <Typography 
            variant="body1" 
            style={{ textAlign: 'justify', lineHeight: '1.6', marginBottom: '10px' }}
          >
            {metadata.chapter}
          </Typography>
          <Typography 
            variant="body1" 
            style={{ textAlign: 'justify', lineHeight: '1.6' }}
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
        variant="outlined"
        size="small"
        value={selectedBook}
        onChange={(e) => {
          setSelectedBook(e.target.value);
          fetchChapters(e.target.value);
        }}
      >
    {books.map((book, index) => (
    <MenuItem key={index} value={book.hash}>
      {book.name}
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
            label="Chapter"
            variant="outlined"
            size="small"

            value={selectedChapter}
            style={{ width: '300px'}}  // Set the width here
            onChange={(e) => {
              if (e.target.value === "custom") {
                setIsCustomHash(true);
              } else {
                setSelectedChapter(e.target.value);
                setIpfsHash(e.target.value); // Assuming you want to set the IPFS hash here
              }
            }}
          >
            
            {chapters.map((chapter, index) => (
              <MenuItem key={index} value={chapter.hash}>
                {chapter.name}
              </MenuItem>
            ))}
            <MenuItem value="custom">Custom...</MenuItem>
          </TextField>
        )}
        {isCustomHash && (
          <Button
            onClick={() => {
              setIsCustomHash(false);
            }}
          >
            Back
          </Button>
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
<TextField label="IPFS Hash" value={ipfsHash} onChange={(e) => setIpfsHash(e.target.value, "IPFS HASH")}fullWidth margin="normal"/>          
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

          <Grid item xs={12} md={8}>
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


              <Zoom in={true} style={{ transitionDelay: '700ms' }}>
                <Tooltip title={isButtonDisabled('Set Forward Address') ? 'Fill all required fields' : 'Set Forward Address'}>
                  <span>
                    <IconButton onClick={() => ForwardAddress(forwardAddress)} disabled={isButtonDisabled('Set Forward Address')}>
                      <SetAddressIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Zoom>

              


            </Paper>
          </Grid>


        </Grid>
      </Container>
      <BottomNavigation value={bottomNavValue} onChange={handleBottomNavChange} style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
        <BottomNavigationAction label="Help" value="help" icon={<HelpIcon />} />
        {/* Add more bottom navigation items here */}
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default App;