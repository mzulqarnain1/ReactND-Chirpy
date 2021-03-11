import React from 'react'
import {connect} from "react-redux";
import {formatTweet, formatDate} from "../utils/helpers";
import {handleToggleTweet} from "../actions/tweets";
import {TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Tweet extends React.Component {
    toParent = (e, id) => {
        e.preventDefault()

        this.props.history.push(`/tweet/${id}`)
    }
    handleLike = (e) => {
        e.preventDefault()

        const {dispatch, tweet, authUser} = this.props
        dispatch(handleToggleTweet({
            id: tweet.id,
            authUser: authUser,
            hasLiked: tweet.hasLiked
        }))
    }

    render() {
        const {tweet} = this.props

        if (tweet == null) {
            return <p>This Tweet Does Not Exist.</p>
        }

        const {name, avatar, id, hasLiked, timestamp, text, parent, likes, replies} = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={(e) => this.handleLike(e)}>
                            {hasLiked === true
                                ? <TiHeartFullOutline className='tweet-icon' color='red'/>
                                : <TiHeartOutline className='tweet-icon'/>
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({authUser, users, tweets}, {id}) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authUser, parentTweet)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet));