import {
    fetch,
    put,
    del,
    get
} from './axios'
import { create } from 'domain';

export default {
    getEqts() {
        return get('/eqt')
    },
    createEqt(params) {
        return fetch('/eqt',params)
    },
    createLog(params) {
        return fetch('/log',params)
    },
    getLog() {
        return get('/log')
    },
    getLogByName(name) {
        return get('/log/' + name)
    },
    createStock(params) {
        return fetch('/stock',params)
    },
    getStock() {
        return get('/stock')
    },
    getStockByName(name) {
        return get('/stock/' + name)
    }
}