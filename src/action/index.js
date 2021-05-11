import db,{auth,provider, storage} from '../firebase';
import { GET_ARTICALS, SET_LOADING_STATUS, SET_USER } from './action.type';

export const setLoading = (status) => ({
    type:SET_LOADING_STATUS,
    status
})

export const SignApi = ()=>{
    return (dispatch) => {
        auth.signInWithPopup(provider)
        .then((payload)=>{
            // console.log(payload);
            dispatch({type:SET_USER,user:payload})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}


export const getUserAuth = ()=>{
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch({type:SET_USER,user:user})
            }
        })
    }
}

export const signOutApi = ()=>{
    return (dispatch) => {
        auth.signOut()
        .then(()=>{
            dispatch({type:SET_USER,user:null})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}


export const postArtical = (payload) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        if(payload.image !== ""){
            console.log(payload);
            const upload = storage.ref(`images/${payload.image.name}`)
            .put(payload.image);
            upload.on('state_changed',
            (snapshot) => {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress);

                if(snapshot.state === "RUNNING"){
                    console.log(progress," jj");
                }

            },
                (error) => console.log(error),
                async () => {
                    const downloadURL = await upload.snapshot.ref.getDownloadURL();
                    db.collection("articals").add({
                        actor:{
                            dedcription:payload.user.email,
                            title:payload.user.displayName,
                            date:payload.timestamp,
                            image:payload.user.photoURL
                        },
                        video:payload.video,
                        sharedImage:downloadURL,
                        comments:0,
                        description:payload.description
                    })
                    dispatch(setLoading(false));
                }
            );
        }else if(payload.video){
            dispatch(setLoading(true));
            db.collection("articals").add({
                actor:{
                    dedcription:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL
                },
                video:payload.video,
                sharedImage:"",
                comments:0,
                description:payload.description
            })
            dispatch(setLoading(false));
        }else{
            dispatch(setLoading(true));
            db.collection("articals").add({
                actor:{
                    email:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL
                },
                video:"",
                sharedImage:"",
                comments:0,
                description:payload.description
            })
            dispatch(setLoading(false));
        }
    };
}


export const getArticalApi = ()=>{
    return (dispatch) => {
        let payload;
        db.collection("articals")
        .orderBy("actor.date","desc")
        .onSnapshot((snaphot) => {
            payload = snaphot.docs.map((doc) => doc.data());
            dispatch({type:GET_ARTICALS,payload})
        })
    }
}