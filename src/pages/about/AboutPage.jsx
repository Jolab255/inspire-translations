import React from 'react';
import Box from '@mui/material/Box';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

import AboutHero from './sections/AboutHero';
import AboutStory from './sections/AboutStory';
import AboutMission from './sections/AboutMission';
import AboutValues from './sections/AboutValues';
import AboutTeam from './sections/AboutTeam';
import CTASection from '../../components/common/CTASection';

const AboutPage = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            heroTitle: <>We Are <br /><Box component="span" sx={{ color: '#FFFFFF' }}>Inspire Translations</Box></>,
            heroDesc: "Bridging language barriers with precision, cultural insight, and unwavering professionalism across East Africa and the world.",
            moreBtn: "More About Us",
            ourStory: "Our Story",
            storyTitle: "Born from a Passion for Language",
            storyP1: "Inspire Translations was founded with a simple but powerful belief: that effective communication across languages and cultures is a fundamental right for every individual and organization.",
            storyP2: "Starting as a small team of passionate linguists in Dar es Salaam, we have grown into one of Tanzania's most trusted language services companies, serving international organizations, government agencies, multinational corporations, and SMEs alike.",
            storyP3: "Today, our network of certified translators, interpreters, and language instructors covers 25+ language pairs, with a proven track record of excellence and client satisfaction.",
            missionTitle: "Mission and Vision",
            mission: "Our Mission",
            missionDesc: "To deliver exceptional language services that empower clients to communicate effectively and respectfully across all cultures.",
            vision: "Our Vision",
            visionDesc: "To be East Africa's foremost language services provider, fostering global connections through precision and cultural intelligence.",
            valuesTitle: "What Drives Us",
            meetExperts: "Meet the Experts",
            seeMoreTeam: "See more of our team"
        },
        sw: {
            heroTitle: <>Sisi Ni <br /><Box component="span" sx={{ color: '#FFFFFF' }}>Inspire Translations</Box></>,
            heroDesc: "Kuondoa vizuizi vya lugha kwa usahihi, uelewa wa kitamaduni, na weledi usioyumba kote Afrika Mashariki na duniani.",
            moreBtn: "Zaidi Kuhusu Sisi",
            ourStory: "Habari Yetu",
            storyTitle: "Tulizaliwa kutokana na Mapenzi ya Lugha",
            storyP1: "Inspire Translations ilianzishwa kwa imani rahisi lakini yenye nguvu: kwamba mawasiliano ya ufanisi katika lugha na tamaduni mbalimbali ni haki ya msingi kwa kila mtu na shirika.",
            storyP2: "Tukianza kama timu ndogo ya wanaisimu wenye shauku jijini Dar es Salaam, tumekua na kuwa miongoni mwa makampuni ya huduma za lugha yanayoaminika zaidi Tanzania, tukihudumia mashirika ya kimataifa, taasisi za serikali, makampuni ya kimataifa, na biashara ndogo na za kati.",
            storyP3: "Leo, mtandao webu wa watafsiri walioidhinishwa, wakalimani, na walimu wa lugha unajumuisha zaidi ya jozi 25 za lugha, tukiwa na rekodi iliyothibitishwa ya ubora na kuridhika kwa wateja.",
            missionTitle: "Dhamira na Maono",
            mission: "Dhamira Yetu",
            missionDesc: "Kutoa huduma za lugha za kipekee zinazowawezesha wateja kuwasiliana kwa ufanisi na kwa heshima katika tamaduni zote.",
            vision: "Maono Yetu",
            visionDesc: "Kuwa mtoa huduma bora wa lugha Afrika Mashariki, tukikuza miunganisho ya kimataifa kupitia usahihi na akili ya kitamaduni.",
            valuesTitle: "Kinachotuongoza",
            meetExperts: "Kutana na Wataalamu",
            seeMoreTeam: "Angalia timu yetu zaidi"
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={language === 'en' ? "About Inspire Translations | Our Story, Mission & Team" : "Kuhusu Inspire Translations | Habari Yetu, Dhamira na Timu"}
                description={c.heroDesc}
            />

            <AboutHero c={c} />
            <AboutStory c={c} language={language} />
            <AboutMission c={c} language={language} />
            <AboutValues c={c} language={language} ui={ui} t={t} />
            <AboutTeam c={c} language={language} t={t} />
            <CTASection />
        </>
    );
};

export default AboutPage;
