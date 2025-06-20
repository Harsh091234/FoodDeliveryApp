import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

const Home = () => {
    return (
        <div>
            <div className='min-h-screen flex flex-col  bg-green-900'>
                <Navbar />
                <div className='page-content flex-col flex-grow '>
                    <Carousal />
                    <div className='flex'>
                        <Card />
                         <Card />
                          <Card />
                        </div>
                    
                </div>
                <div className='' ><Footer /></div>
            </div>
        </div>
    )
}

export default Home