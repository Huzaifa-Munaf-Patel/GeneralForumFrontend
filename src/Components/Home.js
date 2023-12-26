import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <>
            <div class="home-section">
                <div class="content">
                    <h1>Engage with people Worldwide on General Forum.</h1>
                    <p>General Forum is a place where you will clear your doubts and give opinions in almost every topic.</p>
                    <div class="buttons">
                        <Link class="body-btn" to="/categories">Get Started</Link>
                        <a class="body-btn" href="#About2">Explore Forum</a>
                    </div>
                </div>
            </div>

            <div class="About2" id='About2'>
                <div class="about-header-div">
                    <div class="about-header-image">
                        <h1>1 Platform</h1>
                        <img src="world.png" alt="" />
                        <h1>Multiple Actions</h1>
                    </div>
                </div>

                <div id='About' class="About">
                    <div class="about-content">
                        <div class="about-content-item">
                            GeneralForums
                            <h2>Platform</h2>
                            <p>This Platform allows you to access any Forum and ask Questions. you can answer to the Questions in the Forum. you can share Opinions aswell.</p>
                            <ul class="about-menu-links">
                                <li>Ask Questions</li>
                                <li>Give Opinions</li>
                                <li>Answer to Questions</li>
                                <li>Create your Own Forum</li>
                            </ul>
                        </div>

                        <div class="about-content-item">
                            GeneralForums
                            <h2>Accessibility</h2>
                            <p>This Platform is Accessible to anyone. you can access the Forum, without creating account. However you need an account to post Questions and Answers.</p>
                            <ul class="about-menu-links">
                                <li>Access Forum Without an account</li>
                                <li>Create an account to make actions</li>
                                <li>Content from other social media platform can cause suspension</li>
                            </ul>
                        </div>

                        <div class="about-content-item">
                            GeneralForums
                            <h2>Benefits</h2>
                            <p>it is very important to stay up-to-date with the trend in almost every field. you can solve your problems and get to know about what people thinks</p>
                            <ul class="about-menu-links">
                                <li>Follow latest trends</li>
                                <li>solve problems</li>
                                <li>move Fast</li>
                                <li>Take Actions</li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Contact Section Starts here */}
                <div id='Contact' className="contact-box">
                    <div className="contact-box-heading">
                        <div className="contact-heading">
                            <h1>Contact info</h1>
                        </div>
                        <div className="contact-box-item2">
                            <div className="contact-box-item">

                                <div className="contact-box-item-info">
                                    <h3>Email Address</h3>
                                    <strong>Huzaifa1231234564567@gmail.com</strong>
                                </div>

                                <div className="contact-box-item-info info">
                                    <h3>Whatsapp Number</h3>
                                    <strong>0973 557 788</strong>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Home
