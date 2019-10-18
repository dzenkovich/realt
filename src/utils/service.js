import request from 'superagent'

class Service {
  /**
   * Running request
   *
   * @param method {String} - post, get, put, etc
   * @param url {String} - url name from 'config.src'
   * @param data {Object} - query (get) or body (post) request params
   * @returns {*}
   */
  request(method, url, data) {
    let call = request(method, url)
      .withCredentials()
      .set('Accept', 'application/json')

    return call[method === 'get' ? 'query' : 'send'](data).then(
      response => {
        let body = response.body || response.text
        if (response.status !== 200) {
          throw body
        }
        return body
      },
      error => {
        // make sure we throw passed json error object and fallback to default message
        throw error.response || error.toString()
      },
    )
  }

  get(url, queryParams, getData) {
    return this.request('get', ...arguments)
  }

  post(url, postData) {
    return this.request('post', ...arguments)
  }

  put(url, queryParams, putData) {
    return this.request('put', ...arguments)
  }

  delete(url, queryParams, deleteData) {
    return this.request('delete', ...arguments)
  }

  upload(url, data) {
    let formData = new FormData()
    for (let name in data) {
      if (data.hasOwnProperty(name)) {
        formData.append(name, data[name])
      }
    }

    return this.request('post', url, formData)
  }
}

export default new Service()
