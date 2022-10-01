import React, { Component } from "react";
import { storage } from "./firebase";
import classes from "./firebase_configure.module.css";
import Notification from "../../services/NotificationService";

class Firebase extends Component {

    state = {
        image: "",
        img:this.props.img ||  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHuPs2jJkFYDFGcQcWx9B8oPtbn0eOJKmIfA&usqp=CAU"
    }



    handleUpload = (e) => {
        this.setState({ image: e.target.files[0] });
        const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(e.target.files[0].name)
                    .getDownloadURL()
                    .then(url => {
                        this.props.onChange(url)
                        Notification.show({status:true,message:"Please save the changes"})
                        this.setState({ img: url })
                    })
            }
        )
    }

    render() {
        return (
            <div className={`${classes.image}`}>
                <img
                    src={this.state.img}
                    className={`border border-secondary img-fluid ${classes.img}`}
                    alt="user_profile"
                />

                <div className="  text-center">
                    <input
                        type="file"
                        id="file"
                        className={`${classes.input}`}
                        onChange={this.handleUpload}
                    />
                    <label for="file" className={`${classes.image_label}`}><i className='bx bx-camera' style={{ fontSize: '35px', position: 'relative', top: '-10px' }} ></i></label>
                </div>
            </div>
        )
    }
}

export default Firebase;