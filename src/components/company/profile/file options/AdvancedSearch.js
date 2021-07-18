import React, { Component } from 'react';
import {connect} from 'react-redux';
import {searchSpecificUser} from '../../../actions/company/index'
class AdvancedSearch extends Component {
    state={
        web:false,
        app:false,
        nodeJs:false,
    };
    handleSub=async(e)=>{
        let search=[];
        e.preventDefault();
        if(this.state.web){
            search.push('Web-Development')
        }
        if(this.state.app){
           search.push('app');
        }
         if(this.state.nodeJs){
             search.push('nodeJs');
         }
      this.props.searchSpecificUser(search);
    }
    render() {
        return (
            <div>
               <form>
                   <label for="web">Web</label>
                   <input type="checkbox" onChange={(e)=>{
                      this.setState({
                       web:e.target.checked
                      })
                   }}name="web"/>
                   <label for="app">App</label>
                   <input type="checkbox"onChange={(e)=>{
                      this.setState({
                       app:e.target.checked
                      })
                   }}name="app"/>
                   <label for="nodeJs">NodeJs</label>
                   <input type="checkbox"onChange={(e)=>{
                      this.setState({
                       nodeJs:e.target.checked
                      })
                   }} name="nodeJs"/>
                   <button onClick={(e)=>{
                       this.handleSub(e);
                   }}type="submit">Search</button>
                </form> 
            </div>
        );
    }
}

export default connect(null,{searchSpecificUser})(AdvancedSearch);