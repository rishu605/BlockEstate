import { apiKey, apiSecret, gatewayJwt, ipfsGateway, sendJsonHeader } from "@/config";
import axios from "axios";


const getDate = () => {
    const dateFormat = new Date(Date.now())
    const dateValue = dateFormat.getDate() + '/' + (dateFormat.getMonth() + 1 ) + '/' + dateFormat.getFullYear()
    const time = (new Date(dateValue.split(".").join("-")).getTime())/1000
    return {dateValue, time}
}

const sendJsonToIpfs = async (jsonData) => {
    const {date, time} = getDate()
    const apiUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

    const fileUploadResults = await Promise.allSettled(
        jsonData.propertyPictures.map(file => sendFileToIpfs(file))
    );
    const fileHashes = fileUploadResults.map(result => result.status === 'fulfilled' ? result.value : null);
    console.log("fileHashes: ", fileHashes)

    const data = JSON.stringify({
        "pinataMetadata": {
            name: "listData",
        },
        "pinataOptions": {
            "cidVersion": 1
        },
        "pinataContent": {
            "propertyInfo": {
                ...jsonData,
                date,
                time
            }
        }
    })
    
    const response = await axios.post(apiUrl, data, sendJsonHeader)

    const hash = `ipfs://${response.data.IpfsHash}`
    console.log("Hash: ", hash)
    return hash
}

const sendFileToIpfs = async (file) => {
    const formData = new FormData()
    const apiUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    formData.append("file", file)
    const options = JSON.stringify({
        cidVersion: 0
    })
    formData.append("pinataOptions", options)
    const opts = {
        maxBodyLength: "Infinity",
        headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: apiKey,
            pinata_secret_api_key: apiSecret,
            Accept: "text/plain"
        }
    }

    const sendPicture = await axios.post(apiUrl, formData, opts)
    return sendPicture.data.IpfsHash
}

const getImageFromPinata = async (cid) => {
    const apiUrl = `https://${ipfsGateway}.mypinata.cloud/ipfs/${cid}`;
    const opts = {
        headers: {
            Authorization: `Bearer ${gatewayJwt}`
        }
    };

    try {
        const response = await axios.get(apiUrl, opts);
        return response.data;
    } catch (error) {
        console.error("Error fetching image from Pinata:", error);
        throw error;
    }
};

export {
    sendJsonToIpfs
}