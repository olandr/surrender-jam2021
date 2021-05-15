import React from 'react';

export const GameLoop = (props) => {
    return (
        <>
        {
            props.rules?.map((e,i) => {

                return (
                <div key={i}>
                    {e.handle}
                </div>
                )
            })
        }
        </>
    );
}
