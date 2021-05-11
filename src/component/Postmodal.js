import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';
import firebase from 'firebase';
import { postArtical } from '../action';

function Postmodal(props) {

    const [EditorState, setEditorState] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('')

    const handelChange = (e) => {
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert("Not is image")
            return;
        }
        setShareImage(image)
        console.log(image);
    }

    const reset = (e) => {
        setEditorState("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handelClick(e)
    }

    const switchAssestArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArc = (e)=>{
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        
        const payload = {
            user:props.user,
            timestamp:firebase.firestore.Timestamp.now(),
            image:shareImage,
            video:videoLink,
            description:EditorState
        }
        // console.log(payload);
        props.postArtical(payload)
        reset(e)

    }

    return (
        <>
            {
                props.showModal === "open" &&
                <Container>
                    <Content>
                        <Header>
                            <h2>Create Post</h2>
                            <Button>
                                <img onClick={(e) => reset(e)} src="/images/close-icon.svg" alt="close" />
                            </Button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                {
                                    props.user ? <img src={props.user.photoURL} alt="" /> 
                                    :  <img src="/images/user.svg" alt="" /> 

                                }
                                {
                                    props.user && <span>{props.user.displayName}</span>
                                }
                            </UserInfo>
                            <Editor>
                                <textarea value={EditorState} onChange={(e) => setEditorState(e.target.value)} placeholder="What Do you want to talk about"></textarea>
                                <UploadImage>
                                    {
                                        assetArea === "image" ? (
                                            <>
                                                <input type="file" style={{ display: 'none' }} accept="image/gif,image/jpg, image/jpeg , image/png " name="image"
                                                    id="file"
                                                    onChange={handelChange} />
                                                <p>
                                                    <label htmlFor="file">Select image</label>
                                                </p>
                                             { shareImage && <img src={URL.createObjectURL(shareImage)} /> }
                                            </>
                                    ) : (
                                        assetArea === "media" && (
                                            <>
                                                <input type="text" placeholder="Enter Video link" onChange={(e) => setVideoLink(e.target.value)} />
                                                {
                                                    videoLink && <ReactPlayer width={'100%'} url={videoLink} />
                                                }
                                            </>
                                        )
                                    )
                                    }
                                </UploadImage>
                            </Editor>
                        </SharedContent>
                        <SharedCreation>
                            <AttachAssets>
                                <AttachButton onClick={() => setAssetArea("image")}>
                                    <img src="/images/photo-icon.svg" alt="" />
                                </AttachButton>
                                <AttachButton onClick={() => setAssetArea("media")}>
                                    <img src="/images/video-icon.svg" alt="" />
                                </AttachButton>
                            </AttachAssets>
                            <ShareComment>
                                <AttachButton>
                                    <img src="/images/comment-icon.svg" alt="" />
                                    <span>Anyone</span>
                                </AttachButton>
                            </ShareComment>
                            <PostButton onClick={(e) => postArc(e)} disabled={props.loading ? true : false}>Post</PostButton>
                        </SharedCreation>
                    </Content>
                </Container>
            }
        </>
    )
}


const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:999;
    color:black;
    background-color:rgba(0,0,0,0.6);
    animation:fadeIn 0.2s;
`;

const Content = styled.div`
    width:100%;
    max-width:552px;
    background-color:white;
    max-height:80%;
    overflow:initial;
    border-radius:5px;
    position:relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin:0 auto;
`;



const Header = styled.div`
    display:block;
    padding:16px 20px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:16px;
    line-height:1.5px;
    color:rgba(0,0,0,0.6);
    font-weight:400;
    display:flex;
    justify-content:space-between;
    align-items:center;
    button{
        background:transparent;
        border:none;
        outline:none;
        cursor: pointer;
        height:40px;
        width:40px;
        border-radius:50%;
        min-width:auto;
        color:rgba(0,0,0,0.15)
        svg,img{
            pointer-events:none;
        }
        &:hover{
            background-color:lightblue;  
        }
    }
`;

const Button = styled.button``;

const SharedContent = styled.div`
    display:flex;
    flex-direction:column;
    flex-grow:1;
    overflow-y:auto;
    vertical-align:baseline;
    background:transparent;
    padding:8px 12px;

`;

const UserInfo = styled.div`
    display:flex;
    align-items:center;
    padding:12px 24px;
    svg,img{
        width:48px;
        height:48px;
        background-clip:content-box;
        border:2px solid transparent;
        border-radius:50%;
    }
    span{
        font-size:16px;
        font-weight:600;
        line-height:1.5;
        margin-left:5px;
    }
`;

const SharedCreation = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 24px 12px 16px;

`;



const AttachButton = styled.div`
    display:flex;
    align-items:center;
    height:48px;
    padding-right:10px;
    cursor: pointer;
    min-width:auto;
    color:rgba(0,0,0,0.5);
`;

const AttachAssets = styled.div`
    display:flex;
    align-items:center;
    padding-right:8px;
    ${AttachButton}{
        width:40px;
    }
`;

const ShareComment = styled.div`
    padding-left:8px;
    margin-right:8px;
    border-left:1px solid rgba(0,0,0,0.15);
    ${AttachButton}{
        svg{
            margin-right:5px;
        }
    }
`;

const PostButton = styled.div`
    max-width:60px;
    background-color:20px;
    padding-left:16px;
    padding-right:16px;
    cursor: pointer;
    background: ${(props) => (!props.disabled ? "rgba(0,0,0,0.8)" : "#8066c2")};
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:10%;
    height:40px;
    &:hover{
        background:#004182;
    }
`;

const Editor = styled.div`
    padding:12px 24px;
    textarea{
        width:100%;
        min-height:100px;
        resize:none;
    }
    input{
        width:100%;
        height:35px;
        font-size:35px;
        margin-bottom:20px;
    }
`;

const UploadImage = styled.div`
    text-align:center;
    img{
        width:100%;
    }    
`;



const mapStateToProps = (state)=>{
    return {
      user:state.userState.user
    };
  }
  
const mapDispatchToProps = (dispatch)=> ({
    postArtical:(payload) => dispatch(postArtical(payload))
});
  

  
export default connect(mapStateToProps,mapDispatchToProps)(Postmodal);
