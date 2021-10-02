import {call, put, takeEvery} from "redux-saga/effects";
import {
    CHANGE_CARD_NAME, CHANGE_TICKETNAME, DELETE_CARD, DETETE_TICKET, DOWNLOAD_CARDS, DOWNLOAD_TICKET, LOGIN,
    PIN_TO_TOP, UPLOAD_CARD, UPLOAD_NEW_TICKET, TAG_TICKET,
    removeCard, removeTicket, setaNewCardName, setCard, setCards, setLogin, setNewTicket, setPinToTop, setTagTicket,
    setTicket, setTicketName, sortByPinToTop,
} from "../cards_Reducer";
import {
    changeCardNameApi, changeTicketNameApi,
    deleteCardApi, deleteTicektApi,
    DownloadCardsApi,
    downloadTicketApi,
    loginApi, pinToTopApi, tagTicketApi,
    uploadCardsApi, uploadNewTicketApi
} from "../../api/api";

export function* watchLogin() {
    yield takeEvery(LOGIN, loginWorker);
}

function* loginWorker({payload}) {
    const response = yield call(loginApi, payload)
    if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token)
        yield put(setLogin(response.data.token))
        window.location.reload()

    } else {
            localStorage.setItem('authToken', '')
    }
}

export function* watchDownloadCards() {
    yield takeEvery(DOWNLOAD_CARDS, DownloadCardsWorker);
}

function* DownloadCardsWorker({payload}) {
    if (!!(localStorage.getItem('authToken'))) {
        const response = yield call(DownloadCardsApi, payload)
        if (response.status === 200) {
            yield put(setCards(response.data.content))
        }
    }
}


export function* upDownloadCards() {
    yield takeEvery(UPLOAD_CARD, upCardsWorker);
}

function* upCardsWorker({payload}) {
    const response = yield call(uploadCardsApi, payload)
    if (response.status === 200) {
        yield put(setCard(response.data))
    }
}


export function* deleteCardWather() {
    yield takeEvery(DELETE_CARD, deleteCardWorker);
}

function* deleteCardWorker({payload}) {
    const response = yield call(deleteCardApi, payload)
    if (response.status === 200) {
        yield put(removeCard(payload))
    }
}


export function* downloadTicketWather() {
    yield takeEvery(DOWNLOAD_TICKET, downloadTicketWorker);
}

function* downloadTicketWorker({payload}) {
    const response = yield call(downloadTicketApi, payload)
    if (response.status === 200) {
        yield put(setTicket(response.data))
    }
}


export function* changeCardNameWather() {
    yield takeEvery(CHANGE_CARD_NAME, changeCardNameeWorker);
}

function* changeCardNameeWorker({payload}) {
    const response = yield call(changeCardNameApi, payload)
    if (response.status === 200) {
        yield put(setaNewCardName(response.data))
    }
}


export function* changeTicketNameWather() {
    yield takeEvery(CHANGE_TICKETNAME, changeTicketNameWorker);
}

function* changeTicketNameWorker({payload}) {
    const response = yield call(changeTicketNameApi, payload)
    if (response.status === 200) {
        yield put(setTicketName({newTicket: response.data, idCard: payload.todoId}))
    }
}


export function* tagTicketWather() {
    yield takeEvery(TAG_TICKET, tagTicketWorker);
}

function* tagTicketWorker({payload}) {
    const response = yield call(tagTicketApi, payload)
    if (response.status === 200) {
        yield put(setTagTicket({newTicket: response.data, idCard: payload.id}))
    }
}


export function* deteteTicketWather() {

    yield takeEvery(DETETE_TICKET, deteteTicketWorker);
}

function* deteteTicketWorker({payload}) {
    const response = yield call(deleteTicektApi, payload)
    if (response.status === 200) {
        yield put(removeTicket(payload))
    }
}


export function* uploadTicketWather() {
    yield takeEvery(UPLOAD_NEW_TICKET, uploadTicketWorker);
}

function* uploadTicketWorker({payload}) {
    const response = yield call(uploadNewTicketApi, payload)
    if (response.status === 200) {
        yield put(setNewTicket({newTicket: response.data, idCard: payload.id}))
    }
}


export function* pinToTopwathcer() {
    yield takeEvery(PIN_TO_TOP, pinToTopWorker);
}

function* pinToTopWorker({payload}) {
    const response = yield call(pinToTopApi, payload)
    if (response.status === 200) {
        yield put(setPinToTop(response.data))
        yield put(sortByPinToTop())
    }
}

