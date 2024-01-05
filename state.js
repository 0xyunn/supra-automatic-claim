const state = {
    SIGN_IN: 'SIGN_IN',
    INPUT_CREDENTIALS: 'INPUT_CREDENTIALS',
    SUBMIT_CREDENTIALS: 'SUBMIT_CREDENTIALS',
    REPEAT_CLICKING: 'REPEAT_CLICKING',
    RECOVER:'RECOVER',
    LOG_OUT:'LOG_OUT',
    END:'END'
}

const step = {
    SIGN_IN : {start:0, end:0},
    INPUT_CREDENTIALS: {start:1, end:2},
    SUBMIT_CREDENTIALS: {start:3, end:3},
    REPEAT_CLICKING: {start:4, end:17},
    LOG_OUT:{start:18, end:19},
    REPEAT_CLICKING_MISSION_1: 4,
    REPEAT_CLICKING_MISSION_2: 7,
    REPEAT_CLICKING_MISSION_3: 10,
    REPEAT_CLICKING_MISSION_4: 15,
}

function nextState (currentState) {
    switch (currentState) {
        case currentState === state.SIGN_IN:
            return state.INPUT_CREDENTIALS
        case currentState === state.INPUT_CREDENTIALS:
            return state.SUBMIT_CREDENTIALS
        case currentState === state.SUBMIT_CREDENTIALS:
            return state.REPEAT_CLICKING
        case currentState === state.REPEAT_CLICKING:
            return state.LOG_OUT
        case currentState === state.LOG_OUT:
            return state.END
    }
}

function getRecoverStepForRepeatClicking(step) {
    switch (step) {
        case step >= step.REPEAT_CLICKING_MISSION_1 && step < step.REPEAT_CLICKING_MISSION_2:
            return step.REPEAT_CLICKING_MISSION_1
        case step >= step.REPEAT_CLICKING_MISSION_2 && step < step.REPEAT_CLICKING_MISSION_3:
            return step.REPEAT_CLICKING_MISSION_2
        case step >= step.REPEAT_CLICKING_MISSION_3 && step < step.REPEAT_CLICKING_MISSION_4:
            return step.REPEAT_CLICKING_MISSION_3
        case step >= step.REPEAT_CLICKING_MISSION_4 && step <= step.REPEAT_CLICKING.end:
            return step.REPEAT_CLICKING_MISSION_3
    }
}

module.exports = {
    state,
    step,
    nextState,
    getRecoverStepForRepeatClicking,
}