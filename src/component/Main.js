import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getArticalApi } from '../action';
import Postmodal from './Postmodal'
import ReactPlayer from 'react-player'
import moment from 'moment';


function Main(props) {
    const [showModal, setShowModal] = useState("close");

    const handelClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    }

    useEffect(() => {
        props.getArticals();
    }, [])

    return (
        // <Container>
        //     <ShareBox>
        //         <div>
        //             {
        //                 props.user && props.user.photoURL ? (
        //                     <img src={props.user.photoURL} alt="" />
        //                 ) : (
        //                     <img src="/images/user.svg" alt="" />
        //                 )
        //             }
        //             <button onClick={handelClick}>Start a post</button>
        //         </div>
        //         <div>
        //             <button>
        //                 <img src="/images/photo-icon.svg" alt="" />
        //                 <span>Photos</span>
        //             </button>
        //             <button>
        //                 <img src="/images/video-icon.svg" alt="" />
        //                 <span>Videos</span>
        //             </button>
        //             <button>
        //                 <img src="/images/event-icon.svg" alt="" />
        //                 <span>Events</span>
        //             </button>
        //             <button>
        //                 <img src="/images/artical-icon.svg" alt="" />
        //                 <span>Artical</span>
        //             </button>

        //         </div>
        //     </ShareBox>
        //     {props.articals.length === 0 ? <p>There Is no artical</p> : (
        //         <>
        //             <Content>
        //                 {
        //                     props.loading && <img src='/images/loading.gif' />
        //                 }
        //                 {

        //                     props.articals.map((Art, key) => (
        //                         <Artical key={key}>
        //                             <SharedArtical>
        //                                 <Link to="/home">
        //                                     <img src={Art.actor.image} alt="" />
        //                                     <div>
        //                                         <span>{Art.actor.title}</span>
        //                                         {/* <span>info</span> */}
        //                                         <span>7/20/220 </span>
        //                                     </div>
        //                                 </Link>
        //                                 <button>
        //                                     <img src="/images/glip-icon.svg" alt="" />
        //                                 </button>
        //                             </SharedArtical>
        //                             <Description></Description>
        //                             <SharedImage>
        //                                 <Link to="#">
        //                                     <img src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg" alt="" />
        //                                 </Link>
        //                             </SharedImage>
        //                             <Social>
        //                                 <li>
        //                                     <button>
        //                                         <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
        //                                         <span>75</span>
        //                                     </button>
        //                                 </li>
        //                                 <li>
        //                                     <span>75 Comments</span>
        //                                 </li>
        //                             </Social>
        //                             <SocialAction>
        //                                 <button>
        //                                     <img src="/images/like-icon.svg" alt="" />
        //                                     <span>Like</span>
        //                                 </button>
        //                                 <button>
        //                                     <img src="/images/comment-icon.svg" alt="" />
        //                                     <span>Comments</span>
        //                                 </button>
        //                                 <button>
        //                                     <img src="/images/share-icon.svg" alt="" />
        //                                     <span>Share</span>
        //                                 </button>
        //                                 <button>
        //                                     <img src="/images/send-icon.svg" alt="" />
        //                                     <span>Send</span>
        //                                 </button>
        //                             </SocialAction>
        //                         </Artical>
        //                     ))
        //                 }
        //             </Content>
        //             <Postmodal showModal={showModal} handelClick={handelClick} />
        //         </>
        //     )

        //     }
        // </Container>
        <>
            <Container>
                <ShareBox>
                    <div>
                        {
                            props.user && props.user.photoURL ? (
                                <img src={props.user.photoURL} alt="" />
                            ) : (
                                <img src="/images/user.svg" alt="" />
                            )
                        }
                        <button onClick={handelClick}>Start a post</button>
                    </div>
                    <div>
                        <button>
                            <img src="/images/photo-icon.svg" alt="" />
                            <span>Photos</span>
                        </button>
                        <button>
                            <img src="/images/video-icon.svg" alt="" />
                            <span>Videos</span>
                        </button>
                        <button>
                            <img src="/images/event-icon.svg" alt="" />
                            <span>Events</span>
                        </button>
                        <button>
                            <img src="/images/artical-icon.svg" alt="" />
                            <span>Artical</span>
                        </button>

                    </div>
                </ShareBox>
                <Content>
                    {
                        props.loading && <img src='/images/loading.gif' />
                    }
                    {
                        props.articals.length > 0 &&
                        props.articals.map((art, key) => (
                            <Artical key={key}>
                                <SharedArtical>
                                    <Link to="/home">
                                        <img src={art.actor.image} alt="" />
                                        <div>
                                            <span>{art.actor.title}</span>
                                            {/* <span>info</span> */}
                                            <span>{art.actor.date.toDate().toLocaleString()}</span>
                                        </div>
                                    </Link>
                                    <button>
                                        <img src="/images/glip-icon.svg" alt="" />
                                    </button>
                                </SharedArtical>
                                <Description>{art.description}</Description>
                                <SharedImage>
                                    {
                                        art.sharedImage &&
                                        <Link to="#">
                                            <img src={art.sharedImage} alt="" />
                                        </Link>
                                    }
                                </SharedImage>
                                <SharedImage>
                                    {
                                        art.video &&
                                        <ReactPlayer width={"100%"} url={art.video} />
                                    }
                                </SharedImage>
                                <Social>
                                    <li>
                                        <button>
                                            <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                                            <span>75</span>
                                        </button>
                                    </li>
                                    <li>
                                        <span>{art.comments} Comments</span>
                                    </li>
                                </Social>
                                <SocialAction>
                                    <button>
                                        <img src="/images/like-icon.svg" alt="" />
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img src="/images/comment-icon.svg" alt="" />
                                        <span>Comments</span>
                                    </button>
                                    <button>
                                        <img src="/images/share-icon.svg" alt="" />
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <img src="/images/send-icon.svg" alt="" />
                                        <span>Send</span>
                                    </button>
                                </SocialAction>
                            </Artical>
                        ))
                    }


                    <Postmodal showModal={showModal} handelClick={handelClick} />
                </Content>

            </Container>
        </>
    )
}

