import React, { useEffect, useState } from 'react';
import { getImageFromPinata } from '@/utils/pinata';
import 'bootstrap/dist/css/bootstrap.min.css';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Replace with your actual CID and gateway JWT
                const cid = 'YOUR_CID_HERE';
                const data = await getImageFromPinata(cid);
                setListings(data.propertyInfo);
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
                                <h5 className="card-title">{listing.address}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{listing.city}, {listing.country}</h6>
                                <p className="card-text">Asking Price: ${listing.askingPrice}</p>
                                <p className="card-text">Year Built: {listing.yearBuilt}</p>
                                <p className="card-text">HOA: {listing.hoa}</p>
                                <p className="card-text">Postal Code: {listing.postalCode}</p>
                                <p className="card-text">Floors: {listing.floors}</p>
                                <p className="card-text">Rooms: {listing.rooms}</p>
                                <p className="card-text">Baths: {listing.baths}</p>
                                <p className="card-text">Garage: {listing.garage}</p>
                                <p className="card-text">Additional Information: {listing.additionalInformation}</p>
                                <h6 className="card-subtitle mb-2 text-muted">Seller Information</h6>
                                <p className="card-text">Name: {listing.sellerName}</p>
                                <p className="card-text">Email: {listing.sellerEmail}</p>
                                <p className="card-text">Phone: {listing.sellerPhone}</p>
                                <div className="mt-3">
                                    <h6 className="card-subtitle mb-2 text-muted">Property Pictures</h6>
                                    <div className="d-flex flex-wrap">
                                        {listing.propertyPictures.map((picture, picIndex) => (
                                            <div key={picIndex} className="m-2">
                                                <img src={`https://${ipfsGateway}.gateway.pinata.cloud/ipfs/${picture}`} alt={`Property ${picIndex}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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