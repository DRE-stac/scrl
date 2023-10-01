// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

enum PaymentType {
    Fixed,
    OneTime,
    Decreasing,
    Increasing,
    Conditional
}

contract The_Scroll is ERC721URIStorage, AccessControl, Pausable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    address payable public owner;
    mapping(address => Payment[]) public paymentSchedule;
    mapping(address => uint256) public depositedBalances;
    mapping(address => bool) public isMinter;
    mapping(address => address payable) private forwardAddresses;
    uint256 private feePercent = 5; // Start at 0.05% (expressed as parts per 10,000)
    uint256 public VIEW_COST = 1e15; // 0.001 Ether

    address public constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;

    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, AccessControl) returns (bool){
        return super.supportsInterface(interfaceId);
    }

    struct Metadata {
        uint256 id;
        string name;
        string description;
        string[] layers; // Layers can be represented as strings or another more appropriate data structure
        bytes32 chapterHash; // Represents the hash of the array of IPFS links
    }

    struct Payment {
        PaymentType pType;
        address token;
        address recipient;
        uint256 amount;
        uint256 start;
        uint256 interval;
        uint256 nextPayment;
        uint256 decreaseRate; // Required for Decreasing payment type
        uint256 increaseRate; // Required for Increasing payment type
        // For Conditional payment type, we may need to design a mechanism for external contracts to update payment status.
    }

    struct Collection {
        string name;
        string symbol;
        Counters.Counter counter;
    }

    struct ChannelParticipants {
        address participant1;
        address participant2;
        uint256 nonce;
        bool isOpen;
        uint256 viewCount;
        uint256 balance1;
        uint256 balance2;
        uint256 currentChapter; // Current chapter of the user
        string currentChapterLink;
    }
    
    mapping(string => Collection) private _collections;
    mapping(address => mapping(uint256 => address)) public depositedNFTs;
    mapping(uint256 => Metadata) private _tokenMetadata;
    mapping(bytes32 => ChannelParticipants) private _channelParticipants;
    mapping(bytes32 => mapping(address => uint256)) private _channelBalances;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        owner = payable(msg.sender);
    }

    function approve( address token, address spender, uint256 amount) public {
        IERC20 tokenContract = IERC20(token);
        tokenContract.approve(spender, amount);
    }

    function getChannelParticipants(bytes32 channelId) public view returns (address, address){
        return (
            _channelParticipants[channelId].participant1,
            _channelParticipants[channelId].participant2
        );
    }

    function getChannelNonce(bytes32 channelId) public view returns (uint256) {
        return _channelParticipants[channelId].nonce;
    }

    function getBalance(bytes32 channelId, address token) public view returns (uint256){
        return _channelBalances[channelId][token];
    }

    function setViewCost(uint256 newCost) public {
        require(
            msg.sender == owner,
            "Only the contract owner can update the VIEW_COST"
        );
        VIEW_COST = newCost;
    }

    // Function to set a forwarding address
    function setForwardAddress(address payable _forwardAddress) public {
        forwardAddresses[msg.sender] = _forwardAddress;
    }

    // Function to set the fee (only callable by the owner)
    function setFeePercent(uint256 _feePercent) public {
        require(msg.sender == owner, "Only the owner can set the fee.");
        feePercent = _feePercent;
    }

    // Function to burn tokens (only callable by the token owner)
    function burnToken(address token, uint256 amount) public {
        IERC20 tokenContract = IERC20(token);
        require(
            tokenContract.balanceOf(msg.sender) >= amount,
            "Insufficient token balance."
        );
        require(
            tokenContract.transferFrom(msg.sender, BURN_ADDRESS, amount),
            "Token burn failed."
        );
    }

    // Function to burn an NFT (only callable by the NFT owner)
    function burnNFT(string memory collection, uint256 tokenId) public {
        // Check that the function caller is the owner of the NFT
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721Burnable: caller is not owner nor approved"
        );
        // Check that the NFT belongs to the specified collection
        require(
            _collections[collection].counter.current() > tokenId,
            "NFT does not belong to the specified collection"
        );
        _burn(tokenId); // This will burn the NFT by removing it from circulation
    }

    function schedulePayment( PaymentType pType, address token, address recipient, uint256 amount, uint256 start, uint256 interval, uint256 changeRate) public { // This could represent either decreaseRate or increaseRate depending on pType
        require(isMinter[msg.sender], "Only depositors can schedule payments.");
        require(amount > 0, "Amount must be greater than zero.");
        require(interval > 0, "Interval must be greater than zero.");
        Payment memory newPayment = Payment({
            pType: pType,
            token: token,
            recipient: recipient,
            amount: amount,
            start: start,
            interval: interval,
            nextPayment: start,
            decreaseRate: pType == PaymentType.Decreasing ? changeRate : 0,
            increaseRate: pType == PaymentType.Increasing ? changeRate : 0
        });
        paymentSchedule[recipient].push(newPayment);
    }

    function executePayments() public {
        require(isMinter[msg.sender], "Only depositors can execute payments.");
        Payment[] storage payments = paymentSchedule[msg.sender];
        uint256 i = 0;
        while (i < payments.length && i < 10) {
            if (block.timestamp >= payments[i].nextPayment) {
                uint256 paymentAmount = payments[i].amount;

                if (payments[i].pType == PaymentType.Decreasing) {
                    paymentAmount = paymentAmount
                        .mul(100 - payments[i].decreaseRate)
                        .div(100);
                    payments[i].amount = paymentAmount;
                } else if (payments[i].pType == PaymentType.Increasing) {
                    paymentAmount = paymentAmount
                        .mul(100 + payments[i].increaseRate)
                        .div(100);
                    payments[i].amount = paymentAmount;
                }

                if (payments[i].token == address(0)) {
                    require(
                        address(this).balance >= paymentAmount,
                        "Not enough Ether to execute payment."
                    );
                    payable(payments[i].recipient).transfer(paymentAmount);
                } else {
                    IERC20 token = IERC20(payments[i].token);
                    require(
                        token.balanceOf(address(this)) >= paymentAmount,
                        "Not enough token funds to execute payment."
                    );
                    require(
                        token.transfer(payments[i].recipient, paymentAmount),
                        "Token transfer failed."
                    );
                }

                if (payments[i].pType == PaymentType.OneTime) {
                    payments[i] = payments[payments.length - 1];
                    payments.pop();
                } else {
                    payments[i].nextPayment = payments[i].nextPayment.add(
                        payments[i].interval
                    );
                    i++;
                }
            } else {
                i++;
            }
        }
    }

    function deposit(address token, uint256 amount) public whenNotPaused {
        IERC20 tokenContract = IERC20(token);
        require(
            tokenContract.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed."
        );

        // Update the deposited balance
        depositedBalances[msg.sender] = depositedBalances[msg.sender].add(
            amount
        );

        // Grant the MINTER_ROLE to the sender
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function depositEther() public payable whenNotPaused {
        // Update the deposited balance
        depositedBalances[msg.sender] = depositedBalances[msg.sender].add(
            msg.value
        );
        

        // Grant the MINTER_ROLE to the sender
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function directTransfer(
        address token,
        address to,
        uint256 amount,
        uint256 tokenId
    ) public {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Only depositors can make a direct transfer."
        );

        if (token == address(0)) {
            // Transfer ETH
            require(
                address(this).balance >= amount,
                "Not enough Ether to transfer."
            );
            require(
                depositedBalances[msg.sender] >= amount,
                "Depositor doesn't have enough Ether to transfer."
            );
            payable(to).transfer(amount);
            depositedBalances[msg.sender] = depositedBalances[msg.sender].sub(
                amount
            );
        } else {
            IERC20 erc20Token = IERC20(token);
            if (
                erc20Token.balanceOf(address(this)) >= amount &&
                depositedBalances[msg.sender] >= amount
            ) {
                // Transfer ERC20
                require(
                    erc20Token.transfer(to, amount),
                    "ERC20 transfer failed."
                );
                depositedBalances[msg.sender] = depositedBalances[msg.sender]
                    .sub(amount);
            } else {
                // Transfer ERC721 or ERC1155
                IERC721 erc721Token = IERC721(token);
                if (erc721Token.ownerOf(tokenId) == msg.sender) {
                    // Transfer ERC721
                    erc721Token.safeTransferFrom(msg.sender, to, tokenId);
                } else {
                    // Try to transfer ERC1155
                    IERC1155 erc1155Token = IERC1155(token);
                    require(
                        erc1155Token.balanceOf(msg.sender, tokenId) >= amount,
                        "Depositor doesn't have enough tokens to transfer."
                    );
                    erc1155Token.safeTransferFrom(
                        msg.sender,
                        to,
                        tokenId,
                        amount,
                        ""
                    );
                }
            }
        }
    }

    function withdraw(address token, uint256 amount) public whenNotPaused {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Only depositors can withdraw funds."
        );
        require(
            depositedBalances[msg.sender] >= amount,
            "Insufficient deposited balance."
        );
        if (token == address(0)) {
            require(
                address(this).balance >= amount,
                "Not enough Ether to withdraw."
            );
            payable(msg.sender).transfer(amount);
        } else {
            IERC20 tokenContract = IERC20(token);
            require(
                tokenContract.balanceOf(address(this)) >= amount,
                "Not enough token balance to withdraw."
            );
            require(
                tokenContract.transfer(msg.sender, amount),
                "Token transfer failed."
            );
        }
        depositedBalances[msg.sender] = depositedBalances[msg.sender].sub(
            amount
        );
        if (depositedBalances[msg.sender] == 0) {
            revokeRole(MINTER_ROLE, msg.sender);
        }
    }

    function withdrawAllTokens(address token) public {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Only depositors can withdraw funds."
        );
        IERC20 tokenContract = IERC20(token);
        uint256 balance = tokenContract.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw.");
        require(
            tokenContract.transfer(msg.sender, balance),
            "Token transfer failed."
        );
        depositedBalances[msg.sender] = depositedBalances[msg.sender].sub(
            balance
        );
        if (depositedBalances[msg.sender] == 0) {
            revokeRole(MINTER_ROLE, msg.sender);
        }
    }

    function withdrawAllEther() public {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Only depositors can withdraw funds."
        );
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw.");
        payable(msg.sender).transfer(balance);
        depositedBalances[msg.sender] = depositedBalances[msg.sender].sub(
            balance
        );
        if (depositedBalances[msg.sender] == 0) {
            revokeRole(MINTER_ROLE, msg.sender);
        }
    }

    function createCollection( string memory collection, string memory name, string memory symbol) public whenNotPaused {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Only depositors can create collections."
        );
        // Create a new Collection struct and store it in the mapping
        _collections[collection] = Collection(
            name,
            symbol,
            Counters.Counter(0)
        );
    }

    function mintNFT( string memory collection, address recipient, string memory tokenURI) public whenNotPaused returns (uint256) {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Only depositors can mint NFTs."
        );

        // Increment the collection's counter
        _collections[collection].counter.increment();

        uint256 newItemId = _collections[collection].counter.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function mintNFTWithMetadata(string memory collection,address recipient, string memory name, string memory description, string[] memory layers, bytes32 initialChapterHash) public whenNotPaused returns (uint256){  // New parameter for the chapter hash
    require(
        hasRole(MINTER_ROLE, msg.sender),
        "Only depositors can mint NFTs."
    );

    // Increment the collection's counter
    _collections[collection].counter.increment();

    uint256 newItemId = _collections[collection].counter.current();
    _mint(recipient, newItemId);

    // Add metadata to the new NFT
    Metadata memory newMetadata = Metadata({
        id: newItemId,
        name: name,
        description: description,
        layers: layers,
        chapterHash: initialChapterHash  // Set the initial chapter hash
    });
    _tokenMetadata[newItemId] = newMetadata;

    // Set a placeholder tokenURI
    _setTokenURI(newItemId, "ipfs://placeholder_uri");

    return newItemId;
}


    function pause() public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only admins can pause the contract."
        );
        _pause();
    }

    function unpause() public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only admins can unpause the contract."
        );
        _unpause();
    }

    function revokeMinter(address minterAddress) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only admins can revoke minter role."
        );
        revokeRole(MINTER_ROLE, minterAddress);
    }

  function addMetadata(
    uint256 tokenId,
    string memory name,
    string memory description,
    string[] memory layers,
    bytes32 chapterHash  // New parameter for the chapter hash
)
    public
{
    require(
        _isApprovedOrOwner(_msgSender(), tokenId),
        "Caller is not owner nor approved"
    );
    
    Metadata memory newMetadata = Metadata({
        id: tokenId,
        name: name,
        description: description,
        layers: layers,
        chapterHash: chapterHash  // Set the chapter hash
    });
    
    _tokenMetadata[tokenId] = newMetadata;
}


    function getMetadata(uint256 tokenId) public view returns (Metadata memory)
    {
        return _tokenMetadata[tokenId];
    }

    function getParticipantBalances(bytes32 channelId) public view returns (uint256, uint256)
    {
        ChannelParticipants memory participants = _channelParticipants[
            channelId
        ];
        return (participants.balance1, participants.balance2);
    }

    function getChannelId(address participant1, address participant2, uint256 nonce) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(participant1, participant2, nonce));
}


