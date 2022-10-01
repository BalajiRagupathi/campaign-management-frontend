import React, { useEffect, useRef, useState } from 'react';
import './offerCreation.scss';

import { storage } from '../../components/firebase/firebase';
import Table from "../../components/Table/Table";
import Header from "../../components/Header/Header";

import { offer_columns } from "../../services/TableColumns";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { createOffer, getOffers, deleteOffer, updateOffer } from '../../services/AuthHttpRequest';


const OfferCreation = (props) => {
  // History
  const history = useHistory();
  // Refs
    const nav = useRef();
    const inputRef = useRef();
  // Local states
    const [inputType, setInputType] = useState('text');
    const [accept, setAccept] = useState('text');
    const [label, setLable] = useState('Create a text offer');
    const [data, setData] = useState(null);
    const [offerTitle, setOfferTitle] = useState(null);
    const [offerContent, setOfferContent] = useState(null);
    const [upload, setUpload] = useState(true);
    const [response, setResponse] = useState(null);
    const [Videotitle, setVideotitle] = useState(null);
    const [VideoDiscription, setVideoDiscription] = useState(null);
    const [video, setVideo] = useState(null);
    const [youtubeResponse, setYoutubeResponse] = useState(null);
    const [edit,setEdit] = useState(false);
    const [editId,setEditId] = useState(false);
    const [tableData,setTableData] = useState(null);
    const [reload,setReload] = useState(true);
    const [action,setAction] = useState(null);
    // UserID
    let id = JSON.parse(localStorage.getItem("currentUserDetails")).id;

    const customColumn = [ // Delete and Edit colums for offers table
      {
        id: "delete",
        Header: "Delete",
        accessor: "Delete",
        Cell: ({ row }) => {
            return (
              <button className="btn btn-danger" 
              disabled={row.original.status!=="pending"} 
              title={(row.original.status==="pending")?" ":"Scheduled offer can't be deleted"} 
              onClick={()=>{
                setReload(false);
                deleteOffer(row.original.offer_id).then(res=>{
                  getOffers().then(res=>{
                    setAction("Deleted");
                    setResponse(true);
                    setTableData(res);
                    console.log(res);
                    setReload(true);
                  })
                });
              }}
              >
                Delete
              </button>
            );
        },
      },
      {
        id: "edit",
        Header: "Edit",
        accessor: "Edit",
        Cell: ({ row }) => {
            return (
              <button className="btn btn-info" 
              disabled={row.original.status!=="pending"} 
              title={(row.original.status==="pending")?" ":"Scheduled offer can't be edited"} 
              onClick={()=>{
                setResponse(false)
                setReload(false)
                setEdit(true);
                setEditId(row.original.offer_id);
                setReload(true);
                console.log(row.original.offer_id);
              }}
              >
                Edit
              </button>
            );
        },
      },
    ];

    const select=(e,type,accepts,label)=>{ // Nav bar's operations
        setInputType(type);
        setAccept(accepts);
        setLable(label);
        setResponse(null);
        setData(null);
        Array.from(nav.current.children).forEach(e=>{
            e.classList.remove('activeh');
        })
        e.target.classList.add('activeh');
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      setUpload(false);
      setResponse(null);
      setReload(false)
      if(edit){
        setEdit(false)
        if(accept === "video/*"){ // Uploading video
          const videoData = new FormData();
    
          videoData.append("videoFile",video);
          videoData.append("title",Videotitle);
          videoData.append("description",VideoDiscription);
          console.log("edit video");
    
          axios.post("http://localhost:8080/upload",videoData);
        }
        else if(accept === "image/*"){ // Uploading image
  
          console.log("edit image");
          storage.ref(`images/offers/${offerContent.name}`).put(offerContent).then(data => {
            data.ref.getDownloadURL().then(url => {
                setData(url);
                setUpload(true);
                inputRef.current.value=null;
                setOfferContent(null);
                updateOffer(editId,id,offerTitle,url,"image").then((res)=>{
                  setResponse(true);
                  getOffers().then(res=>{
                    setTableData(res);
                    console.log(res);
                    setAction("Updated");
                    setReload(true);
                  })
                }); // Sending offer to backend
            });
          });
        }else{ // Uploading text offer
          console.log("edit text");
          updateOffer(editId,id,offerTitle,data,"text").then((res)=>{
                  setResponse(true);
                  setUpload(true);
                  getOffers().then(res=>{
                    setTableData(res);
                    console.log(res);
                    setAction("Updated");
                    setReload(true);
                  })
                }) // Sending offer to backend
        }

      }else{
        if(accept === "edit video/*"){ // Uploading video
          const videoData = new FormData();
    
          videoData.append("videoFile",video);
          videoData.append("title",Videotitle);
          videoData.append("description",VideoDiscription);
    
          axios.post("http://localhost:8080/upload",videoData);
        }
        else if(accept === "image/*"){ // Uploading image
  
          console.log("image");
          storage.ref(`images/offers/${offerContent.name}`).put(offerContent).then(data => {
            data.ref.getDownloadURL().then(url => {
                setData(url);
                setUpload(true);
                inputRef.current.value=null;
                setOfferContent(null);
                createOffer(id,offerTitle,url,"image").then((res)=>{
                  setResponse(true);
                  getOffers().then(res=>{
                    setTableData(res);
                    console.log(res);
                    setReload(true);
                    setAction("Created");
                  })
                }); // Sending offer to backend
            });
          });
        }else{ // Uploading text offer
          createOffer(id,offerTitle,data,"text").then((res)=>{
                  setResponse(true);
                  setUpload(true);
                  getOffers().then(res=>{
                    setTableData(res);
                    console.log(res);
                    setAction("Created");
                    setReload(true);
                  })
                  
                }) // Sending offer to backend
        }

      }
    }
    // Getting response from backend via url query when video is uploaded on youtube
    useEffect(async () => {
      getOffers().then(res=>{
        console.log(res);
        setTableData(res);
      });
      if(props.location.search){
        setYoutubeResponse(props.location.search.split('='));        
        if(props.location.search.split('=')[1].split("&")[0]!=='404'){
          let content = `https://www.youtube.com/watch?v=${props.location.search.split('=')[1].split('&status')[0]}`;
          (edit)?updateOffer(editId,id,props.location.search.split('=')[3],content,"video").then(res=>setResponse(true)):createOffer(id,props.location.search.split('=')[3],content,"video").then(res=>setResponse(true)) // Sending data to backend
        }
      }
      history.push("/offercreation");
    },[])
    return (
        <>
            <Header />
            <div className="container-fluid" style={{marginTop:'7rem'}}>
            <div className="offer my-5 box-shadow">
              {/* Navigation bar to choose mode of offer */}
                <nav className="nav">
                    <ul ref={nav}>
                        <li className="activeh" onClick={(e)=>{
                            select(e,"text",null,"Create a text offer")
                        }}>Text</li>
                        <li onClick={(e)=>{
                          select(e,"file","image/*","Upload your offers Image")
                        }}>Image</li>
                        <li onClick={(e)=>{
                          select(e,"file","video/*","Upload your offers video")
                        }}>Video</li>
                    </ul>
                </nav>
                {/* Youtube Response Message */}
                <div className="text-center">
                {
                    youtubeResponse && <>{
                      youtubeResponse[1].split("&")[0]==='404'?<>
                        <h5 className="text-danger text-capitalize font-weight-bold">Sorry we are not able to upload your video now. Please try again later</h5>
                      </>:<>
                      <h3>Hurrah Video Uploaded!!!</h3>
                      <a href={`https://www.youtube.com/watch?v=${youtubeResponse[1].split('&status')[0]}`} 
                        target="_blank" 
                        rel="noreferrer">
                        Preview Link</a>
                      </>
                      }</>
                      
                  }
                </div>
                {/* Form for offer updation */}
                { edit?<>
                {(inputType==="file" && accept==="video/*")?
                <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
                  {response && <h4 className="text-capitalize">Offer successfully {action}</h4>}
                  <label className="text-warning" htmlFor="offerId">You are changes will affect offer with Id : {editId}</label>
                  <label>select video to upload on youtube</label>
                    <label htmlFor="title">Video Title</label>
                    <input id="title" type="text" required onChange={(e)=>setVideotitle(e.target.value)} />
                    <label htmlFor="description">Video Description</label>
                    <input id="description" type="text" required onChange={(e)=>setVideoDiscription(e.target.value)} />
                    <label htmlFor="videos">Select a video</label>
                    <input id="videos" accept="video/*" type="file" required onChange={(e)=>setVideo(e.target.files[0])} />
                    <button className="btn btn-success m-2 box-shadow" type="submit">Upload Video</button>
                        <button className="btn btn-danger m-2 box-shadow" onClick={()=>{
                          setEdit(false)
                          setEditId(null)
                        }}>CANCEL</button>
                </form>
                :
                  <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
                  <label className="text-warning" htmlFor="offerId">You are changes will affect offer with Id : {editId}</label>
                      {response && <h4 className="text-capitalize">Offer successfully {action}</h4>}
                    <label htmlFor="OfferTitle">Offer Title</label>
                    <input id="OfferTitle" type="text" required onChange={(e)=>setOfferTitle(e.target.value)} />
                    <label>{label}</label>
                        {
                        (inputType === "text")?<textarea id="textOffer" ref={inputRef} onChange={(e)=>{
                            setData(e.target.value);
                            setOfferContent(e.target.value);
                        }} name="offer" required rows="3" cols="50" ></textarea> :
                        <div>
                          <input name="offer" ref={inputRef} type={inputType} accept={accept} onChange={(e)=>{
                              console.log(e.target.files);
                              setOfferContent(e.target.files[0]);    
                          }} required />
                        </div>
                          }
                        <button className="btn btn-success m-2 box-shadow" disabled={!upload} type="submit">{
                          upload?"Upload":"Uploading"
                        }</button>
                        <button className="btn btn-danger m-2 box-shadow" onClick={()=>{
                          setEdit(false)
                          setEditId(null)
                        }}>CANCEL</button>
                        {/* Image preview */}
                        <div className="text-center">
                          {
                            data && inputType!=="text" && accept==="image/*" && <>
                              <h4>Upload Preview</h4>
                              <img src={data} alt="preview" />
                            </>
                          }
                        </div>
                </form>
                }
                </>:<>
                {(inputType==="file" && accept==="video/*")?
                <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
                {response && <h4 className="text-capitalize">Offer successfully  {action}</h4>}
                  <label>select video to upload on youtube</label>
                    <label htmlFor="title">Video Title</label>
                    <input id="title" type="text" required onChange={(e)=>setVideotitle(e.target.value)} />
                    <label htmlFor="description">Video Description</label>
                    <input id="description" type="text" required onChange={(e)=>setVideoDiscription(e.target.value)} />
                    <label htmlFor="videos">Select a video</label>
                    <input id="videos" accept="video/*" type="file" required onChange={(e)=>setVideo(e.target.files[0])} />
                    <button className="btn btn-success m-2 box-shadow" type="submit">Upload Video</button>
                </form>
                :
                  <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
                      {response && <h4 className="text-capitalize">Offer successfully  {action}</h4>}
                    <label htmlFor="OfferTitle">Offer Title</label>
                    <input id="OfferTitle" type="text" required onChange={(e)=>setOfferTitle(e.target.value)} />
                    <label>{label}</label>
                        {
                        (inputType === "text")?<textarea id="textOffer" ref={inputRef} onChange={(e)=>{
                            setData(e.target.value);
                            setOfferContent(e.target.value);
                        }} name="offer" required rows="3" cols="50" ></textarea> :
                        <div>
                          <input name="offer" ref={inputRef} type={inputType} accept={accept} onChange={(e)=>{
                              console.log(e.target.files);
                              setOfferContent(e.target.files[0]);    
                          }} required />
                        </div>
                          }
                        <button className="btn btn-success m-2 box-shadow" disabled={!upload} type="submit">{
                          upload?"Upload":"Uploading"
                        }</button>
                        {/* Image preview */}
                        <div className="text-center">
                          {
                            data && inputType!=="text" && accept==="image/*" && <>
                              <h4>Upload Preview</h4>
                              <img src={data} alt="preview" />
                            </>
                          }
                        </div>
                </form>
                }

                </>
                }
            </div>
            <div>
              {/* Table for viewing offers */}
              <div  className="my-5">
                  {
                    tableData && (reload) &&
                    <Table 
                      title="OFFERS TABLE"
                      data={tableData}
                      columns={offer_columns}
                      customCells={customColumn}
                    />
                  }
              </div>
            </div>
        </div>
        </>
    )
}

export default OfferCreation
