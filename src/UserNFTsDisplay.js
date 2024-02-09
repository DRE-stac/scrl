import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNFTs } from './redux/blockchain/blockchainActions';
import { CircularProgress, Grid, Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const UserNFTsDisplay = () => {
    const dispatch = useDispatch();
    const { account, userNFTs, loading, errorMsg } = useSelector(state => state.blockchain);
    const [nftTitles, setNftTitles] = useState({}); // Stores titles indexed by NFT ID

    useEffect(() => {
        if (account) {
            console.log('Dispatching action to fetch NFTs for account:', account);
            dispatch(fetchNFTs(account));
        }
    }, [account, dispatch]);

    useEffect(() => {
        const fetchAllTitles = async () => {
            console.log('Fetching titles for all NFTs:', userNFTs);
            const titles = {};
            for (const nft of userNFTs) {
                const title = await fetchTitle(nft.tokenURI);
                titles[nft.id] = title; // Map the title to the NFT's ID
            }
            console.log('All titles fetched:', titles);
            setNftTitles(titles);
        };

        if (userNFTs.length > 0) {
            console.log('User has NFTs, starting title fetch:', userNFTs);
            fetchAllTitles();
        } else {
            console.log('No NFTs found for the user.');
        }
    }, [userNFTs]);

const fetchTitle = async (tokenURI) => {
        try {
            console.log('Fetching metadata from:', tokenURI);
            const formattedHash = tokenURI.startsWith('ipfs://') ? tokenURI.substring(7) : tokenURI;
            const response = await axios.get(`https://ipfs.io/ipfs/${formattedHash}`);
            const title = response.data.title || "Title not provided"; // Adjust based on your metadata structure
            console.log(`Title fetched for ${tokenURI}:`, title);
            return title;
        } catch (error) {
            console.error('Error fetching title:', error);
            return "Error loading title"; // Default error message
        }
    };



    const renderNFTs = () => {
        if (loading) {
            console.log('Loading NFTs...');
            return <CircularProgress />;
        }

        if (errorMsg) {
            console.log('Error loading NFTs:', errorMsg);
            return <Typography color="error">{errorMsg}</Typography>;
        }

        if (userNFTs && userNFTs.length === 0) {
            console.log('No NFTs found for the user.');
            return <Typography>No NFTs found in your wallet.</Typography>;
        }

        console.log('Rendering NFTs with titles:', nftTitles);
        return (
            <Grid container spacing={2}>
                {userNFTs.map(nft => (
                    <Grid item xs={12} sm={6} md={4} key={nft.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">ID: {nft.id}</Typography>
                                <Typography>Token URI: {nft.tokenURI}</Typography>
                                <Typography variant="subtitle1">Title: {nftTitles[nft.id] || "Loading title..."}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Your NFTs:
            </Typography>
            {renderNFTs()}
        </div>
    );
};

export default UserNFTsDisplay;
