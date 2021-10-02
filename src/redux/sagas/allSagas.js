import {all} from 'redux-saga/effects'
import {
    changeCardNameWather,
    changeTicketNameWather,
    deleteCardWather, deteteTicketWather,
    downloadTicketWather, pinToTopwathcer, tagTicketWather,
    upDownloadCards,
    uploadTicketWather,
    watchDownloadCards,
    watchLogin
} from "./cardsSaga";

export function* allWatchers() {
    yield all([
        watchLogin(), watchDownloadCards(), upDownloadCards(),
        deleteCardWather(), downloadTicketWather(), uploadTicketWather(),
        changeTicketNameWather(), deteteTicketWather(), pinToTopwathcer(),
        tagTicketWather(), changeCardNameWather()
        ]

    )
}