function openChannel(
    address participant1,
    address participant2,
    uint256 initialBalance1,
    uint256 initialBalance2,
    uint256 tokenId // Use tokenId to fetch the initialChapterLink
) public returns (bytes32) {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved for the NFT");

    // Fetch tokenURI for the given tokenId
    string memory tokenURI = tokenURI(tokenId);

    // TODO: Parse the tokenURI to extract chapter field if it's in JSON format
    // This will likely need an off-chain solution since on-chain JSON parsing can be gas-intensive.
    // For this example, we'll assume tokenURI is the direct link.
    string memory initialChapterLink = tokenURI;

    ChannelParticipants memory newParticipants = ChannelParticipants({
        participant1: participant1,
        participant2: participant2,
        nonce: 0,
        isOpen: true,
        viewCount: 0, // Initialize view count as 0
        balance1: initialBalance1,
        balance2: initialBalance2,
        currentChapter: tokenId, // Use tokenId as the initial chapter
        currentChapterLink: initialChapterLink
    });
    bytes32 channelId = keccak256(
        abi.encodePacked(participant1, participant2, newParticipants.nonce)
    );
    _channelParticipants[channelId] = newParticipants;
    return channelId;
}


    function transferEtherToChannel(bytes32 channelId) public payable whenNotPaused {
    require(_channelParticipants[channelId].isOpen, "Channel not open");
    require(
        _channelParticipants[channelId].participant1 == msg.sender || 
        _channelParticipants[channelId].participant2 == msg.sender, 
        "Caller is not a participant in the specified channel"
    );

    // Update the deposited balance
    depositedBalances[msg.sender] = depositedBalances[msg.sender].add(msg.value);

    // Update the balance of the participant in the specified channel
    if (_channelParticipants[channelId].participant1 == msg.sender) {
        _channelParticipants[channelId].balance1 = _channelParticipants[channelId].balance1.add(msg.value);
    } else {
        _channelParticipants[channelId].balance2 = _channelParticipants[channelId].balance2.add(msg.value);
    }
}

