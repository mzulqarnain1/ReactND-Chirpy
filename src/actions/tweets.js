import {saveLikeToggle, saveTweet} from "../utils/api";
import {showLoading, hideLoading} from "react-redux-loading";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

export function toggleTweet({id, authUser, hasLiked}) {
    return {
        type: TOGGLE_TWEET,
        id,
        authUser,
        hasLiked
    }
}

export function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
            .catch((e) => {
                console.log("Error in liking tweet...", e)
                dispatch(toggleTweet(info))
                alert("Error in liking tweet...Please try again.")
            })
    }
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {

        dispatch(showLoading())

        const {authUser} = getState()

        return saveTweet({
            text,
            author: authUser,
            replyingTo: replyingTo
        }).then(tweet => dispatch(addTweet(tweet))
        ).then(() => dispatch(hideLoading()))
    }
}

