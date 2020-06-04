import React from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
import { connect } from 'react-redux';


TopBarProgress.config({
  barColors: {
    "0": "#1b1bff",
    "0.5": "#1b1bcc",
    "1.0": "#1b1baa",
  },
    shadowBlur: 2.8,
    barThickness: 3
});


export class ProgressBar extends React.Component {

  render() {
		
    const { progressBarStatus } = this.props;
    console.log(progressBarStatus)
		
    if(progressBarStatus === 'OPEN') {
      return(<TopBarProgress />)
    } else {
      return('');
    }
  }
}

//redux container component
const mapStateToProps = ({ui}) => {
    console.log(ui)
    return{
    progressBarStatus: ui.progressBarStatus
  }
};

export default connect(mapStateToProps)(ProgressBar);
