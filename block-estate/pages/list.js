import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendJsonToIpfs } from '@/utils/pinata';

const validationSchema = Yup.object({
    askingPrice: Yup.number().required('Required'),
    yearBuilt: Yup.number().required('Required'),
    hoa: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    additionalInformation: Yup.string(),
    floors: Yup.number().required('Required'),
    rooms: Yup.number().required('Required'),
    baths: Yup.number().required('Required'),
    garage: Yup.number().required('Required'),
    propertyPictures: Yup.mixed(),
    sellerName: Yup.string().required('Required'),
    sellerEmail: Yup.string().email('Invalid email address').required('Required'),
    sellerPhone: Yup.string().required('Required')
});

export default function List() {
    const [selectedImages, setSelectedImages] = useState([]);

    return (
        <div className="container mt-5">
            <Formik
                initialValues={{
                    askingPrice: '',
                    yearBuilt: '',
                    hoa: '',
                    address: '',
                    city: '',
                    country: '',
                    postalCode: '',
                    additionalInformation: '',
                    floors: '',
                    rooms: '',
                    baths: '',
                    garage: '',
                    propertyPictures: null,
                    sellerName: '',
                    sellerEmail: '',
                    sellerPhone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                    const response = await sendJsonToIpfs(values)
                    console.log("Response: ", response);
                    setSubmitting(false);
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <h2 className="mb-4">Property Information</h2>
                        <div className="mb-3">
                            <label className="form-label">Asking Price</label>
                            <Field name="askingPrice" type="number" className="form-control" />
                            <ErrorMessage name="askingPrice" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Year Built</label>
                            <Field name="yearBuilt" type="number" className="form-control" />
                            <ErrorMessage name="yearBuilt" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">HOA</label>
                            <Field name="hoa" type="text" className="form-control" />
                            <ErrorMessage name="hoa" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <Field name="address" type="text" className="form-control" />
                            <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <Field name="city" type="text" className="form-control" />
                            <ErrorMessage name="city" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <Field name="country" type="text" className="form-control" />
                            <ErrorMessage name="country" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Postal Code</label>
                            <Field name="postalCode" type="text" className="form-control" />
                            <ErrorMessage name="postalCode" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Additional Information</label>
                            <Field name="additionalInformation" as="textarea" className="form-control" />
                            <ErrorMessage name="additionalInformation" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Floors</label>
                            <Field name="floors" type="number" className="form-control" />
                            <ErrorMessage name="floors" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rooms</label>
                            <Field name="rooms" type="number" className="form-control" />
                            <ErrorMessage name="rooms" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Baths</label>
                            <Field name="baths" type="number" className="form-control" />
                            <ErrorMessage name="baths" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Garage</label>
                            <Field name="garage" type="number" className="form-control" />
                            <ErrorMessage name="garage" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Property Pictures</label>
                            <input
                                name="propertyPictures"
                                type="file"
                                multiple
                                className="form-control"
                                onChange={(event) => {
                                    const files = Array.from(event.currentTarget.files);
                                    setFieldValue("propertyPictures", files);
                                    setSelectedImages(files.map(file => URL.createObjectURL(file)));
                                }}
                            />
                            <ErrorMessage name="propertyPictures" component="div" className="text-danger" />
                        </div>

                        <h2 className="mb-4">Seller Information</h2>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <Field name="sellerName" type="text" className="form-control" />
                            <ErrorMessage name="sellerName" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field name="sellerEmail" type="email" className="form-control" />
                            <ErrorMessage name="sellerEmail" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <Field name="sellerPhone" type="tel" className="form-control" />
                            <ErrorMessage name="sellerPhone" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                        <div className="mt-4">
                            <h3>Property Images</h3>
                            <div className="d-flex flex-wrap">
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="m-2">
                                        <img src={image} alt={`Selected ${index}`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}