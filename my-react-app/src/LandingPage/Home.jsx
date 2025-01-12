

import CustomNavbar from "./CustomNavbar";
import HeroSection from "./HeroSection";
import Section from "./Section";
import CardComponent from "./CardComponent";
import Contact from "./Contact";
import Footer from "./Footer";
function Home(){
    return(
        <>
      <CustomNavbar />
      <HeroSection/>
      <Section/>
      <CardComponent/> 
      <Contact/>
     <Footer/>
      </>
    )
}
export default Home;