const Container = styled.div`
  grid-area: main;
`;

const CommentCard = styled.div`
    text-align:center;
    overflow:hidden;
    margin-bottom:8px;
    background-color:#fff;
    border-radius:5px;
    position:relative;
    border:none;
`;

const ShareBox = styled(CommentCard)`
    display:flex;
    flex-direction:column;
    color:#958b7b;
    margin:0 0 8px;
    background:white;
    div{
        margin-top:15px;
        button{
            outline:none;
            cursor: pointer;
            color:rggba(0,0,0,0.6);
            font-size:14px;
            line-height:1.5;
            min-height:48px;
            background:transparent;
            border:none;
            display:flex;
            border:none;
            align-items:center;
            font-weight:600;
        }
        &:first-child{
            display:flex;
            align-items:center;
            padding:0 10px 0 16px;
            img{
                width:48px;
                border-radius:50%;
                margin-right:8px;
                cursor: pointer;
            }
            button{
                cursor: pointer;
                margin:4px 0;
                flex-grow:1;
                border-radius:35px;
                padding-left:16px;
                border:1px solid rgba(0,0,0,0.15);   
                background-color:white;
                text-align:left;
            }
        }
        &:nth-child(2){
            display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            padding-bottom:4px;
            button{
                cursor: pointer;
                img{
                    margin:0 4px 0 -2px;
                }
                span{
                    color:#70b5f9;
                }
            }
        }
    }
`;


const Artical = styled(CommentCard)`
    padding:0;
    margin:0 0 8px;
    overflow:visible;
`;

const SharedArtical = styled.div`
    padding-right:40px;
    flex-wrap:nowrap;
    padding:12px 16px 0px;
    margin-bottom:8px;
    align-items:center;
    display:flex;
    a{
        margin-right:12px;
        flex-grow:1;
        overflow:hidden;
        display:flex;
        text-decoration:none;
        img{
            width:48px;
            height:48px;
        }
        & > div{
            display:flex;
            flex-direction:column;
            flex-grow:1;
            flex-basis:0;
            margin-left:8px;
            overflow:none;
            span{
                text-align:left;
                &:first-child{
                    font-size:14px;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }
                &:nth-child(n+1){
                    font-size:15px;
                    color:rgba(0,0,0,0.6);
                }
            }
        }
    }
    button{
        position:absolute;
        right:12px;
        cursor: pointer;
        top:2px;
        background:transparent;
        border:none;
        outline:none;
    }

`;

const Description = styled.div`
    padding: 16px;
    overflow:hidden;
    color:rgba(0,0,0,0.9);
    font-size:18px;
    text-align:left;
`;

const SharedImage = styled.div`
    margin-top:8px;
    width:100%;
    display:block;
    position:relative;
    background-color:#f9fafb;
    img{
        object-fit:contain;
        width:100%;
    }
`;

const Social = styled.ul`
    line-height:1.3;
    display:flex;
    align-items:flex-start;
    overflow:auto;
    margin: 0 16px;
    padding:8px 0;
    border:1px solid #e9e5df;
    list-style:none;
    li{
        margin-right:5px;
        /* font-size:12px; */
        button{
            display:flex;
            align-items:center;
        }
    }
`;

const SocialAction = styled.div`
    align-items:center;
    display:flex;
    justify-content:flex-start;
    margin:0;
    min-height:40px;
    padding:4px 8px;
    button{
        display: inline-flex;
        align-items: center;
        padding: 16px;
        justify-content: space-around;
        cursor: pointer;
        color:black;
        background: transparent;
        border: none;
        margin-right:15px;
        outline: none;
        border-radius:5px;
        &:hover{
            background-color:#e8f3ff;
        }
        /* margin-right10p */
        @media(min-width:768px){
            span{
                margin-left:8px;
            }
        }
    }
`;

const Content = styled.div`
    text-align:center;
    & > img{
        width:30px;
        height:30px;
    }
`;


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        loading: state.articalState.loading,
        articals: state.articalState.articals
    };
}

const mapDispatchToProps = (dispatch) => ({
    getArticals: () => dispatch(getArticalApi())
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);;
