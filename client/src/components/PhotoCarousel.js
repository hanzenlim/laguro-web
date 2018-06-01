// import React, { Component } from 'react';
//
// class Profile extends Component {
//     render() {
//         return (<OfficeCarousel
//             renderCenterLeftControls={({ previousSlide }) => (
//                 <CarouselButtonLeft icon="carouselButtonLeft" width="45px" className="carousel-control" onClick={previousSlide}/>
//             )}
//             renderCenterRightControls={({ nextSlide }) => (
//                 <CarouselButtonRight icon="carouselButtonRight" width="45px" className="carousel-control" onClick={nextSlide} />
//             )}
//             renderBottomLeftControls={({ action }) => (
//                 <ViewPhotosButtonContainer>
//                     <MuiThemeProvider theme={theme2}>
//                         <ViewPhotosButton style={{ marginLeft: "85%", marginBottom: "8%", textTransform: "none", fontSize: "16px"}} variant="raised" color="primary" className="carousel-control" onClick={action}>
//                             View Photos
//                         </ViewPhotosButton>
//                     </MuiThemeProvider>
//                 </ViewPhotosButtonContainer>
//             )}
//             slidesToShow={window.innerWidth >= 600 ? 3 : 1}
//             slideWidth={window.innerWidth >= 600 ? 1.88 : 1}
//             cellSpacing={8}
//             cellAlign="center"
//             slideIndex={1}>
//
//             {this.renderImages(office)}
//
//         </OfficeCarousel>
//
//         );
//     }
//
// }
