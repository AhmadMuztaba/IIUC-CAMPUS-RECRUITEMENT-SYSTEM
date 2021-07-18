import React from 'react';
import {connect} from 'react-redux';
import {addExperience} from '../../../actions/user/index';
import {} from '../../../actions/Type';
import {Field,reduxForm} from 'redux-form';
import '../../../Error/css/Error.css';
class PostExperience extends React.Component{
  state={button:true}
  renderError=({error,touched})=>{
    if(error&&touched){
      return <div className="Normal-Error">{error}</div>;
    }
  }
  renderInput=({label,input,meta,type})=>{
  return(<div>
    <label>{label}</label>
    <input type={type} {...input} />
    {this.renderError(meta)}
  </div>)
  }
  onHandleSubmit=(formValues)=>{
    this.setState({button:false})
    this.props.addExperience(formValues);
    this.props.reset();
    setTimeout(()=>{
      this.setState({button:true})
    },2500)
  }
    render(){
      return(<div>
        <form onSubmit={
          this.props.handleSubmit(this.onHandleSubmit)}>
        <Field  type="text" name="title" component={this.renderInput} label="title"/>
        <Field  type="text" name="company" component={this.renderInput} label="company"/>
        <Field type="text" name="location" component={this.renderInput} label="location"/>
        <Field type="date" name="from"component={this.renderInput} label="from"/>
        <Field type="date" name="to"component={this.renderInput} label="to"/>
        <Field type="text" name="description"component={this.renderInput} label="description"/>
        {
         this.state.button?<button type="submit" onClick={()=>{
          
         }}>Add</button>:<button disabled >Submitting</button>
         }
        </form>
        </div>)
    }
}
const validate=(formValues)=>{
  const error={};
  if(!formValues.title){
    error.title="Must be required";
  }
  if(!formValues.company){
    error.company="Must be required";
  }
  return error;
}


const mapStateToProps = (state) => {
  return ({ profile: state.UserProfile })
}

const form=reduxForm({
  form:'PostExperience',
  validate
})(PostExperience)
;
export default connect(mapStateToProps,{
  addExperience
})(form);