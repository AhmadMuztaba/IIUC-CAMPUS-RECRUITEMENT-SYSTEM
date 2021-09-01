import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserCodeforceRating } from '../../../actions/company/index';

class WatchUserCodeforceRating extends Component {
    componentDidMount() {
        this.props.UserCodeforceRating(this.props.id);
    }
    render() {
        if (!this.props.codeforce) {
            return <div>No results found</div>
        }
        if (this.props.codeforce.result) {
            return (
                <>
                    {
                        this.props.codeforce.result.reverse().map((contest, index) => {
                            if (index < 1) {
                                return (
                                    <div className="codeforce">
                                        <div>
                                            <div className="codeforce-rating">{contest.newRating}</div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return null;
                            }

                        })
                    }
                </>
            )
        } else {
            return (<div>Loading</div>)
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({ codeforce: state.CompanyProfile.CodeForceRatings })
}
export default connect(mapStateToProps, {
    UserCodeforceRating
})(WatchUserCodeforceRating);