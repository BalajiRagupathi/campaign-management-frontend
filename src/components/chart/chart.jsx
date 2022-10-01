import React, { Component } from 'react'
import './chart.scss';
import Bars from './graph/bar';
import Lines from './graph/line';
import Pies from './graph/pie';



class Chart extends Component {

  state = {
    count: 0
  }

  checkDataPresent = (data) => {

    let check = false;
    for (let key in data) {
      if (data[key] !== 0) {
        check = true
      }
    }
    return check;
  }

  render() {
    return (
      <div >

        <div className=" d-flex flex-wrap justify-content-around align-items-center">

          <div className="content text-center  d-flex align-items-center px-4">
            <div className="  d-flex align-items-center flex-column px-2" >
              <h2 className="met-h2"> <i className='bx bx-mail-send'></i> Mail processed</h2>
              <p className="met-p">{this.props.selectedDate['processed'] || "0"}</p>
            </div>
          </div>
          <div className=" content text-center px-5">
            <div className="  d-flex align-items-center flex-column" >
              <h2 className="met-h2"> <i className='bx bx-message-rounded-check'></i>  Opened Mail</h2>
              <p className="met-p">{this.props.selectedDate['opens'] || "0"}</p>
            </div>
          </div>
          <div className="content  text-center px-5">
            <div className="  d-flex align-items-center flex-column px-1">
              <h2 className="met-h2"> <i className='bx bx-message-rounded-error'></i> Mail Clicks </h2>
              <p className="met-p">{this.props.selectedDate['clicks'] || "0"}</p>
            </div>
          </div>

        </div>


        <div className="bars row my-5  ">
          <div className=" col-lg-6 d-flex flex-column justify-content-center mr-3 bar-1 mb-3">
            {
              this.checkDataPresent(this.props.selectedDate) ?
                <div>
                  <h3 className="mb-5 text-center">Selected Date Analysis</h3>
                  <Bars selectedDate={this.props.selectedDate} />
                </div>
                :
                <div>
                  <div className="text-center">
                     <h3 className="graph-text">No Mail send !!</h3>
                     <img src="/assets/images/undraw_empty_xct9.svg" className="img-fluid"  alt="Empty..."/>
                  </div>
                </div>
            }
          </div>
          <div className="col-lg-5  bar-2 mb-3">
            <Lines />
            <Pies />
          </div>
        </div>


      </div>
    )
  }
}

export default Chart
