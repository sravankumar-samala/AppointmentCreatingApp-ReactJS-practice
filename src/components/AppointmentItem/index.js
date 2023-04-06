/* eslint-disable react/button-has-type */
// Write your code here
import './index.css'

const starImagesList = [
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png',
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png',
]

const AppointmentItem = props => {
  const {appointmentObj, onClickStar} = props
  const {id, title, date, isStarred} = appointmentObj
  const starImageUrl = isStarred ? starImagesList[0] : starImagesList[1]

  const addStar = () => onClickStar(id)

  return (
    <li className="appointment-item">
      <div className="list-title-container">
        <p>{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-btn"
          onClick={addStar}
        >
          <img src={starImageUrl} alt="star" />
        </button>
      </div>
      <p>{date}</p>
    </li>
  )
}

export default AppointmentItem
