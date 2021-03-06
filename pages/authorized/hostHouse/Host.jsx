import { useEffect, useState } from 'react';
import CurrentUserService from '../../services/CurrentUserService'
import StickyModal from '../../../components/Shared/StickyModal'
import Layout from '../../../components/Shared/Layout'
import AuthService from '../../services/AuthService';
import Globals from '../../Globals';
import ConfirmationModal from './utils/ConfirmationModal';
import Loader from './utils/Loader';
import { app } from './utils/firebase'

function Host() {
    const [currentUser, setCurrentuser] = useState(null)
    const [canShowLolader, setLoaderVisibility] = useState(0)
    const [canShowConfirmationModal, setConfirmationModalVisibility] = useState(0)
    const [isUploadDone, setCompletionStatus] = useState(0)
    const [hostingInfo, setHostingInfo] = useState({
        picture: "",
        type: "Entire house",
        town: "",
        title: "",
        description: "",
        price: "",
        ownerId: ""
    })
    const handleFireBaseUpload = (houseId) => {
        if (housePhoto === '') {
            console.error(`not an image, the image file is a ${typeof (housePhoto)}`)
        }

        let storageRef = app.storage().ref('houses')
        let fileRef = storageRef.child(housePhoto.name)

        fileRef.put(housePhoto)
            .then(snapShot => { })
            .then(() => {
                fileRef.getDownloadURL()
                    .then(url => {
                        Globals.httpRequest(Globals.updateHouseImageURL, { _id: houseId, imageURL: url })
                            .then(data => {
                                setLoaderVisibility(0)
                                setCompletionStatus(1)
                            })
                    })
            })


    }
    const [housePhoto, setHousePhoto] = useState(null)
    useEffect(() => {


        Globals.httpRequest(Globals.checkAuthorizeization)
            .then(data => {
                if (data['unauthorized']) {
                    CurrentUserService.setCurrentUser(null)
                    AuthService.setAuthorizedStat(false)
                    setCurrentuser(null)
                }
                else {
                    CurrentUserService.setCurrentUser(data)
                    AuthService.setAuthorizedStat(true)
                    setCurrentuser(data)
                    setHostingInfo({ ...hostingInfo, ownerId: data._id })
                }
            })
    }, [])
    function convertImage(image) {
        setHousePhoto(image)
    }
    function submitHostingInfo() {
        setConfirmationModalVisibility(0)
        setLoaderVisibility(1)
        setHostingInfo({ ...hostingInfo, picture: '' })

        let hostingData = { ...hostingInfo, picture: '' }
        delete hostingData._id
        Globals.httpRequest(Globals.hostHouseURL, hostingData)
            .then(data => {
                setHostingInfo(data.info.data)
                handleFireBaseUpload(data.info.data._id)
            })
    }
    return (

        <div>
            <Layout content={
                <div>

                    {!currentUser && <StickyModal />}
                    {currentUser && <div className="hostingRoot">

                        <ConfirmationModal modalStatus={canShowConfirmationModal} setModalStatus={setConfirmationModalVisibility}
                            onCancel={() => {
                                setConfirmationModalVisibility(0)
                            }}
                            onConfirm={() => {
                                submitHostingInfo()
                            }}
                        >
                            <h1>Are you sure?</h1>

                        </ConfirmationModal>

                        <ConfirmationModal modalStatus={isUploadDone}
                            setModalStatus={setCompletionStatus}
                            onCancel={null}
                            onConfirm={() => {
                                location.href = '/'
                            }}
                        >
                            <h2>Your house is succesfully hosted on Airbnb!</h2>
                        </ConfirmationModal>


                        <Loader isVisible={canShowLolader} />
                        <div className="hostingForm">
                            <div className="form-style-10">
                                <h1>Host you house!<span>Fill up the form and host your house on AirBNB!</span></h1>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    setConfirmationModalVisibility(1)
                                }} >
                                    <div className="section"><span>1</span>Location</div>
                                    <div className="inner-wrap">
                                        <label>Town name <textarea required onChange={e => {
                                            setHostingInfo({ ...hostingInfo, town: e.target.value })
                                        }} name="field2"></textarea></label>
                                    </div>

                                    <div className="section"><span>2</span>Title & Description</div>
                                    <div className="inner-wrap">
                                        <label>Home title <input required onChange={e => {
                                            setHostingInfo({ ...hostingInfo, title: e.target.value })
                                        }} type="text" name="field3" /></label>
                                        <label>Home description <textarea required onChange={e => {
                                            setHostingInfo({ ...hostingInfo, description: e.target.value })
                                        }} name="field4"></textarea></label>
                                    </div>

                                    <div className="section"><span>3</span>Pricing:</div>
                                    <div className="inner-wrap">
                                        <label>Price per day <input required onChange={e => {
                                            setHostingInfo({ ...hostingInfo, price: e.target.value })
                                        }} type="number" name="field6" /></label>
                                    </div>
                                    <div className="section"><span>3</span>Photo:</div>
                                    <div className="inner-wrap">
                                        <label style={{ display: "flex", justifyContent: "space-between" }}><p>Add a nice photo of your house!</p>
                                            <input required onChange={e => {
                                                convertImage(e.target.files[0])
                                                setHostingInfo({ ...hostingInfo, picture: URL.createObjectURL(e.target.files[0]) })
                                            }} type="file" name="field6" />
                                        </label>
                                        {hostingInfo.picture && <div>
                                            <p>Preview</p>
                                            <img style={{ width: "100%" }} src={hostingInfo.picture} alt="" />
                                        </div>}
                                    </div>
                                    <div className="button-section">
                                        <input type="submit" name="Sign Up" />
                                        <span className="privacy-policy">
                                            <input type="checkbox" name="field7" />You agree to our Terms and Policy.
                                        </span>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <style jsx="true">
                            {` 
                          .form-style-10{
                            width:50vw;
                            padding:30px;
                            margin:40px auto;
                            background: #FFF;
                            border-radius: 10px;
                            -webkit-border-radius:10px;
                            -moz-border-radius: 10px;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
                            -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
                            -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
                        }
                        .form-style-10 .inner-wrap{
                            padding: 30px;
                            background: #F8F8F8;
                            border-radius: 6px;
                            margin-bottom: 15px;
                        }
                        .form-style-10 h1{
                            background: #2A88AD;
                            padding: 20px 30px 15px 30px;
                            margin: -30px -30px 30px -30px;
                            border-radius: 10px 10px 0 0;
                            -webkit-border-radius: 10px 10px 0 0;
                            -moz-border-radius: 10px 10px 0 0;
                            color: #fff;
                            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
                            font: normal 30px 'Bitter', serif;
                            -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
                            -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
                            box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
                            border: 1px solid #257C9E;
                        }
                        .form-style-10 h1 > span{
                            display: block;
                            margin-top: 2px;
                            font: 13px Arial, Helvetica, sans-serif;
                        }
                        .form-style-10 label{
                            display: block;
                            font: 13px Arial, Helvetica, sans-serif;
                            color: #888;
                            margin-bottom: 15px;
                        }
                        .form-style-10 input[type="text"],
                        .form-style-10 input[type="date"],
                        .form-style-10 input[type="datetime"],
                        .form-style-10 input[type="email"],
                        .form-style-10 input[type="number"],
                        .form-style-10 input[type="search"],
                        .form-style-10 input[type="time"],
                        .form-style-10 input[type="url"],
                        .form-style-10 input[type="password"],
                        .form-style-10 textarea,
                        .form-style-10 select {
                            display: block;
                            box-sizing: border-box;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            width: 100%;
                            padding: 8px;
                            border-radius: 6px;
                            -webkit-border-radius:6px;
                            -moz-border-radius:6px;
                            border: 2px solid #fff;
                            box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
                            -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
                            -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
                        }
                        
                        .form-style-10 .section{
                            font: normal 20px 'Bitter', serif;
                            color: #2A88AD;
                            margin-bottom: 5px;
                        }
                        .form-style-10 .section span {
                            background: #2A88AD;
                            padding: 5px 10px 5px 10px;
                            position: absolute;
                            border-radius: 50%;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border: 4px solid #fff;
                            font-size: 14px;
                            margin-left: -45px;
                            color: #fff;
                            margin-top: -3px;
                        }
                        .form-style-10 input[type="button"], 
                        .form-style-10 input[type="submit"]{
                            background: #2A88AD;
                            padding: 8px 20px 8px 20px;
                            border-radius: 5px;
                            -webkit-border-radius: 5px;
                            -moz-border-radius: 5px;
                            color: #fff;
                            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
                            font: normal 30px 'Bitter', serif;
                            -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
                            -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
                            box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
                            border: 1px solid #257C9E;
                            font-size: 15px;
                        }
                        .form-style-10 input[type="button"]:hover, 
                        .form-style-10 input[type="submit"]:hover{
                            background: #2A6881;
                            -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
                            -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
                            box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
                        }
                        .form-style-10 .privacy-policy{
                            float: right;
                            width: 250px;
                            font: 12px Arial, Helvetica, sans-serif;
                            color: #4D4D4D;
                            margin-top: 10px;
                            text-align: right;
                        }
                    `}
                        </style>
                    </div>


                    }

                </div>

            } />

        </div>

    );
}

export default Host;