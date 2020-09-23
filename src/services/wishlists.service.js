const axios = require('axios')

exports.getProductById = async (id) => {
  try {
    const url = `http://challenge-api.luizalabs.com/api/product/${id}/`
    const { data } = await axios.get(url)
  
    return {
      title: data.title,
      image: data.image,
      price: data.price,
      url,
    }
  } catch (err) {
    return null
  }
}