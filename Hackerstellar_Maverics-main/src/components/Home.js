import { color } from '@mui/system'

import React from 'react'
export const Home = (props) => {

    return (


        <div className='landing'>
            <div style={{
                marginLeft: 637,
                color: 'olive',
                top: 60,
                paddingTop: 60,
                


            }}>
                <h1>Army Veteran</h1>
                <i style={{ marginLeft: -68 }}>Uniting warriors past and present for a brighter future</i>
            </div>
            <div className='text' >

                <img src="/img/first.png" alt="" style={{
                    height: 174,
                    left: 150,
                    marginLeft: 90
                }} />
                <h3>Know your Pension</h3>
                <p>Pension schemes for armed forces provide financial security to military personnel after their retirement from active service.


                </p>
            </div>
            <div className='text text1' style={{ left: 626 }}>
                <img src="/img/second.png" alt="" style={{
                    height: 243,
                    left: 150,
                    top: 20,
                    marginLeft: 13,
                    marginBottom: -75,
                }} />
                <h3>Share your experience</h3>
                <p>Army veteran experience can vary widely depending on the individual's background, branch of service, and deployment history.
                </p>
            </div>
            <div className='text text2' style={{ left: 1104 }}>
                <img src="/img/third.png" alt="" style={{
                    height: 243,
                    left: 150,
                    top: 20,
                    marginLeft: 13,
                    marginBottom: -63,
                }} />
                <h3>Donate to others</h3>
                <p>Donating to organizations that support the families of deceased armed forces personnel is a way to honor the sacrifices made by these service members and their loved ones.
                </p>
            </div>
        </div>

    )
}