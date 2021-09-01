import React, { Component } from 'react';
import { } from 'react-redux';
import { } from '../../../actions/user/index';
import { } from '../../../actions/Type';
class GetExperience extends Component {
    render() {
        return (
            <>
                <h3>Experiences</h3>
                {
                    this.props.exp.map((exp,index) => {
                        let from = new Date(exp.from);
                        from =from.getDate() + '/' + from.getMonth() + '/' + from.getFullYear();
                        let to = new Date(exp.to);
                        to =to.getDate() + '/' + to.getMonth() + '/' + to.getFullYear();
                        return (
                            <div key={index} className="edu-info">
                                <div className="edu-side-line">
                                    <ul>
                                        <li>
                                            <h4>Title</h4>
                                        </li>
                                        <li>
                                            <h4>Company</h4>
                                        </li>
                                        <li>
                                            <h4>From</h4>
                                        </li>

                                        <h4><li>To</li></h4>


                                        <h4> <li>Description</li></h4>


                                        <h4><li></li></h4>

                                    </ul>
                                </div>
                                <div>

                                    <ul>
                                        <li>
                                            <h4>
                                                {exp.title}
                                            </h4>
                                        </li>
                                        <li>
                                            <h4>{exp.company}</h4>
                                        </li>
                                        <li>
                                            <h4>{from}</h4>
                                        </li>

                                        <h4>{to}<li>
                                        </li></h4>
                                        <h4><li>{exp.description}</li></h4>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default GetExperience;