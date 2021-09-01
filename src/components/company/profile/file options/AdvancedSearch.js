import React, { Component } from 'react';
import {connect} from 'react-redux';
import {searchSpecificUser} from '../../../actions/company/index';
import {reduxForm,Field} from 'redux-form';
import '../CSS/AdvancedSearch.scss';
class AdvancedSearch extends Component {
    skills=[{
        name:'C/C++'
    },{
        name:'Java'
    },
    {
        name:'Python'
    },{
        name:'JavaScript'
    },
    {
        name:'PHP'
    },{
        name:'C#'
    },{
        name:'Ruby'
    },{
        name:'NodeJs'
    },
    {
        name:'ReactJs'
    },
    {
        name:'Angular'
    },
    {
        name:'Vue'
    },
    {
        name:'Laravel'
    },{
        name:'.NET'
    },{
        name:'Django'
    },{
        name:'Advanced CSS'
    },{
        name:'Cisco packet tracer'
    },{
        name:'Robotics'
    }
]
renderCheck=({ input, label,type})=>{
    return (
        <div >
            <div>
            <div className="utility__flex">
            <label htmlFor={label} className="createProfile__checkboxinput--label">{label}</label>
            </div>
           <input id={label} className="createProfile__checkboxinput" {...input} type={type} />
           <label htmlFor={label} className="createProfile__customisedInput">
           <div className="createProfile__customisedInput--checked"></div>
           </label>
           </div>
        </div>
    )
}
    handleSub=(formValues)=>{
        let newskills = [];
        if (formValues['C/C++']) {
            newskills.push("C/C++");
        }
        if (formValues.Java) {
            newskills.push("Java")
        }
        if (formValues.Python) {
            newskills.push("Python");
        }
        if (formValues.JavaScript) {
            newskills.push("JavaScript");
        }
        if (formValues.PHP) {
            newskills.push("PHP");
        }
        if (formValues.Ruby) {
            newskills.push("Ruby");
        }
        if (formValues.NodeJs) {
            newskills.push("NodeJs");
        }
        if (formValues.ReactJs) {
            newskills.push("ReactJs");
        }
        if (formValues.Angular) {
            newskills.push("Angular");
        }
        if (formValues.Vue) {
            newskills.push("Vue");
        }
        if (formValues.Laravel) {
            newskills.push("Laravel");
        }
        if (formValues['.NET']) {
            newskills.push(".NET");
        }
        if (formValues.Django) {
            newskills.push("Django");
        }
        if (formValues['Advanced CSS']) {
            newskills.push("Advanced CSS");
        }
        if(formValues['Cisco packet tracer']){
            newskills.push("Cisco packet tracer");
        }
        if (formValues.Robotics) {
            newskills.push("Robotics");
        }
        // let skills=newskills.toString();
        // const values = { ...formValues, skills };
      this.props.searchSpecificUser(newskills);
    }
    render() {
        return (
            <form className="utility__margin--right-big" onSubmit={this.props.handleSubmit(this.handleSub)}>
                <div className="createProfile__checkbox">
                            {
                               this.skills.map((skill)=>{
                                return(<Field key={skill.name} name={skill.name} type="checkbox" component={this.renderCheck} label={skill.name} value={skill.name} />)
                               })
                           }
                            </div>
            
            <div className="skill___search"><button className="skill___search--btn" type="submit">Search with skill</button></div>
            </form>
        );
    }
}


const form=reduxForm({
    form:'Advanced Search'
})(AdvancedSearch)
export default connect(null,{searchSpecificUser})(form);