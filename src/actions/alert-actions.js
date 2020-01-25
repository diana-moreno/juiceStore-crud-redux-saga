import {
  SHOW_ALERT,
  HIDE_ALERT
} from '../types'
import store from '../store'

// Show alert
const createAlert = alert => ({
  type: SHOW_ALERT,
  payload: alert
})

export const showAlert = alert => store.dispatch(createAlert(alert))

// Hide alert
const hideAlert = () => ({
  type: HIDE_ALERT,
  payload: null
})

export const hideAlertAction = () => store.dispatch(hideAlert())
