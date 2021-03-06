import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



class Polls extends Component {


    render(){
        console.log('Polls: ',this.props)
        const {askedByName, askedByAvatar, optionOne, id} = this.props
        console.log('Polls id',id)
        let modifiedOptionOne = optionOne.split(' ').slice(0,2).join(' ') + '...'
        return(
            <div>
                <hr />
                <h5>{askedByName} asks:</h5>
                <img 
                  src={askedByAvatar} width="30"
                  alt={`Avatar of ${askedByName}`} />
                <p><strong>Would you rather</strong></p><br />
                {modifiedOptionOne}
                <Link
                to ={`polls/${this.props.id}`}>vew poll</Link>
                
                <hr />
               
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions},{id}){
    const thisQuestion = questions[id]
    const askedByUser = users[thisQuestion.author]
    const askedByName = askedByUser['name']
    const askedByAvatar = askedByUser['avatarURL']
    const optionOne = thisQuestion.optionOne.text
    let votedOptionOne = thisQuestion.optionOne.votes.length
    const optionTwo = thisQuestion.optionTwo.text
    let votedOptionTwo = thisQuestion.optionTwo.votes.length
    let authedAnswered = 'no'
    if (users[authedUser] && Object.keys(users[authedUser]['answers']).includes(id)){
        authedAnswered = ['yes', users[authedUser]['answers'][id]]
    }
    return{
        askedByName,
        askedByAvatar,
        optionOne,
        votedOptionOne,
        optionTwo,
        votedOptionTwo,
        authedAnswered,
    }
}

export default connect(mapStateToProps)(Polls)