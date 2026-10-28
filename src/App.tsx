import './App.css'
import { Button } from './components/Button';
import { ThemedText } from './components/ThemedText'
import { Colors } from './contsants/Colors';
import { Menu, X, ChevronDown, ChevronRight, Mail, Phone } from "lucide-react"
import MyLogo from "./assets/MyLogo.svg?react";
import IconUIDesign from "./assets/iconUIDesign.svg?react";
import IconLaunch from "./assets/iconLaunch.svg?react";
import IconPhone from "./assets/iconPhone.svg?react";
import IconWebsite from "./assets/iconWebsite.svg?react";
import IconReact from "./assets/react.svg?react";
import IconFigma from "./assets/figma.svg?react";
import IconPython from "./assets/python.svg?react";
import IconTypescript from "./assets/typescript.svg?react";
import IconFirebase from "./assets/firebase.svg?react";
import IconJava from "./assets/java.svg?react";
import IconKotlin from "./assets/kotlin.svg?react";
import IconFranceFlag from "./assets/franceFlag.svg?react";
import IconUSAFlag from "./assets/usaFlag.svg?react";
import { useState } from 'react';
import myPicture from "./assets/myPicture.png";
import IconName from "./assets/NathanFrume.svg?react";
import Triangle from "./assets/triangle.svg?react";
import { WaveBackground } from './components/WaveBackground';
import partnersImage from "./assets/Partners.png";
import colorMixImage from "./assets/ColorMix.png";
import uqacImage from "./assets/uqac.png";
import infineonImage from "./assets/infineon.png";
import cpeImage from "./assets/cpe.png";
import lesChartreuxImage from "./assets/lesChartreux.png";

import { allTexts } from './contsants/AllTexts';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

type Language = "french" | "english";

