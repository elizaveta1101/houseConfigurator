export const addPerson = (data: any) => {
  return {
    type: 'ADD_PERSON',
    data,
  }
}

// export const onSearch = (value) => {
//   return {
//     type: 'SEARCH',
//     value,
//   }
// }

// export function showForm() {
//   return (dispatch) => {
//     dispatch({ type: 'SHOW_FORM' })
//   }
// }

// export function showDetail(record) {
//   return (dispatch) => {
//     dispatch({ type: 'SHOW_DETAIL', record })
//   }
// }

// export function showLoader() {
//   return {
//     type: 'SHOW_LOADER',
//   }
// }

// export function hideLoader() {
//   return {
//     type: 'HIDE_LOADER',
//   }
// }

// export function showAlert(text) {
//   return (dispatch) => {
//     dispatch({ type: 'SHOW_ALERT', text })

//     setTimeout(() => {
//       dispatch(hideAlert())
//     }, 3000)
//   }
// }

// export function hideAlert() {
//   return {
//     type: 'HIDE_ALERT',
//   }
// }

// export function fetchData(url, type) {
//   return async (dispatch) => {
//     try {
//       dispatch(showLoader())
//       const response = await fetch(url)
//       const data = await response.json()
//       dispatch({ type, data })
//       dispatch(hideLoader())
//     } catch (e) {
//       dispatch(showAlert('Сервак не дает :('))
//     }
//   }
// }
