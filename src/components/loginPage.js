import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAuthedUser } from '../actions/authedUser'

class loginPage extends Component {
    componentDidMount(){
        this.props.dispatch(updateAuthedUser())
      }

    render(){
        console.log('loginPage', this.props)
        return(
            <div>
                loginPage
                
            </div>
        )
    }
}

function mapStateToProps ({authedUser}){
    
    return{
        authedUser
    }
}

export default connect(mapStateToProps)(loginPage)