function App() {


  Object.entries(Colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--Color-${key}`, value);
  });


  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("french");

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (id === "welcome") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* <ThemedText text="Hello, World!" color={Colors.Background} type="big_title" />
      <ThemedText text="Hello, World!" color={Colors.Background} type="title" />
      <ThemedText text="Hello, World!" color={Colors.Background} type="sub_title" />

      <ThemedText text="Hello, World!" color={Colors.Background} type="body" />

      <Button text="Me contacter" backgroundColor={Colors.Primary} style={{ margin: "10px" }} onClick={() => { }} />
     <FaGithub size={30} />
      <FaLinkedin size={30} /> 
      <Mail size={30} color={Colors.Background} />
      <MyLogo width={100} height={100} fill={Colors.Primary} /> */}
      <header className="AppHeader">
        <div className="LogoAndNameDiv" onClick={() => scrollToSection("welcome")}>
          <MyLogo width={50} height={50} fill={Colors.Primary} />
          <ThemedText text="Nathan Frume" color={Colors.Foreground} type="title" />

        </div>

        <nav className={menuOpen ? "open" : ""}>
          <ThemedText
            text={allTexts[language].navbar.mywork}
            color={Colors.Foreground}
            type="sub_title"
            className="NavText"
            onClick={() => scrollToSection("work")}
          />
          <ThemedText
            text={allTexts[language].navbar.journey}
            color={Colors.Foreground}
            type="sub_title"
            className="NavText"
            onClick={() => scrollToSection("journey")}
          />
          <Button
            text={allTexts[language].navbar.contact}
            backgroundColor={Colors.Primary}
            style={{ margin: "10px" }}
            onClick={() => scrollToSection("contact")}
          />
          <div
            className="ChangeLanguageDiv"
            onClick={() => setLanguage((prev) => (prev === "french" ? "english" : "french"))}
            title={language === "french" ? "Switch to English" : "Passer en Français"}
          >
            {language === "french" ? (
              <IconUSAFlag width={30} height={30} />
            ) : (
              <IconFranceFlag width={30} height={30} />
            )}
          </div>
        </nav>

        <button
          className="BurgerButton"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <X size={30} color={Colors.Foreground} />
          ) : (
            <Menu size={30} color={Colors.Foreground} />
          )}
        </button>

      </header>
      <section className="WelcomeSection" id="welcome">
        <WaveBackground variant="dark" hasIntro={true} direction='left' />
        <div className="TrianglesDiv WelcomeTrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle " />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="WelcomeLeftDiv">
          <div />

          <div className="WelcomeTextDiv">
            <div>
              <ThemedText
                text={allTexts[language].welcome.title1}
                className="WelcomeText "
                color={Colors.Foreground}
                type="big_title"
              />

              <ThemedText
                text={allTexts[language].welcome.title2}
                className="WelcomeText"
                color={Colors.Foreground}
                type="big_title"
              />
            </div>

            <ThemedText
              text={allTexts[language].welcome.description}
              className="WelcomeText"
              color={Colors.Foreground}
              type="sub_title"
            />
          </div>

          <div className="WelcomeButtonsDiv">
            <Button
              text={allTexts[language].welcome.buttonContact}
              backgroundColor={Colors.Primary}
              style={{ margin: "10px" }}
              onClick={() => scrollToSection("contact")}
            />

            <Button
              text={allTexts[language].welcome.buttonWork}
              backgroundColor={Colors.Foreground}
              style={{ margin: "10px" }}
              onClick={() => scrollToSection("work")}
            />
          </div>
        </div>

        <div className="WelcomeRightDiv">
          <img
            src={myPicture}
            alt="My picture"
            className="WelcomePicture"
          />
        </div>

        <ChevronDown
          height={50}
          width={50}
          className="DownArrow"
          color={Colors.Primary}
          onClick={() => scrollToSection("about")}
        />
      </section>
      <section className="AboutMeSection" id="about">
        <WaveBackground variant="light" hasIntro={true} direction='right' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <ThemedText text={allTexts[language].about.title} className="BigTitleForMobile" color={Colors.Background} type="big_title" />
        <div className="AboutMeTextDiv">
          <ThemedText text={allTexts[language].about.text1} color={Colors.Background} type="body" />
          <ThemedText text={allTexts[language].about.text2} color={Colors.Background} type="body" />
          <ThemedText text={allTexts[language].about.text3} color={Colors.Background} type="body" />
          <ThemedText text={allTexts[language].about.text4} color={Colors.Background} type="body" />
        </div>
        <p className="AboutMeName">Nathan</p>
        <div className="TrianglesDiv TrianglesBottomLeft">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
      </section>
      <section className="WhatIDoSection" id="whatido">
        <WaveBackground variant="dark" hasIntro={true} direction='top' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <ThemedText text={allTexts[language].whatido.title} className="BigTitleForMobile" color={Colors.Foreground} type="big_title" />
        <div className="WhatIDoContainerDiv">
          <div className="WhatIDoCardDiv">
            <ThemedText text={allTexts[language].whatido.subtitle1} color={Colors.Background} type="title" />
            <ThemedText text={allTexts[language].whatido.description1} color={Colors.Background} type="body" />
            <div className="WhatIDoSkillsDiv">
              <ThemedText text="Figma" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
            </div>
            <div className="WhatIDoIconDiv">
              <IconUIDesign width={"50%"} height={"50%"} stroke={Colors.Foreground} />
            </div>
          </div>
          <div className="WhatIDoCardDiv">
            <ThemedText text={allTexts[language].whatido.subtitle2} color={Colors.Background} type="title" />
            <ThemedText text={allTexts[language].whatido.description2} color={Colors.Background} type="body" />
            <div className="WhatIDoSkillsDiv">
              <ThemedText text="React" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
              <ThemedText text="TypeScript" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
            </div>
            <div className="WhatIDoIconDiv">
              <IconLaunch width={"50%"} height={"50%"} stroke={Colors.Foreground} />
            </div>

          </div>
          <div className="WhatIDoCardDiv">
            <ThemedText text={allTexts[language].whatido.subtitle3} color={Colors.Background} type="title" />
            <ThemedText text={allTexts[language].whatido.description3} color={Colors.Background} type="body" />
            <div className="WhatIDoSkillsDiv">
              <ThemedText text="React Native" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
              <ThemedText text="TypeScript" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
            </div>
            <div className="WhatIDoIconDiv">
              <IconWebsite width={"50%"} height={"50%"} stroke={Colors.Foreground} />
            </div>
          </div>
          <div className="WhatIDoCardDiv">
            <ThemedText text={allTexts[language].whatido.subtitle4} color={Colors.Background} type="title" />
            <ThemedText text={allTexts[language].whatido.description4} color={Colors.Background} type="body" />
            <div className="WhatIDoSkillsDiv">
              <ThemedText text="Firebase" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
              <ThemedText text="OVH" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />
            </div>
            <div className="WhatIDoIconDiv">
              <IconPhone width={"50%"} height={"50%"} stroke={Colors.Foreground} />
            </div>
          </div>
        </div>
      </section>
      <section className="MyWorkSection" id="work">
        <WaveBackground variant="light" hasIntro={true} direction='right' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <ThemedText text={allTexts[language].work.title} className="BigTitleForMobile" color={Colors.Background} type="big_title" />
        <div className="MyWorkContainerDiv">

          <div className="MyWorkCardDiv" onClick={() => {
            // Open the link if iOS or mac ;
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Macintosh/i)) {
              window.open("https://apps.apple.com/ca/app/partners-trouve-ton-job/id6754823110", "_blank");
            } else {
              window.open("https://play.google.com/store/apps/details?id=com.nafru.Partners", "_blank");
            }
          }}>
            <div className="MyWorkCardImageDiv" style={{ background: "radial-gradient(circle, #307BBE, #074C8A " }}>
              <img src={partnersImage} alt="Partners" width="50%" />
            </div>
            <div className="MyWorkCardInfoDiv">
              <div>
                <ThemedText text="Partners" color={Colors.Background} type="title" />
                <ChevronRight height={25} width={25} color={Colors.Background} />
              </div>
              <ThemedText text={allTexts[language].work.description1} color={Colors.Background} type="body" />
              <div>

                <ThemedText text="React Native" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />

                <ThemedText text={allTexts[language].work.subdescription1} color={Colors.Background} type="caption" />
              </div>

            </div>
          </div>

          <div className="MyWorkCardDiv" onClick={() => {

            window.open("https://play.google.com/store/apps/details?id=com.nafrugame.choosecolor", "_blank");

          }}>
            <div className="MyWorkCardImageDiv" style={{ background: "radial-gradient(circle, #EE6F50, #C22D08 " }}>
              <img src={colorMixImage} alt="ColorMix" width="50%" />
            </div>
            <div className="MyWorkCardInfoDiv">
              <div>
                <ThemedText text="ColorMix" color={Colors.Background} type="title" />
                <ChevronRight height={25} width={25} color={Colors.Background} />
              </div>
              <ThemedText text={allTexts[language].work.description2} color={Colors.Background} type="body" />
              <div>
                <ThemedText text="Java" color={Colors.Foreground} style={{ backgroundColor: Colors.Background, borderRadius: "500px", padding: "4px 10px" }} type="caption" />

                <ThemedText text={allTexts[language].work.subdescription2} color={Colors.Background} type="caption" />
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="MySkillsSection" id="skills">
        <WaveBackground variant="dark" hasIntro={true} direction='bottom' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <ThemedText text={allTexts[language].skills.title} className="BigTitleForMobile" color={Colors.Foreground} type="big_title" />
        <div className="MySkillsContainerDiv">
          <div className="OneSkillDiv">
            <div>
              <IconReact height={70} width={70} />
            </div>
            <ThemedText text="React" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconFigma height={70} width={70} />
            </div>
            <ThemedText text="Figma" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconPython height={70} width={70} />
            </div>
            <ThemedText text="Python" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconKotlin height={70} width={70} />
            </div>
            <ThemedText text="Kotlin" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconTypescript height={70} width={70} />
            </div>
            <ThemedText text="TypeScript" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconJava height={70} width={70} />
            </div>
            <ThemedText text="Java" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconReact height={70} width={70} />
            </div>
            <ThemedText text="React Native" color={Colors.Foreground} type="sub_title" />
          </div>
          <div className="OneSkillDiv">
            <div>
              <IconFirebase height={70} width={70} />
            </div>
            <ThemedText text="Firebase" color={Colors.Foreground} type="sub_title" />
          </div>
        </div>
      </section>
      <section className="MyJourneySection" id="journey">
        <WaveBackground variant="light" hasIntro={true} direction='left' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <ThemedText text={allTexts[language].journey.title} className="BigTitleForMobile" color={Colors.Background} type="big_title" />
        <div className="MyJourneyContainerDiv">
          <div className="MyJourneyLineDiv">
            <div className="MyJourneyLine" >
              <div className="MyJourneyLineTop" style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px', }} />
              <div className="MyJourneyLineCircle" />
              <div className="MyJourneyLineBottom" />

            </div>
            <img src={uqacImage} alt="Université du Québec à Chicoutimi" />
            <div>
              <ThemedText text={allTexts[language].journey.subtitle1} color={Colors.Foreground} type="sub_title" />
              <ThemedText text={allTexts[language].journey.description1} color={Colors.Foreground} type="body" />
            </div>
            <ThemedText text="2026 - 2027" color={Colors.Background} type="title" />
          </div>
          <div className="MyJourneyLineDiv">
            <div className="MyJourneyLine" >
              <div className="MyJourneyLineTop" />
              <div className="MyJourneyLineCircle" />
              <div className="MyJourneyLineBottom" />

            </div>
            <img src={infineonImage} alt="Infineon" />
            <div>
              <ThemedText text={allTexts[language].journey.subtitle2} color={Colors.Foreground} type="sub_title" />
              <ThemedText text={allTexts[language].journey.description2} color={Colors.Foreground} type="body" />
            </div>
            <ThemedText text="2025 - 2026" color={Colors.Background} type="title" />
          </div>
          <div className="MyJourneyLineDiv">
            <div className="MyJourneyLine" >
              <div className="MyJourneyLineTop" />
              <div className="MyJourneyLineCircle" />
              <div className="MyJourneyLineBottom" />

            </div>
            <img src={cpeImage} alt="CPE Lyon" />
            <div>
              <ThemedText text={allTexts[language].journey.subtitle3} color={Colors.Foreground} type="sub_title" />
              <ThemedText text={allTexts[language].journey.description3} color={Colors.Foreground} type="body" />
            </div>
            <ThemedText text="2023 - 2025" color={Colors.Background} type="title" />
          </div>
          <div className="MyJourneyLineDiv">
            <div className="MyJourneyLine" >
              <div className="MyJourneyLineTop" />
              <div className="MyJourneyLineCircle" />
              <div className="MyJourneyLineBottom" style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', }} />

            </div>
            <img src={lesChartreuxImage} alt="Les Chartreux" />
            <div>
              <ThemedText text={allTexts[language].journey.subtitle4} color={Colors.Foreground} type="sub_title" />
              <ThemedText text={allTexts[language].journey.description4} color={Colors.Foreground} type="body" />
            </div>
            <ThemedText text="2021 - 2023" color={Colors.Background} type="title" />
          </div>


        </div>
      </section>

      <section className="ContactMeSection" id="contact">
        <WaveBackground variant="dark" hasIntro={true} direction='top' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <ThemedText text={allTexts[language].contact.title} className="BigTitleForMobile" color={Colors.Foreground} type="big_title" />
        <div className="ContactMeContainerDiv">
          <div className="ContactMeTextDiv">
            <ThemedText text={allTexts[language].contact.description1} color={Colors.Foreground} type="body" />
            <ThemedText text={allTexts[language].contact.description2} color={Colors.Foreground} type="body" />
            <Button text={allTexts[language].contact.button} backgroundColor={Colors.Primary} onClick={() => { window.location.href = `mailto:Nafru.development@gmail.com`; }} /> {/* Add a mailto link to the button */}
          </div>
          <div className="ContactMeInfoDiv">
            <div onClick={() => { window.location.href = `mailto:Nafru.development@gmail.com`; }}>
              <Mail width={30} height={30} color={Colors.Foreground} />
              <ThemedText text="Nafru.development@gmail.com" color={Colors.Foreground} type="body" />
            </div>
            <div onClick={() => { window.location.href = `tel:+33(0) 7 69 05 84 92`; }}>
              <Phone width={30} height={30} color={Colors.Foreground} />
              <ThemedText text="+33(0) 7 69 05 84 92" color={Colors.Foreground} type="body" />
            </div>
            <div onClick={() => { window.open("https://www.linkedin.com/in/nathan-frume/"); }}>
              <FaLinkedin size={30} color={Colors.Foreground} />
              <ThemedText text="Nathan Frume" color={Colors.Foreground} type="body" />
            </div>
          </div>
        </div>
      </section>
      <footer className="AppFooter">
        <WaveBackground variant="light" hasIntro={true} direction='right' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="FooterTopDiv">
          <div className="FooterLeftDiv">
            <ThemedText text={allTexts[language].footer.subtitle1} color={Colors.Background} type="sub_title" />
            <ThemedText className="FooterNavLink" text={allTexts[language].about.title} color={Colors.Background} type="body" onClick={() => scrollToSection("about")} />
            <ThemedText className="FooterNavLink" text={allTexts[language].whatido.title} color={Colors.Background} type="body" onClick={() => scrollToSection("whatido")} />
            <ThemedText className="FooterNavLink" text={allTexts[language].work.title} color={Colors.Background} type="body" onClick={() => scrollToSection("work")} />
            <ThemedText className="FooterNavLink" text={allTexts[language].skills.title} color={Colors.Background} type="body" onClick={() => scrollToSection("skills")} />
            <ThemedText className="FooterNavLink" text={allTexts[language].journey.title} color={Colors.Background} type="body" onClick={() => scrollToSection("journey")} />
            <ThemedText className="FooterNavLink" text={allTexts[language].contact.title} color={Colors.Background} type="body" onClick={() => scrollToSection("contact")} />
          </div>
          <div className="FooterMiddleDiv">
            <ThemedText text={allTexts[language].footer.subtitle2} color={Colors.Background} type="sub_title" />
            <div onClick={() => { window.location.href = `mailto:Nafru.development@gmail.com`; }}>
              <Mail width={30} height={30} color={Colors.Background} />
              <ThemedText text="Nafru.development@gmail.com" color={Colors.Background} type="body" />
            </div>
            <div onClick={() => { window.location.href = `tel:+33(0) 7 69 05 84 92`; }}>
              <Phone width={30} height={30} color={Colors.Background} />
              <ThemedText text="+33(0) 7 69 05 84 92" color={Colors.Background} type="body" />
            </div>
          </div>

          <div className="FooterRightDiv">
            <div>
              <FaGithub size={30} color={Colors.Background} onClick={() => { window.open("https://github.com/Nafru3"); }} />
              <FaLinkedin size={30} color={Colors.Background} onClick={() => { window.open("https://www.linkedin.com/in/nathan-frume/"); }} />
            </div>
            <ThemedText text="© 2026 Nathan Frume" color={Colors.Background} type="caption" />
          </div>
        </div>
        <IconName className="FooterBigText" />
      </footer>

    </>
  )
}

export default App
