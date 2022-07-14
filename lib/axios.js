'use strict';

import utils from './utils.js';
import bind from './helpers/bind.js';
import Axios from './core/Axios.js';
import mergeConfig from './core/mergeConfig.js';
import defaults from './defaults/index.js';
import formDataToJSON from './helpers/formDataToJSON.js';
import CanceledError from './cancel/CanceledError.js';
import CancelToken from'./cancel/CancelToken.js';
import isCancel from'./cancel/isCancel.js';
import {VERSION} from './env/data.js';
import toFormData from './helpers/toFormData.js';
import AxiosError from '../lib/core/AxiosError.js';
import spread from './helpers/spread.js';
import isAxiosError from './helpers/isAxiosError.js';

/**
 * Create an instance of Axios //创建一个Axios
 *
 * @param {Object} defaultConfig The default config for the instance //实例的默认配置 Object类型
 *
 * @returns {Axios} A new instance of Axios//返回一个新的Axios实例
 */
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig); //new一个Axios实例
  const instance = bind(Axios.prototype.request, context);//把Axios的请求this指向这个新实例

  // Copy axios.prototype to instance 复制Axios.prototype 到实例上
  utils.extend(instance, Axios.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

axios.formToJSON = thing => {
  return formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
};

export default axios;
