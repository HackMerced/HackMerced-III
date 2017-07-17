import React, { Component } from 'react'
import { Link } from 'react-router'
import { Header, PatternScaffold, LogoWithCopy, HackathonProjectIcon } from './partials'
import { onUnload } from '../util'
import phone from './assets/phone.png';
import computer from './assets/computer.png';


export class Home extends Component {
  componentDidMount(){
    onUnload().then(() => {
      window.sessionStorage.reduceRefresh = true;
    });

    setTimeout(() => {
      window.sessionStorage.reduceRefresh = true;
    }, 4000);
  }

  render() {
    const cullAnimation = (window.sessionStorage.reduceRefresh) ? ' home--cull-animation' : '';

    return (
      <div className={'home' + cullAnimation} style={{height: "100%"}}>
        <div className='home__sudo__start'>sudo service restart hackmerced</div>
        <div className='home__hider'></div>
        <div className='home__border'></div>
        <div className='home__panel'>
          <div className='home__action__container'>
            {/* <PatternScaffold className='pattern-scaffold--left'/> */}
            {/* <PatternScaffold className='pattern-scaffold--right'/> */}
            <div className='home-action w400 object--center text--center'>
              <LogoWithCopy/>
              <h1 className='home-action__event-description'>36 hours of a<br></br>hacking’ good time</h1>
              <Link className='disable-hover' href='/signup'><button className='button--gold'>Apply Now</button></Link>
              <div className='home__learn-more'>Scroll to learn more</div>
            </div>
          </div>
        </div>
        <div className='home__block quehackmerced'>
          <div className='home__content pagefit--center'>
            <div className='icon-cirle quehackmerced__icon-circle'>
              <div className='icon-circle__object' style={{ backgroundSize: '40px', backgroundImage: 'url(' + computer + ')'}}></div>
              <div className='icon-circle__object' style={{ backgroundSize: '25px', backgroundImage: 'url(' + phone + ')'}}></div>
            </div>
            <h1 className='text--center'>Hack like there’s no tomorrow.</h1>
            <p>
              HackMerced is a 36 hour long programming competition where <text className='text--bold'>you</text> and 349 other contestants will team up, learn, code, design and pitch cool and creative projects that you always wanted to try out.
            </p>
            <p>
              HackMerced is <text className='text--bold'>open to all indivudals</text> between the ages of 14 to 22 (plus graduate students!) and is an opportunity for beginners, pros, and those all in-between to have fun building what they desire for cool prizes!
            </p>
            <p>
              Last year we had 46 amazing teams create 46 amazing projects, check them out:
            </p>
            <div className='quehackmerced__projects'>
              <HackathonProjectIcon url='https://devpost.com/software/pukapuka' name='Puka Puka' image='pukapuka' backgroundColor='#E05954'/>
              <HackathonProjectIcon url='https://devpost.com/software/medfuse' name='MedFuse' image='medfuse' backgroundColor='#EC494C'/>
              <HackathonProjectIcon url='https://devpost.com/software/triggerbot' name='TriggerBot' image='triggerbot' backgroundSize='auto 52px' backgroundColor='#9F2CFF'/>
              <HackathonProjectIcon url='https://hackmerced2017.devpost.com/submissions' name='See More' image='devpost' backgroundColor='#fff'/>
            </div>
            <h1 className='text--center'>Sponsors</h1>
            <p>
              HackMerced is a bridge between you and the hacker community on the west coast. If you're interested in growing brand awareness, looking for new hires or just want to help build something awesome reach out at <a className='link--underlined' href='sponsorship@hackmerced.com'>sponsorship@hackmerced.com</a>
            </p>
            <h1 className='text--center'>Frequently Asked Questions</h1>
            <div className='home__faq'>
              <article>
                <h3>What is a Hackathon?</h3>
                <p>
                  A hackathon is best described as an “invention marathon”. Anyone who has an interest in technology attends a hackathon to learn, build & share their creations over the course of a weekend in a relaxed and welcoming atmosphere. You don’t have to be a programmer and you certainly don’t have to be majoring in Computer Science.
                </p>
              </article>
              <article>
                <h3>What if I don’t know how to code?</h3>
                <p>
                  Don't worry, many of our previous years attendees are new or beginning to code! It’s entirely irrelevant what your experience is going into a hackathon, it’s more about your interest in technology. Our event has many workshops and mentors to help you get started on creating an app!
                </p>
              </article>
              <article>
                <h3>What if I don't have an idea?</h3>
                <p>
                  That’s normal. Most people don’t have an idea before they get to the event. But once you start talking to other people, you might come up with something. You can also work with somebody else on their idea if you like it. And there will be prizes at the event which might help give you some ideas. Don’t worry about it, you’ll find something to work on.
                </p>
              </article>
              <article>
                <h3>Where can I sleep/shower?</h3>
                <p>
                  We've set up a few spaces around campus for you to bring sleeping bags, comforters and other things to prep you for this event. If the floor doesn't suit your favor, HackMerced works with Airbnb to get you a discount on local housing. As for showering we have a few designated areas where you can clean yourself up at.
                </p>
              </article>
              <article>
                <h3>Is there food?</h3>
                <p>
                  Yes, we will have you covered on eating for these 3 days, including breakfast lunch dinner and plenty of snacks!
                </p>
              </article>
              <article>
                <h3>Is there a prize?</h3>
                <p>
                  Yes, winning HackMerced will get you a sweet (unannouced) prize!
                </p>
              </article>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
