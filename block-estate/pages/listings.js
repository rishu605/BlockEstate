import React, { useEffect, useState } from 'react';
import { getDataForCids, getImageFromPinata, getPinListFromIpfs } from '@/utils/pinata';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ipfsGateway } from '@/config';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Replace with your actual CID and gateway JWT
                const cidList = await getPinListFromIpfs()
                console.log("Data: ", cidList)
                const data = await getDataForCids(cidList);
                console.log("data: ", data)
                const validListings = data.filter(listing => listing?.propertyInfo);
                console.log("Listings: ", validListings)
                setListings(validListings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching listings:', error);
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Property Listings</h1>
            <div className="row">
                {listings.map((listing, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{listing?.propertyInfo?.address}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{listing?.propertyInfo?.city}, {listing?.propertyInfo?.country}</h6>
                                <p className="card-text">Asking Price: ${listing?.propertyInfo?.askingPrice}</p>
                                <p className="card-text">Year Built: {listing?.propertyInfo?.yearBuilt}</p>
                                <p className="card-text">HOA: {listing?.propertyInfo?.hoa}</p>
                                <p className="card-text">Postal Code: {listing?.propertyInfo?.postalCode}</p>
                                <p className="card-text">Floors: {listing?.propertyInfo?.floors}</p>
                                <p className="card-text">Rooms: {listing?.propertyInfo?.rooms}</p>
                                <p className="card-text">Baths: {listing?.propertyInfo?.baths}</p>
                                <p className="card-text">Garage: {listing?.propertyInfo?.garage}</p>
                                <p className="card-text">Additional Information: {listing?.propertyInfo?.additionalInformation}</p>
                                <h6 className="card-subtitle mb-2 text-muted">Seller Information</h6>
                                <p className="card-text">Name: {listing?.propertyInfo?.sellerName}</p>
                                <p className="card-text">Email: {listing?.propertyInfo?.sellerEmail}</p>
                                <p className="card-text">Phone: {listing?.propertyInfo?.sellerPhone}</p>
                                <div className="mt-3">
                                    <h6 className="card-subtitle mb-2 text-muted">Property Pictures</h6>
                                    <div className="d-flex flex-wrap">
                                        {listing?.propertyInfo?.propertyPictures?.map((picture, picIndex) => (
                                            <div key={picIndex} className="m-2">
                                                <img src={`https://${ipfsGateway}.mypinata.cloud/ipfs/${picture}`} alt={`Property ${picIndex}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listings;