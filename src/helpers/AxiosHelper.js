import axios from 'axios';
import token from './auth-header';
import {history} from '../store';

/**
 * Axios helper to create promise based HTTP
 */
class Axios {
    constructor() {
        this._resolveCallbacks = [];
        this._rejectCallbacks = [
            (error) => {
                if (error.response.status === 401) {
                    history.push('/logout');
                }
            }
        ];
        this._method = 'get';

        this._url = null;
        this._params = {};
        this._data = {};
        this._isCallApi = true;
        this._headers = {
            'Authorization': `${token()}`,
        };
    }

    /**
     * Set the functions to be executed on success
     *
     * @param {function} callback
     * @returns {Object}
     */
    addResolveCallback(callback) {
        this._resolveCallbacks.push(callback);
        return this;
    }

    /**
     * Set the functions to be performed when an error
     *
     * @param {function} callback
     * @returns {Object}
     */
    addRejectCallback(callback) {
        this._rejectCallbacks.push(callback);
        return this;
    }

    /**
     * Set requst method
     *
     * @param {string} method
     * @returns {Object}
     */
    setMethod(method) {
        this._method = method;
        return this;
    }

    /**
     * Set requst url
     *
     * @param {string} url
     * @returns {Object}
     */
    setUrl(url) {
        this._url = url;
        return this;
    }

    /**
     * Add param to request
     *
     * @param {string} key
     * @param {string} val
     * @returns {Object}
     */
    addParam(key, val) {
        this._params[key] = val;
        return this;
    }

    /**
     * Add header to request
     *
     * @param {string} key
     * @param {string} val
     * @returns {Object}
     */
    addHeader(key, val) {
        this._headers[key] = val;
        return this;
    }

    /**
     * Set request headers
     *
     * @param {Object} headers
     * @returns {Object}
     */
    setHeaders(headers) {
        this._headers = headers;
        return this;
    }

    /**
     * Set request params
     *
     * @param {Object} params
     * @returns {Object}
     */
    setParams(params) {
        this._params = params;
        return this;
    }

    /**
     * Set data
     *
     * @param {Object} data
     * @returns {Object}
     */
    setData(data) {
        this._data = data;
        return this;
    }

    /**
     * Add data to request
     *
     * @param {string} key
     * @param {string} val
     * @returns {Object}
     */
    addData(key, val) {
        this._data[key] = val;
        return this;
    }

    setIsCallApi(value){
        this._isCallApi = value;
        return this;
    }

    /**
     * Create request
     *
     * @param {function} resolve
     * @param {function} reject
     * @returns {Promise}
     */
    request(resolve, reject) {
        let self = this;
        let url = this._isCallApi ? `${process.env.REACT_APP_API_HOST_URL}` + self._url: self._url;
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: self._method,
                headers: self._headers,
                params: self._params,
                data: self._data
            }).then((response) => {

                self._resolveCallbacks.forEach((c) => {
                    c(response);
                });
                resolve(response);
            }, (response) => {
                self._rejectCallbacks.forEach((c) => {
                    c(response);
                });
                reject(response);
            });
        });
    }
}

export default Axios;