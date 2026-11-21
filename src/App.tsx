import './App.css'
import { Button } from './components/Button';
import { ThemedText } from './components/ThemedText'
import { Reveal } from './components/Reveal';
import { Colors } from './contsants/Colors';
import { Menu, X, ChevronDown, ChevronRight, ChevronUp, Mail, Phone } from "lucide-react"
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
import Triangle from "./assets/triangle.svg?react";
import { WaveBackground } from './components/WaveBackground';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import myPicture from "./assets/myPicture.png";
import IconName from "./assets/NathanFrume.svg?react";
import partnersImage from "./assets/Partners.png";
import colorMixImage from "./assets/ColorMix.png";
import uqacImage from "./assets/uqac.png";
import infineonImage from "./assets/infineon.png";
import cpeImage from "./assets/cpe.png";
import lesChartreuxImage from "./assets/lesChartreux.png";

import { allTexts } from './contsants/AllTexts';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

Object.entries(Colors).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--Color-${key}`, value);
});

type Language = "french" | "english";
type SectionId = "welcome" | "about" | "whatido" | "work" | "skills" | "journey" | "contact";

const SECTION_IDS: SectionId[] = ["welcome", "about", "whatido", "work", "skills", "journey", "contact"];

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("welcome");
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "english" ? "english" : "french";
    } catch {
      return "french";
    }
  });

  const t = allTexts[language];

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // localStorage indisponible : on ignore silencieusement
    }
    document.documentElement.lang = language === "french" ? "fr" : "en";
  }, [language]);

  // Scrollspy : met en évidence la section active dans la navigation
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

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

  const navItems: { id: SectionId; label: string }[] = [
    { id: "work", label: t.navbar.mywork },
    { id: "journey", label: t.navbar.journey },
  ];

  const services = [
    {
      title: t.whatido.subtitle1,
      description: t.whatido.description1,
      pills: ["Figma"],
      icon: <IconUIDesign stroke={Colors.Foreground} width={"44%"} height={"44%"} />,
    },
    {
      title: t.whatido.subtitle2,
      description: t.whatido.description2,
      pills: ["React", "TypeScript"],
      icon: <IconLaunch stroke={Colors.Foreground} width={"44%"} height={"44%"} />,
    },
    {
      title: t.whatido.subtitle3,
      description: t.whatido.description3,
      pills: ["React Native", "TypeScript"],
      icon: <IconWebsite stroke={Colors.Foreground} width={"44%"} height={"44%"} />,
    },
    {
      title: t.whatido.subtitle4,
      description: t.whatido.description4,
      pills: ["Firebase", "OVH"],
      icon: <IconPhone stroke={Colors.Foreground} width={"44%"} height={"44%"} />,
    },
  ];

  const projects = [
    {
      key: "partners",
      title: "Partners",
      description: t.work.description1,
      pills: ["React Native"],
      availability: t.work.subdescription1,
      image: partnersImage,
      alt: "Application Partners",
      gradient: "radial-gradient(circle, #307BBE, #074C8A)",
      onClick: () => {
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Macintosh/i)) {
          window.open("https://apps.apple.com/ca/app/partners-trouve-ton-job/id6754823110", "_blank");
        } else {
          window.open("https://play.google.com/store/apps/details?id=com.nafru.Partners", "_blank");
        }
      },
    },
    {
      key: "colormix",
      title: "ColorMix",
      description: t.work.description2,
      pills: ["Java"],
      availability: t.work.subdescription2,
      image: colorMixImage,
      alt: "Application ColorMix",
      gradient: "radial-gradient(circle, #EE6F50, #C22D08)",
      onClick: () => {
        window.open("https://play.google.com/store/apps/details?id=com.nafrugame.choosecolor", "_blank");
      },
    },
  ];

  const skills: { name: string; icon: ReactNode }[] = [
    { name: "React", icon: <IconReact width={62} height={62} /> },
    { name: "Figma", icon: <IconFigma width={62} height={62} /> },
    { name: "Python", icon: <IconPython width={62} height={62} /> },
    { name: "Kotlin", icon: <IconKotlin width={62} height={62} /> },
    { name: "TypeScript", icon: <IconTypescript width={62} height={62} /> },
    { name: "Java", icon: <IconJava width={62} height={62} /> },
    { name: "React Native", icon: <IconReact width={62} height={62} /> },
    { name: "Firebase", icon: <IconFirebase width={62} height={62} /> },
  ];

  const journeyItems = [
    {
      key: "uqac",
      image: uqacImage,
      alt: "Université du Québec à Chicoutimi",
      subtitle: t.journey.subtitle1,
      description: t.journey.description1,
      period: "2026 - 2027",
      darkLogo: false,
    },
    {
      key: "infineon",
      image: infineonImage,
      alt: "Infineon Technologies",
      subtitle: t.journey.subtitle2,
      description: t.journey.description2,
      period: "2025 - 2026",
      darkLogo: false,
    },
    {
      key: "cpe",
      image: cpeImage,
      alt: "CPE Lyon",
      subtitle: t.journey.subtitle3,
      description: t.journey.description3,
      period: "2023 - 2025",
      darkLogo: false,
    },
    {
      key: "chartreux",
      image: lesChartreuxImage,
      alt: "Les Chartreux",
      subtitle: t.journey.subtitle4,
      description: t.journey.description4,
      period: "2021 - 2023",
      darkLogo: true,
    },
  ];

  const contactRows: { key: string; icon: ReactNode; value: string; href: string; external?: boolean }[] = [
    { key: "mail", icon: <Mail size={22} />, value: "Nafru.development@gmail.com", href: "mailto:Nafru.development@gmail.com" },
    { key: "phone", icon: <Phone size={22} />, value: "+33 7 69 05 84 92", href: "tel:+33769058492" },
    { key: "linkedin", icon: <FaLinkedin size={22} />, value: "Nathan Frume", href: "https://www.linkedin.com/in/nathan-frume/", external: true },
    { key: "github", icon: <FaGithub size={22} />, value: "GitHub · Nafru3", href: "https://github.com/Nafru3", external: true },
  ];

  return (
    <>
      <header className="AppHeader">
        <div className="LogoAndNameDiv" onClick={() => scrollToSection("welcome")}>
          <MyLogo width={44} height={44} fill={Colors.Primary} className="HeaderLogo" />
          <ThemedText text="Nathan Frume" color={Colors.Foreground} type="title" />

        </div>

        <nav className={menuOpen ? "open" : ""}>
          {navItems.map((item) => (
            <ThemedText
              key={item.id}
              text={item.label}
              color={Colors.Foreground}
              type="sub_title"
              className={`NavText ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            />
          ))}
          <Button
            text={t.navbar.contact}
            backgroundColor={Colors.Primary}
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


          <div className="WelcomeTextDiv">
            <div>
              <Reveal delay={90}>
                <ThemedText
                  text={t.welcome.title1}
                  className="WelcomeText"
                  color={Colors.Foreground}
                  type="big_title"
                />
              </Reveal>
              <Reveal delay={190}>
                <ThemedText
                  text={t.welcome.title2}
                  className="WelcomeText"
                  color={Colors.Foreground}
                  type="big_title"
                />
              </Reveal>
            </div>

            <Reveal delay={330}>
              <ThemedText text={t.welcome.role} color={Colors.Foreground} type="sub_title" />
            </Reveal>

            <Reveal delay={430}>
              <ThemedText
                text={t.welcome.description}
                className="WelcomeDescription"
                color={Colors.Foreground}
                type="body"
              />
            </Reveal>
          </div>

          <Reveal delay={540}>
            <div className="WelcomeButtonsDiv">
              <Button
                text={t.welcome.buttonContact}
                backgroundColor={Colors.Primary}
                className="BigButton"
                onClick={() => scrollToSection("contact")}
              />
              <Button
                text={t.welcome.buttonWork}
                backgroundColor={Colors.Foreground}
                onClick={() => scrollToSection("work")}
              />
            </div>
          </Reveal>

          <Reveal delay={640}>
            <div className="WelcomeSocialDiv">
              <a className="WelcomeSocialButton" href="https://github.com/Nafru3" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a className="WelcomeSocialButton" href="https://www.linkedin.com/in/nathan-frume/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="WelcomeRightDiv">
          <Reveal direction="right" delay={250}>
            <img
              src={myPicture}
              alt="Portrait de Nathan Frume"
              className="WelcomePicture"
            />
          </Reveal>
        </div>

        <ChevronDown
          height={44}
          width={44}
          className="DownArrow"
          onClick={() => scrollToSection("about")}
        />
      </section>

      <section className="AboutMeSection" id="about">
        <WaveBackground variant="light" hasIntro={true} direction='right' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="SectionHeader">
          <Reveal>
            <ThemedText text={t.about.title} className="BigTitleForMobile" color={Colors.Background} type="big_title" />
          </Reveal>
        </div>
        <div className="AboutMeTextDiv">
          <Reveal delay={140}>
            <ThemedText text={t.about.text1} color={Colors.Background} type="body" />
          </Reveal>
          <Reveal delay={220}>
            <ThemedText text={t.about.text2} color={Colors.Background} type="body" />
          </Reveal>
          <Reveal delay={300}>
            <ThemedText text={t.about.text3} color={Colors.Background} type="body" />
          </Reveal>
          <Reveal delay={380}>
            <ThemedText text={t.about.text4} color={Colors.Background} type="body" />
          </Reveal>
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
        <div className="SectionHeader">
          <Reveal>
            <ThemedText text={t.whatido.title} className="BigTitleForMobile" color={Colors.Foreground} type="big_title" />
          </Reveal>
        </div>
        <div className="WhatIDoContainerDiv">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 110} className="GridCardReveal">
              <div className="WhatIDoCardDiv">
                <ThemedText text={service.title} color={Colors.Background} type="title" />
                <ThemedText text={service.description} color={Colors.Background} type="body" />
                <div className="WhatIDoSkillsDiv">
                  {service.pills.map((pill) => (
                    <ThemedText key={pill} text={pill} color={Colors.Foreground} type="caption" className="SkillPill" />
                  ))}
                </div>
                <div className="WhatIDoIconDiv">
                  {service.icon}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="MyWorkSection" id="work">
        <WaveBackground variant="light" hasIntro={true} direction='right' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="SectionHeader">
          <Reveal>
            <ThemedText text={t.work.title} className="BigTitleForMobile" color={Colors.Background} type="big_title" />
          </Reveal>
        </div>
        <div className="MyWorkContainerDiv">
          {projects.map((project, index) => (
            <Reveal key={project.key} delay={index * 130} className="GridCardReveal">
              <div className="MyWorkCardDiv" onClick={project.onClick}>
                <div className="MyWorkCardImageDiv" style={{ background: project.gradient }}>
                  <img src={project.image} alt={project.alt} className="MyWorkCardImage" />
                </div>
                <div className="MyWorkCardInfoDiv">
                  <div className="MyWorkCardTitleRow">
                    <ThemedText text={project.title} color={Colors.Background} type="title" />
                    <ChevronRight height={22} width={22} color={Colors.Background} className="MyWorkCardArrow" />
                  </div>
                  <ThemedText text={project.description} color={Colors.Background} type="body" />
                  <div className="MyWorkCardMetaDiv">
                    <div className="MyWorkPillsDiv">
                      {project.pills.map((pill) => (
                        <ThemedText key={pill} text={pill} color={Colors.Foreground} type="caption" className="SkillPill InfoPill" />
                      ))}
                    </div>
                    <ThemedText text={project.availability} color={Colors.Background} type="caption" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={260} className="GridCardReveal">
            <div className="MyWorkCardDiv" onClick={() => { window.open("https://github.com/Nafru3", "_blank"); }}>
              <div className="MyWorkCardImageDiv" style={{ background: "radial-gradient(circle, #0B3A73, #031D44)" }}>
                <FaGithub size={110} color={Colors.Foreground} className="MyWorkGithubIcon" />
              </div>
              <div className="MyWorkCardInfoDiv">
                <div className="MyWorkCardTitleRow">
                  <ThemedText text={t.work.github.title} color={Colors.Background} type="title" />
                  <ChevronRight height={22} width={22} color={Colors.Background} className="MyWorkCardArrow" />
                </div>
                <ThemedText text={t.work.github.description} color={Colors.Background} type="body" />
                <div className="MyWorkCardMetaDiv">
                  <ThemedText text={t.work.github.repository} color={Colors.Background} type="caption" className="MyWorkCtaLink" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="MySkillsSection" id="skills">
        <WaveBackground variant="dark" hasIntro={true} direction='bottom' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="SectionHeader">
          <Reveal>
            <ThemedText text={t.skills.title} className="BigTitleForMobile" color={Colors.Foreground} type="big_title" />
          </Reveal>
        </div>
        <div className="MySkillsContainerDiv">
          {skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 70}>
              <div className="OneSkillDiv">
                <div>
                  {skill.icon}
                </div>
                <ThemedText text={skill.name} color={Colors.Foreground} type="sub_title" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="MyJourneySection" id="journey">
        <WaveBackground variant="light" hasIntro={true} direction='left' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="SectionHeader">
          <Reveal>
            <ThemedText text={t.journey.title} className="BigTitleForMobile" color={Colors.Background} type="big_title" />
          </Reveal>
        </div>
        <div className="JourneyTimeline">
          {journeyItems.map((item, index) => (
            <Reveal key={item.key} delay={index * 110} direction={index % 2 === 0 ? "left" : "right"}>
              <article className="JourneyItem">
                <div className="JourneyCard">
                  <div className="JourneyCardTop">
                    <div className={`JourneyLogoBox${item.darkLogo ? " JourneyLogoBox--dark" : ""}`}>
                      <img src={item.image} alt={item.alt} />
                    </div>
                    <span className="JourneyYear">{item.period}</span>
                  </div>
                  <ThemedText text={item.subtitle} color={Colors.Foreground} type="sub_title" />
                  <ThemedText text={item.description} color={Colors.Foreground} type="body" />
                </div>
                <span className="JourneyDot" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ContactMeSection" id="contact">
        <WaveBackground variant="dark" hasIntro={true} direction='top' />
        <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div>
        <div className="SectionHeader">
          <Reveal>
            <ThemedText text={t.contact.title} className="BigTitleForMobile" color={Colors.Foreground} type="big_title" />
          </Reveal>
        </div>
        <div className="ContactMeContainerDiv">
          <div className="ContactMeTextDiv">
            <Reveal delay={120}>
              <ThemedText text={t.contact.description1} color={Colors.Foreground} type="body" />
            </Reveal>
            <Reveal delay={200}>
              <ThemedText text={t.contact.description2} color={Colors.Foreground} type="body" />
            </Reveal>
            <Reveal delay={300}>
              <Button text={t.contact.button} backgroundColor={Colors.Primary} className="BigButton" onClick={() => { window.location.href = `mailto:Nafru.development@gmail.com`; }} />
            </Reveal>
          </div>
          <div className="ContactMeInfoDiv">
            {contactRows.map((row, index) => (
              <Reveal key={row.key} delay={120 + index * 90} direction="left">
                <a
                  className="ContactRow"
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noreferrer" : undefined}
                >
                  <span className="ContactIconChip">{row.icon}</span>
                  <ThemedText text={row.value} color={Colors.Foreground} type="body" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="AppFooter">
        <WaveBackground variant="light" hasIntro={true} direction='right' />
        {/* <div className="TrianglesDiv">
          <Triangle fill={Colors.Primary} className="AboutTriangle" />
          <Triangle fill={Colors.Primary} className="AboutTriangle AboutTriangleRotated" />
        </div> */}
        <div className="FooterTopDiv">
          <div className="FooterLeftDiv">
            <ThemedText text={t.footer.subtitle1} color={Colors.Background} type="sub_title" />
            <ThemedText className="FooterNavLink" text={t.about.title} color={Colors.Background} type="body" onClick={() => scrollToSection("about")} />
            <ThemedText className="FooterNavLink" text={t.whatido.title} color={Colors.Background} type="body" onClick={() => scrollToSection("whatido")} />
            <ThemedText className="FooterNavLink" text={t.work.title} color={Colors.Background} type="body" onClick={() => scrollToSection("work")} />
            <ThemedText className="FooterNavLink" text={t.skills.title} color={Colors.Background} type="body" onClick={() => scrollToSection("skills")} />
            <ThemedText className="FooterNavLink" text={t.journey.title} color={Colors.Background} type="body" onClick={() => scrollToSection("journey")} />
            <ThemedText className="FooterNavLink" text={t.contact.title} color={Colors.Background} type="body" onClick={() => scrollToSection("contact")} />
          </div>
          <div className="FooterMiddleDiv">
            <ThemedText text={t.footer.subtitle2} color={Colors.Background} type="sub_title" />
            <a href="mailto:Nafru.development@gmail.com" className="FooterInfoLink">
              <Mail width={22} height={22} color={Colors.Background} />
              <ThemedText text="Nafru.development@gmail.com" color={Colors.Background} type="body" />
            </a>
            <a href="tel:+33769058492" className="FooterInfoLink">
              <Phone width={22} height={22} color={Colors.Background} />
              <ThemedText text="+33 7 69 05 84 92" color={Colors.Background} type="body" />
            </a>
          </div>

          <div className="FooterRightDiv">
            <ThemedText text={t.footer.subtitle3} color={Colors.Background} type="sub_title" />
            <div className="FooterSocialDiv">
              <a className="FooterSocialButton" href="https://github.com/Nafru3" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a className="FooterSocialButton" href="https://www.linkedin.com/in/nathan-frume/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <button
                className="FooterSocialButton BackToTopButton"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Retour en haut de page"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="FooterBottomDiv">
          <ThemedText text={t.footer.copyright} color={Colors.Background} type="caption" />
          <ThemedText text={t.footer.builtWith} color={Colors.Background} type="caption" />
        </div>
        <IconName className="FooterBigText" />
      </footer>

    </>
  )
}

export default App
