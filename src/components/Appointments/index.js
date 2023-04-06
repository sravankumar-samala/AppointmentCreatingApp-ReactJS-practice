// Write your code here
// Appointments
import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    filterStarred: false,
  }

  addTitleValue = event => {
    this.setState({title: event.target.value})
  }

  addDateValue = event => {
    this.setState({date: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      title,
      date: formattedDate,
      id: uuidV4(),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))

    // console.log(this.state.appointmentsList)
  }

  onFindStarredAppointments = () => {
    this.setState(prevState => ({filterStarred: !prevState.filterStarred}))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getStarredAppointments = appointmentsList => {
    const filteredList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    return filteredList
  }

  render() {
    // const {title, date} = this.state
    const {title, date, appointmentsList, filterStarred} = this.state
    const starredAppointmentsList = this.getStarredAppointments(
      appointmentsList,
    )
    const renderAppointmentsList = filterStarred
      ? starredAppointmentsList
      : appointmentsList

    return (
      <div className="container">
        <div className="container-wrapper">
          <div className="content-container">
            <div className="form-container">
              <h1>Add Appointment</h1>
              <form className="form">
                {/* title input */}
                <label htmlFor="appointment-title">TITLE</label>
                <input
                  id="appointment-title"
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={this.addTitleValue}
                />
                {/* date input  */}
                <label htmlFor="appointment-date">DATE</label>
                <input
                  type="date"
                  id="appointment-date"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={this.addDateValue}
                />
                {/* add button  */}
                <button
                  type="submit"
                  className="add-btn"
                  onClick={this.onSubmit}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="appointment-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          {/* end of appointment form  */}
          <hr />
          {/* appointments container  */}
          <div className="appointments-container">
            <div className="appointments-title">
              <h2>Appointments</h2>
              <button
                type="button"
                className="btn-starred"
                onClick={this.onFindStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {renderAppointmentsList.map(eachAppnmt => (
                <AppointmentItem
                  key={eachAppnmt.id}
                  appointmentObj={eachAppnmt}
                  onClickStar={this.onClickStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
