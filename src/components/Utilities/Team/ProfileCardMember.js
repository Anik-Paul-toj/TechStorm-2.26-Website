import React from 'react';
import ProfileCard from './ProfileCard';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const ProfileCardMember = ({ teamData }) => {
  return (
    <React.Fragment>
      {teamData?.map((data, index) => {
        const { id, avatar, name, deg } = data;
        const delay = (index % 4) * 100;
        
        // Create a simple handle from the name
        const handle = name.toLowerCase().replace(/\s+/g, '');
        
        return (
          <div className="col-lg-3 col-md-6 col-sm-6" key={id}>
            <AnimateOnScroll animation="fade-scale" delay={delay}>
              <ProfileCard
                avatarUrl={avatar}
                miniAvatarUrl={avatar}
                name={name}
                title={deg}
                handle={handle}
                status="Organizing Committee"
                contactText="Contact"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(255, 192, 16, 0.4)"
                behindGlowSize="70%"
                innerGradient="linear-gradient(145deg, rgba(255, 192, 16, 0.08) 0%, rgba(40, 15, 14, 0.2) 100%)"
                onContactClick={() => {
                  console.log(`Contact ${name}`);
                }}
              />
            </AnimateOnScroll>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default ProfileCardMember;
