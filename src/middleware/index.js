import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from './logger'
import {getFirebase} from 'react-redux-firebase'
import {getFirestore} from 'redux-firestore'


export default applyMiddleware(
    thunk.withExtraArgument({ getFirebase, getFirestore }),
    logger
)