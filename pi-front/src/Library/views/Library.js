import React from 'react';
import ContenuLibrary from '../../components/NavbarModule';
import Topnav from '../../components/Topnav';

function Library() {
    return (
        <div id="root">
            <Topnav/>
        <div id="root" className='content-page'
           >
            <ContenuLibrary/>
          </div>
          </div>
    );
}

export default Library;