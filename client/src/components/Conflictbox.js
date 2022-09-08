import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../Context'


const Conflictbox = () => {
    const { isConflictboxOpen, toggleConflictbox } = useGlobalContext()

    return (
        <div className={`${isConflictboxOpen.state ? 'conflictbox show-conflictbox': 'conflictbox'}`}>
            <button className='close-conflictbox-btn' onClick={toggleConflictbox}><FaTimes /></button>

            <p>Oh no, we don't seem to have enough inventory to sell you the <span>{isConflictboxOpen.item}</span> :( </p>
            <p>We currently have <span>{isConflictboxOpen.amountLeft}</span> left...</p>
        </div>      
    )
}

export default Conflictbox