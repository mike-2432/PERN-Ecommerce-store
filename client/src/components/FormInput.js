import React, { useState } from 'react'

const FormInput = (props) => {
    const [clickedOn, setClickedOn] = useState('false');
    const { label, errorMsg, handleChange, id, ...inputValues } = props;

    return (
        <div className="form-input">
            <label>{label}</label><br/>
            <input {...inputValues} 
                onChange={handleChange} 

                isclickedon={clickedOn}
                onBlur={() => setClickedOn('true')}                
            />
            <p className='form-err-msg'>{errorMsg}</p>
        </div>
    )
}

export default FormInput