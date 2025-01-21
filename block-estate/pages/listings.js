import React, { useEffect, useState } from 'react';
import { getDataForCids, getPinListFromIpfs } from '@/utils/pinata';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ipfsGateway } from '@/config';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const cidList = await getPinListFromIpfs();
                const data = await getDataForCids(cidList);
                const validListings = data.filter(listing => listing?.propertyInfo);
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
        <div>
            {listings.map((list, i) => (
                <div key={i}>
                    <div className="container px-4 py-5">
                        <h2 className="pb-2 border-bottom fw-bold">{list.propertyInfo.address}</h2>
                        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                            <div className="col d-flex flex-column align-items-start gap-2">
                                <div className="col">
                                    <div className="card overflow-hidden rounded-4 shadow-lg">
                                        <div className="d-flex flex-column p-3 pb-0 text-shadow-1">
                                            <img className="overflow-hidden rounded-4 shadow-lg" src={`https://${ipfsGateway}.mypinata.cloud/ipfs/${list.propertyInfo.propertyPictures[0]}`} style={{ maxWidth: '500px', maxHeight: '500px' }} />
                                            <ul className="d-flex list-unstyled mt-auto">
                                                <li className="d-flex align-items-center me-1 mt-1">
                                                    <img src="map-solid.svg" alt="twbs" width="30" height="30" className="flex-shrink-0" />
                                                </li>
                                                <li className="d-flex align-items-center me-2 mt-2">
                                                    <h6 style={{ color: 'black' }}>{list.propertyInfo.address}</h6>
                                                </li>
                                                <li className="d-flex align-items-center me-1 mt-2">
                                                    <h6 style={{ color: 'black' }}>{list.propertyInfo.city}</h6>
                                                </li>
                                                <li className="d-flex align-items-center me-1 mt-2">
                                                    <h6 style={{ color: 'black' }}>{list.propertyInfo.country}</h6>
                                                </li>
                                                <li className="d-flex align-items-center me-1 mt-2">
                                                    <h6 style={{ color: 'black' }}>{list.propertyInfo.postalCode}</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-cols-2 row-cols-md-2">
                                    <a className="list-group-item list-group-item-action d-flex gap-3 py-4" aria-current="true">
                                        <img src="dollar-solid.svg" alt="twbs" width="32" height="32" className="flex-shrink-0" />
                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                            <div>
                                                <h5 className="mb-0">${list.propertyInfo.askingPrice}</h5>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="list-group-item list-group-item-action d-flex gap-2 py-1" aria-current="true">
                                        <div className="d-flex gap-4 justify-content-between">
                                            <div>
                                                <h6 className="mb-0">Seller: {list.propertyInfo.sellerName}<img src="person-solid.svg" alt="twbs" width="20" height="20" className="flex-shrink-0" /></h6>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">{list.propertyInfo.sellerEmail}<img src="at-solid.svg" alt="twbs" width="20" height="20" className="flex-shrink-0" style={{ marginLeft: '2px' }} /></h6>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">{list.propertyInfo.sellerPhone}<img src="phone-solid.svg" alt="twbs" width="20" height="20" className="flex-shrink-0" style={{ marginLeft: '2px' }} /></h6>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                        <img src="calendar-solid.svg" alt="twbs" width="32" height="32" className="flex-shrink-0" />
                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                            <div>
                                                <h5 className="mb-0">Listed since: {list.propertyInfo.date}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row row-cols-sm-2 g-4">
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center bg-gradient fs-4 rounded-3">
                                            <img src='house-solid.svg' width="32" height="32" style={{ marginRight: '4px' }} />
                                            <h4 className="fw-semibold">Floors {list.propertyInfo.floors}</h4>
                                        </div>
                                    </div>
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center bg-gradient fs-4 rounded-3">
                                            <img src='build-solid.svg' width="32" height="32" style={{ marginRight: '4px' }} />
                                            <h4 className="fw-semibold">Built {list.propertyInfo.yearBuilt}</h4>
                                        </div>
                                    </div>
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center bg-gradient fs-4 rounded-3">
                                            <img src='bed-solid.svg' width="32" height="32" style={{ marginRight: '4px' }} />
                                            <h4 className="fw-semibold">Beds {list.propertyInfo.rooms}</h4>
                                        </div>
                                    </div>
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center bg-gradient fs-4 rounded-3">
                                            <img src='bath-solid.svg' width="32" height="32" style={{ marginRight: '4px' }} />
                                            <h4 className="fw-semibold">Baths {list.propertyInfo.baths}</h4>
                                        </div>
                                    </div>
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center bg-gradient fs-4 rounded-3">
                                            <img src='garage-solid.svg' width="32" height="32" style={{ marginRight: '4px' }} />
                                            <h4 className="fw-semibold">Garage {list.propertyInfo.garage}</h4>
                                        </div>
                                    </div>
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center bg-gradient fs-4 rounded-3">
                                            <img src='dollar-solid.svg' width="32" height="32" style={{ marginRight: '4px' }} />
                                            <h4 className="fw-semibold">HOA ${list.propertyInfo.hoa}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col d-flex flex-column py-5">
                                    <p>{list.propertyInfo.additionalInformation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b-example-divider"></div>
                </div>
            ))}
        </div>
    );
};

export default Listings;