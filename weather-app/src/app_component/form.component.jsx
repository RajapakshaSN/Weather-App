import React from 'react';
import "./form.style.css";
const Form = (props) => {
    return (
        <div className="container">
          <form onSubmit={props.loadWeather}>
          <div>{props.error ? error() : ""}</div>
            <div>
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  name="country"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-2 mt-md-0 mt-2 text-md-left" >
                <button className="btn btn-warning" style={{marginTop:10}}>Get Weather</button>
              </div>
            </div>
          </form>
      </div>
    )
}
const error = props => {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        
        Please Enter City and Country...!
      </div>
    );
  };
export default Form;
