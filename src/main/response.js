
const response = Object.freeze({
  success: (data, message = "") => {

    let res = {
      success: true,
      data
    }

    if(message) {
      res.message = message
      console.info(`API: ${message}`)
    }

    return res

  },
  error: (error) => {

    const errorMsg = error | 'Error desconocido.'

    console.error(`API ERROR: ${error}`)

    return {
      success: false,
      error: error
    }

  }
})

export default response;