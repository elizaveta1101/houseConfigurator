import React from 'react';
import Slider from 'react-slick'
import Img1 from '../../assets/img/HouseImgSlider.png'
import Img2 from '../../assets/img/HouseImgSlider.png'
import Img3 from '../../assets/img/HouseImgSlider.png'
import Img4 from '../../assets/img/HouseImgSlider.png'
import Img5 from '../../assets/img/HouseImgSlider.png'


import './HousePageSlider.css';


export default class HousePageSlider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        const settings = {
            arrows: true,
            dots: false,
            adaptiveHeight: true,
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: true,
            pauseOnFocus: true,
            pauseOnDotsHover: true,
            pauseOnHover: true,
            waitForAnimate: true,
            variableWidth: true,
            prevArrow: false,
            focusOnSelect: true,
        }
        const settings_2 = {
            arrows: false,
            slidesToShow: 1,
            fade: true,
        }
        return (
            <div className="house-page-slider-wrapper">
                <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} {...settings_2} className="sliderbig">
                    <div className="sliderbig-item">
                        <img src={Img1} alt="Img"/>
                    </div>
                    <div className="sliderbig-item">
                        <img src={Img2} alt="Img"/>
                    </div>
                    <div className="sliderbig-item">
                        <img src={Img3} alt="Img"/>
                    </div>
                    <div className="sliderbig-item">
                        <img src={Img4} alt="Img"/>
                    </div>
                    <div className="sliderbig-item">
                        <img src={Img5} alt="Img"/>
                    </div>
                </Slider>

                <Slider asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)}  {...settings} className="slider">
                    <div className="slider-item">
                        <img src={Img1} alt="Img"/>
                    </div>
                    <div className="slider-item">
                        <img src={Img2} alt="Img"/>
                    </div>
                    <div className="slider-item">
                        <img src={Img3} alt="Img"/>
                    </div>
                    <div className="slider-item">
                        <img src={Img4} alt="Img"/>
                    </div>
                    <div className="slider-item">
                        <img src={Img5} alt="Img"/>
                    </div>
                </Slider>
            </div>
        );
    }
}
