import { ApodResponse } from "../domains/apod/models/ApodResponse";

export type apodActions =
    | {type: '[APOD] Load Request'}
    | {type: '[APOD] Load Success', payload: ApodResponse[]}
    | {type: '[APOD] Load Failure', error: string }
    | {type: '[APOD] Clear List'};