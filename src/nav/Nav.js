import React from 'react'
import { Moon } from "phosphor-react";

function Nav(props) {

    return (
        <ul className={props.dark ? 'navbar darkBackground' : 'navbar'}>
            <li><h2 className='where-in-the-world'>Where in the world?</h2></li>
            <li className='dark-mode-switcher' onClick={props.switch}><Moon size={20} className='moon'/>Dark mode</li>
        </ul>
    )
}

export default Nav