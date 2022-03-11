import React from 'react'

const DisplayQuizInstructions = ({quizEndedVerification}) => {
    return (
        <div>
            <h4 className='text-center text-color'>You will only have one try and 30 seconds to answer each question.</h4>
            <h4 className='text-center text-color'>Have fun !</h4>
            <div className='d-flex justify-content-center my-5'>
                <button
                    className='btn btn-primary'
                    onClick={e => { e.preventDefault(); quizEndedVerification() }}>
                    Start now !
                </button>
            </div>
        </div>
    )
}

export default DisplayQuizInstructions