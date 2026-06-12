import React from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/about/HeroSection';
import CompanyOverview from '../components/about/CompanyOverview';
import JourneyTimeline from '../components/about/JourneyTimeline';
import MissionVisionValues from '../components/about/MissionVisionValues';
import LeadershipTeam from '../components/about/LeadershipTeam';
import TeamStrength from '../components/about/TeamStrength';
import CertificationsHSE from '../components/about/CertificationsHSE';
import WhyChooseUs from '../components/about/WhyChooseUs';
import ClientCarousel from '../components/about/ClientCarousel';
import DownloadCenterCTA from '../components/about/DownloadCenterCTA';

const About = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="About Us" 
                description="Learn about AMRA Geogreen Works Pvt Ltd, our mission, vision, and core values. We are pioneering sustainable infrastructure since 2010."
                url="https://www.amrageogreenworks.com/about"
            />
            <HeroSection />
            <CompanyOverview />
            <JourneyTimeline />
            <MissionVisionValues />
            <LeadershipTeam />
            <TeamStrength />
            <CertificationsHSE />
            <WhyChooseUs />
            <ClientCarousel />
            <DownloadCenterCTA />
        </div>
    );
};

export default About;
