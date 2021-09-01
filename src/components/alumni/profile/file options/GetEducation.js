import React, { Component } from 'react';

class GetEducation extends Component {  
    render() {
        return (
            <>
            <h3>Education</h3>
            <div className="edu-info">
                <div className="edu-side-line">
                    <ul>
                        <li>
                            <h4>School</h4>
                        </li>
                        <li>
                            <h4>College</h4>
                        </li>
                        <li>
                            <h4>University</h4>
                        </li>
                           <h4><li>Bsc Passing Year</li></h4>
                           <h4> <li>Field Of Study</li></h4>
                            <h4><li>Description</li></h4>
                        
                    </ul>
                </div>
                <div>
     
                <ul>
                        <li>
                            <h4>{this.props.edu.map((ed)=>{
                                return ed.school;
                            })}</h4>
                        </li>
                        <li>
                            <h4>{this.props.edu.map((ed)=>{
                                return ed.college;
                            })}</h4>
                        </li>
                        <li>
                            <h4>{this.props.edu.map((ed)=>{
                                return ed.university;
                            })}</h4>
                        </li>
                        
                           <h4><li>{this.props.edu.map((ed)=>{
                                return ed.BscPassingYear;
                            })}</li></h4>
                        
                        
                           <h4><li>{this.props.edu.map((ed)=>{
                                return ed.fieldOfStudy;
                            })}</li></h4>
                        
                        
                          <h4><li>{this.props.edu.map((ed)=>{
                                return ed.description;
                            })}</li></h4>
                        
                    </ul>
                </div>
            </div>
            </>
        );
    }
}

export default GetEducation;
