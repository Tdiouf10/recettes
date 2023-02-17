import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const MenuRecette = (): JSX.Element => {



    return (
        <header>
            <div>
                header Menu
            </div>
            <Outlet/>
        </header>

        
    )
}

export default MenuRecette