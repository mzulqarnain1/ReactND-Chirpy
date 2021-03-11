import React from 'react'
import {handleAddTweet} from "../actions/tweets";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'

class NewTweet extends React.Component {
    state = {
        text: '',
        toHome: false
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {dispatch, id} = this.props
        console.log(this.state.text)

        dispatch(handleAddTweet(this.state.text, id))
        this.setState({
            text: '',
            toHome: !id
        })
    }

    render() {

        const {text, toHome} = this.state
        const charsLeft = 280 - text.length

        if (toHome) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's on your mind?"
                        value={text}
                        maxLength='280'
                        className='textarea'
                        onChange={this.handleChange}
                    />
                    {charsLeft <= 100 && <div className='tweet-length'>{charsLeft}</div>}
                    <button
                        className='btn'
                        type='submit'
                        disabled={!text.length}
                    >Tweet
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet);