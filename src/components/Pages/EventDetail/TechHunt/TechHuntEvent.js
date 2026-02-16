import React from 'react';
import EventDetail from '../EventDetail';
import techHunt from '../../../../assets/img/PIXELATED EVENT MASCOTS/TECH HUNT.png';
import techHuntBanner from '../../../../assets/img/event_specific_pictures/techHunt/techhunt_banner.png';

const TechHuntEvent = () => {
    const eventData = {
                previousYearImages: [
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02954.jpeg',
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02955.jpeg',
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02969.jpeg',
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02970.jpeg',
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02971.jpeg',
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02972.jpeg',
                    process.env.PUBLIC_URL + '/pictures_of_gallery/Tech- Hunt/DSC02974.jpeg',
                ],
        name: 'Tech Hunt',
        logo: techHunt,
        category: 'Brain Teaser',
        breadcrumbBg: techHuntBanner,
        description: 'Tech Hunt is an exciting treasure hunt meets tech quiz event. Navigate through campus following cryptic clues, solve technical riddles, and crack codes to reach the final destination. This event combines physical activity with mental challenges, testing both your technical knowledge and problem-solving abilities in a fun, engaging format.',
        teamSize: '3-4 Members',
        duration: '3 Hours',
        venue: 'Campus-wide',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            'Teams must have 3-4 members',
            'All team members must stay together',
            'Use of mobile phones only for official app',
            'Damaging property will lead to disqualification',
            'Time penalties for wrong submissions',
            'Follow campus rules and regulations',
            'First team to complete all checkpoints wins',
            'Respect other teams and participants'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹15,000' },
            { position: '2nd Prize', amount: '₹10,000' },
            { position: '3rd Prize', amount: '₹6,000' }
        ],
        contact: [
            {
                name: 'Hunt Master',
                phone: '+91 98765 43218',
                email: 'techhunt@techstorm.com'
            },
            {
                name: 'Support Team',
                phone: '+91 98765 43219',
                email: 'hunt@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default TechHuntEvent;
