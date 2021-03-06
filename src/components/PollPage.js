import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleUpdateQuestion} from '../actions/questions'


class PollPage extends Component {

    state = {
        selected:''
    }
    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        }
        //,()=>console.log('pollpage state changed', this.state)
        )
        
    }
    
    handleState = () => {
        //console.log('pollpage props in handleState first', this.props)

        const {authedUser, id, dispatch} = this.props
        if (this.state.selected !== ''){
            dispatch(handleUpdateQuestion({
                authedUser,
                qid: id, 
                answer: this.state.selected
            }
            ))

        }
        //console.log('pollpage props in handleState second', this.props)

    }
    render(){
        console.log('pollpage props', this.props)
        const { 
            askedByName,
            askedByAvatar,
            optionOne,
            votedOptionOne,
            optionTwo,
            votedOptionTwo,
            authedAnswered } = this.props
       
        return(
<div>
            {this.props.invalid===true
            ?

<div>
temp solution!
</div>
            :

<div>
                {authedAnswered==='no'
                ?
                <h5>
                 <p>asked by {askedByName}</p>    
                 <img 
                  src={askedByAvatar} width="30"
                  alt={`Avatar of ${askedByName}`} />
                <p>would you rather</p>
                <div >
                    <input type="radio" value={"optionOne"} checked={this.state.selected==='optionOne'} 
                    onChange={this.handleChange} name='optionOne' /> <label htmlFor='optionOne'>{optionOne}</label>
                    <input type="radio" value={"optionTwo"} checked={this.state.selected==='optionTwo'} 
                    onChange={this.handleChange} name='optionTwo' /><label htmlFor='optionTwo'>{optionTwo}</label>
                    <button type="submit" onClick={this.handleState} >Submit</button>
                </div></h5>
                :
                 <h5>
                 <p>asked by {askedByName}</p>    
                 <img 
                  src={askedByAvatar} width="30"
                  alt={`Avatar of ${askedByName}`} />
                  <p>{authedAnswered[1]}</p>
                 <p><strong>Results</strong></p>
                 {authedAnswered[1]==='optionOne'
                 ? <p>{optionOne} [your choice!]</p>
                 : <p>{optionOne}</p>}
                 {parseInt(votedOptionOne)} out of {parseInt(votedOptionOne)+parseInt(votedOptionTwo)} votes
                 {authedAnswered[1]==='optionTwo'
                 ? <p>{optionTwo} [your choice!]</p>
                 : <p>{optionTwo}</p>}
                 {parseInt(votedOptionTwo)} out of {parseInt(votedOptionOne)+parseInt(votedOptionTwo)} votes</h5>
            }
                
               
            </div>

            }   
</div>



            
        )
    }
}

function mapStateToProps ({authedUser, users, questions},props){
    const id = props.match.params.id
    const thisQuestion = questions[id]
    if (!thisQuestion){
        return {
            invalid: true
        }
    } 
    const askedByUser = thisQuestion['author']
    const askedByName = users[askedByUser]['name']
    const askedByAvatar = users[askedByUser]['avatarURL']
    const optionOne = thisQuestion.optionOne.text
    let votedOptionOne = thisQuestion.optionOne.votes.length
    const optionTwo = thisQuestion.optionTwo.text
    let votedOptionTwo = thisQuestion.optionTwo.votes.length
    let authedAnswered = 'no'
    
    if (users[authedUser] && Object.keys(users[authedUser]['answers']).includes(id)){
        authedAnswered = ['yes', users[authedUser]['answers'][id]]
    }
    return{
        authedUser,
        users,
        questions,
        id,
        thisQuestion,
        askedByName,
        askedByAvatar,
        optionOne,
        votedOptionOne,
        optionTwo,
        votedOptionTwo,
        authedAnswered, 
    }
}


    export default connect(mapStateToProps)(PollPage)