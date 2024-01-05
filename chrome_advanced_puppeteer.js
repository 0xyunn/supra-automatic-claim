const { state, step,nextState, getRecoverStepForRepeatClicking} = require('./state')
const {updatePageStatus} = require("./monitor");

async function performClickActions(page, actions, pageIndex) {
    let currentState = state.SIGN_IN
    updatePageStatus(pageIndex, currentState)
    let handleResult;
    let exceptionMsg;
    while (currentState !== state.END) {
        switch (currentState) {
            case state.SIGN_IN:
                if (await handleAction(page, actions.slice(step.SIGN_IN.start, step.SIGN_IN.end))) {
                    currentState = nextState(currentState)
                    updatePageStatus(pageIndex, currentState)
                }
                break;
            case state.INPUT_CREDENTIALS:
                handleResult = await handleAction(page, actions.slice(step.INPUT_CREDENTIALS.start, step.INPUT_CREDENTIALS.end))
                if (handleResult.success) {
                    currentState = nextState(currentState)
                } else {
                    currentState = state.RECOVER
                    exceptionMsg = {state:state.INPUT_CREDENTIALS, step:step.INPUT_CREDENTIALS.start + handleResult.failedStep}
                }
                updatePageStatus(pageIndex, currentState)
                break;
            case state.SUBMIT_CREDENTIALS:
                handleResult = await handleAction(page, actions.slice(step.SUBMIT_CREDENTIALS.start, step.SUBMIT_CREDENTIALS.end))
                if (handleResult.success) {
                    currentState = nextState(currentState)
                } else {
                    currentState = state.RECOVER
                    exceptionMsg = {state:state.SUBMIT_CREDENTIALS, step:step.SUBMIT_CREDENTIALS.start + handleResult.failedStep}
                }
                updatePageStatus(pageIndex, currentState)
                break;
            case state.REPEAT_CLICKING:
                handleResult = await handleAction(page, actions.slice(step.REPEAT_CLICKING.start, step.REPEAT_CLICKING.end))
                if (handleResult.success) {
                    currentState = nextState(currentState)
                } else {
                    currentState = state.RECOVER
                    exceptionMsg = {state:state.REPEAT_CLICKING, step:step.REPEAT_CLICKING.start + handleResult.failedStep}
                }
                updatePageStatus(pageIndex, currentState)
                break;
            case state.LOG_OUT:
                handleResult = await handleAction(page, actions.slice(step.LOG_OUT.start, step.LOG_OUT.end))
                if (handleResult.success) {
                    currentState = nextState(currentState)
                } else {
                    currentState = state.RECOVER
                    exceptionMsg = {state:state.LOG_OUT, step:step.LOG_OUT.start + handleResult.failedStep}
                }
                updatePageStatus(pageIndex, currentState)
                break;
            case state.RECOVER:
                switch (exceptionMsg.state) {
                    // input credentials occurred exception:
                    // 1. refresh the page
                    // 2. reLogin account(SIGN_IN.start), rePerform step 0 to step 2(INPUT_CREDENTIALS.end)
                    case state.INPUT_CREDENTIALS:
                        page.reload()
                        handleResult = await handleAction(page, actions.slice(step.SIGN_IN.start, step.INPUT_CREDENTIALS.end))
                        if (handleResult.success) {
                            currentState = nextState(exceptionMsg.state)
                            updatePageStatus(pageIndex, currentState)
                        }
                        break;
                    // submit credentials occurred exception:
                    // 1. refresh the page
                    // 2. reLogin account(SIGN_IN.start), rePerform step 0 to step 3(SUBMIT_CREDENTIALS.end)
                    case state.SUBMIT_CREDENTIALS:
                        page.reload()
                        handleResult = await handleAction(page, actions.slice(step.SIGN_IN.start, step.SUBMIT_CREDENTIALS.end))
                        if (handleResult.success) {
                            currentState = nextState(exceptionMsg.state)
                            updatePageStatus(pageIndex, currentState)
                        }
                        break;
                    // repeat clicking occurred exception:
                    // 1. refresh the page
                    // 2. logout account(step 19(LOG_OUT.start)-step 20(LOG_OUT.end))
                    // 3. reLogin account(step 0(SIGN_IN.start)-step 3(SUBMIT_CREDENTIALS.end))
                    // 4. reClick(step failedStep-step 17(REPEAT_CLICKING.end))
                    case state.REPEAT_CLICKING:
                        page.reload()
                        // logout
                        handleResult = await handleAction(page, actions.slice(step.LOG_OUT.start, step.LOG_OUT.end))
                        let recoverStep;
                        if (handleResult.success) {
                            //reLogin
                            handleResult = false
                            while (!handleResult.success) {
                                handleResult = await handleAction(page, actions.slice(step.SIGN_IN.start, step.SUBMIT_CREDENTIALS.end))
                            }
                            //reClick
                            recoverStep = getRecoverStepForRepeatClicking(exceptionMsg.step)
                            handleResult = await handleAction(page, actions.slice(recoverStep, step.REPEAT_CLICKING.end))
                            if (handleResult.success) {
                                currentState = nextState(exceptionMsg.state)
                                updatePageStatus(pageIndex, currentState)
                            }
                        }
                        break;
                    // log out occurred exception:
                    // 1. refresh the page
                    // 2. reLogout,rePerform step 18(LOG_OUT.start) to step 19(LOG_OUT.end)
                    case state.LOG_OUT:
                        page.reload()
                        handleResult = await handleAction(page, actions.slice(step.LOG_OUT.start, step.LOG_OUT.end))
                        if (handleResult.success) {
                            currentState = nextState(exceptionMsg.state)
                            updatePageStatus(pageIndex, currentState)
                        }
                        break;
                }
        }
    }
}

async function handleAction(page, actions) {
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i]
        let retries = action.retries || 0;
        while (retries >= 0) {
            try {
                const element = await page.waitForXPath(action.path, {visible: true, timeout:5000})
                if (action.input) {
                    await element.type(action.input)
                } else {
                    await Promise.all([
                        element.click(),
                        page.waitForNavigation({waitUntil: 'networkidle2'})
                    ])
                }
                //console.log(`Performed action: ${action.path}`);
                break;
            } catch (error) {
                retries--
                //console.warn(`Retry (${retries} left) for action: ${action.path}`)
                if (retries === 0) {
                    return { success: false, failedStep: i+1}
                }
            }
        }
    }
    return { success: false, failedStep: -1};
}

module.exports = {
    performClickActions
}