function updateChannel(
    bytes32 channelId,
    uint256 newNonce,
    uint256 newViewCount,  // Ensure view count is also updated
    string memory newChapterURI, // Changed from uint256 to string
    bytes memory signature
) public {
    ChannelParticipants storage participants = _channelParticipants[channelId];
    
    require(participants.isOpen, "Channel not open");
    require(newNonce > participants.nonce, "New nonce must be greater");
    
    bytes32 hash = keccak256(abi.encodePacked(newNonce, newViewCount, newChapterURI));
    address signer = recover(hash, signature);

    require(signer == msg.sender, "Invalid signature");

    participants.nonce = newNonce;
    participants.viewCount = newViewCount; // Update view count
    participants.currentChapterLink = newChapterURI; // Set the new chapter URI
}



    function closeChannel(
        bytes32 channelId,
        uint256 nonce,
        uint256 finalViewCount,
        address[] memory tokens,
        uint256[] memory balances,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        ChannelParticipants storage channelParticipants = _channelParticipants[
            channelId
        ];
        require(channelParticipants.isOpen, "Channel not open");
        require(
            nonce > channelParticipants.nonce,
            "State has already been updated with this or a later nonce"
        );
        bytes32 hash = keccak256(
            abi.encodePacked(channelId, nonce, finalViewCount, tokens, balances)
        );
        address signer = ecrecover(hash, v, r, s);
        require(
            signer == channelParticipants.participant1 ||
                signer == channelParticipants.participant2,
            "Invalid signer"
        );
        channelParticipants.nonce = nonce;
        for (uint256 i = 0; i < tokens.length; i++) {
            _channelBalances[channelId][tokens[i]] = balances[i];
        }
        uint256 cost = finalViewCount * VIEW_COST;

        require(
            channelParticipants.balance1 >= cost,
            "Not enough balance to cover cost"
        );

        channelParticipants.balance1 -= cost;
        channelParticipants.balance2 += cost; // transfer cost to the other participant
         // Mark channel as closed
    channelParticipants.isOpen = false;
    
    // Transfer remaining balances back to participants
    payable(channelParticipants.participant1).transfer(channelParticipants.balance1);
    payable(channelParticipants.participant2).transfer(channelParticipants.balance2);

    // Zero out channel balances
    channelParticipants.balance1 = 0;
    channelParticipants.balance2 = 0;
        // Transfer cost to book owner...
        // Send remaining balance back to user...
        // At this point, you could decide how to handle the channel's final state. For example, you could transfer the balances accordingly.
    }

    receive() external payable {
        // If someone sends Ether to the contract without a function call, it should be added to their deposited balance
        if (forwardAddresses[msg.sender] != address(0)) {
            forwardAddresses[msg.sender].transfer(msg.value);
        }
        depositedBalances[msg.sender] = depositedBalances[msg.sender].add(
            msg.value
        );

        _setupRole(MINTER_ROLE, msg.sender);
    }

    function recover(bytes32 hash, bytes memory signature)
        internal
        pure
        returns (address)
    {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // Check the signature length
        // Why 65? 32 bytes for R and S, and 1 byte for V.
        if (signature.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables
        // ecrecover takes the signature parameters, and the only way to get them
        // currently is to use assembly.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            // ecrecover returns zero on error
            return ecrecover(hash, v, r, s);
        }
    }
}
