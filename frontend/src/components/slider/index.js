import React from 'react';
import '../../App.css';
import '../../styles/sudul/slider.css';


function slider() {
  const prev = document.querySelector(".prev");
  const slides = document.querySelector(".slider").children;
  const next = document.querySelector(".next");
  const indicator = document.querySelector(".indicator");
  let index = 0;


  prev.addEventListener("click", function () {
    prevSlide();
    //updateCircleIndicator(); 
    resetTimer();
  })

  next.addEventListener("click", function () {
    nextSlide();
    //  updateCircleIndicator();
    resetTimer();

  })

  // create indicators
  //  function circleIndicator(){
  //      for(let i=0; i< slides.length; i++){
  //        const div=document.createElement("div");
  //              div.innerHTML=i+1;
  //             //  div.setAttribute("onclick",indicateSlide(this))
  //              div.id=i;
  //              if(i==0){
  //                div.className="active";
  //              }
  //             // indicator.appendChild(div);
  //      }
  //  }
  //  circleIndicator();

  //  function indicateSlide(element){
  //   index=element.id;
  //   changeSlide();
  //   updateCircleIndicator();
  //   resetTimer();

  //  }

  //  function updateCircleIndicator(){
  //    for(let i=0; i<indicator.children.length; i++){
  //      indicator.children[i].classList.remove("active");
  //    }
  //    indicator.children[index].classList.add("active");
  //  }

  function prevSlide() {
    if (index == 0) {
      index = slides.length - 1;
    }
    else {
      index--;
    }
    changeSlide();
  }

  function nextSlide() {
    if (index == slides.length - 1) {
      index = 0;
    }
    else {
      index++;
    }
    changeSlide();
  }

  function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoPlay, 4000);
  }


  function autoPlay() {
    nextSlide();
    //  updateCircleIndicator();
  }

  let timer = setInterval(autoPlay, 4000);
}
function AppSlider() {
  setTimeout(slider, 1)
  return (

    <>
      <div className='container'><div className='home-container'><h1 className='home_c'><center>Home</center></h1>
        <section className="slide-show">
          <div className="slider">
            <div className="slide active" >
              <div className="container" id='img1'>
                <div className="caption">
                  <h1>Teas</h1>
                  <p>Refresh Your Day</p>
                  <a href="" >More...</a>
                </div>
              </div>
            </div>
            <div className="slide" >
              <div className="container" id='img2'>
                <div className="caption">
                  <h1>Oil</h1>
                  <p>For a healthy and Long Hair</p>
                  <a href="" >More...</a>
                </div>
              </div>
            </div>
            <div className="slide" >
              <div className="container" id='img3'>
                <div className="caption">
                  <h1>Soap</h1>
                  <p>Healthy Skin. Happy Life</p>
                  <a href="" >More...</a>
                </div>
              </div>
            </div>
            <div className="slide" >
              <div className="container" id='img4'>
                <div className="caption">
                  <h1>Face Wash</h1>
                  <p>Control Your Pimples</p>
                  <a href="" >More...</a>
                </div>
              </div>
            </div>
            <div className="slide" >
              <div className="container" id='img5'>
                <div className="caption">
                  <h1>Body Lotions</h1>
                  <p>Moisturize Your Skin</p>
                  <a href="" >More...</a>
                </div>
              </div>
            </div>
          </div>
          <div className="controls">
            <div className="prev">&#10094;</div>
            <div className="next">&#10095;</div>
          </div>

        </section>
        <br /></div>
      </div>
    </>

  );

}

export default AppSlider;
