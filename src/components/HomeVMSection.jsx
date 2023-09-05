import React from "react";
import { styled } from "styled-components";

const VMHomeContainer = styled.section`
  background-color: ${(props) => props.theme.color.c5};
  padding: 30px 10px;
`;

const H2 = styled.h2`
  padding: 10px;
`;

const H3 = styled.h3`
  text-align: center;
  padding: 10px;
`;

const H4 = styled.h4`
  color: ${(props) => props.theme.color.c6};
`;

const VMcontentContainer = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const VMcontent = styled.div`
  max-width: 400px;
  padding: 10px;
`;

const VMP = styled.p`
  color: ${(props) => props.theme.color.c4};
`;

const VMdivs = styled.div`
  display: flex;
  justify-content: space-between;
`;

function HomeVM() {
  return (
    <VMHomeContainer>
      <VMcontentContainer>
        <H2>List Your Property on Holidaze</H2>
        <VMdivs>
          <VMcontent>
            <H4>Share Your Unique Space with Travelers</H4>
            <VMP>
              Welcome to Holidaze, the ultimate platform for connecting
              travelers with exceptional spaces. Have an extra room, a cozy
              cabin, a charming cottage, or a stunning villa that you'd love to
              share with the world? Join our vibrant community of hosts and open
              your doors to a global audience of explorers seeking memorable
              accommodations.
            </VMP>
            <VMP>
              Listing your property on Holidaze opens the door to a world of
              possibilities. Become a part of our global network of hosts and
              travelers, and embark on a journey that enriches both your life
              and the lives of those who choose to experience your space. Start
              sharing your slice of paradise with the world and make every stay
              a memorable Holidaze experience. Ready to get started? List your
              property today and let the adventure begin!
            </VMP>
          </VMcontent>
          <VMcontent>
            <H4>Why List on Holidaze?</H4>
            <VMP>
              🌍 <b>Reach a Worldwide Audience:</b> When you list your property
              on Holidaze, you're instantly gaining access to a diverse
              community of travelers from all corners of the globe. Your unique
              space will be showcased to those who appreciate the allure of
              distinctive stays.
            </VMP>
            <VMP>
              💼 <b>Earn Extra Income:</b> Turn your spare space into a source
              of income. Whether you have a spare room, an entire property, or a
              quirky hideaway, hosting on Holidaze offers you the opportunity to
              generate extra revenue to fund your own adventures or endeavors.
            </VMP>
            <VMP>
              🏡 <b>Share Your Passion:</b> Every space has a story, and hosting
              on Holidaze lets you tell yours. Whether your property boasts a
              rich history, stunning architecture, or simply exudes charm,
              sharing it with others allows you to spread your passion and
              create lasting memories for your guests.
            </VMP>
            <VMP>
              🌟 <b>Be Your Own Boss:</b> As a host on Holidaze, you're in
              control. Set your own availability, house rules, and pricing.
              Tailor the experience you offer to match your style and
              preferences.
            </VMP>
          </VMcontent>
          <VMcontent>
            <H4>Getting Started is Simple:</H4>
            <VMP>
              <b>1. Create Your Listing:</b> Describe your space in detail.
              Highlight its unique features, amenities, and any special touches
              that make it stand out. Use high- quality photos to showcase the
              beauty of your property.
            </VMP>
            <VMP>
              <b>2. Set Your Price:</b> Determine the rate that suits your space
              and its offerings. Consider factors like location, size,
              amenities, and seasonal demand when setting your price.
            </VMP>
            <VMP>
              <b>3. House Rules:</b> Establish guidelines that make both you and
              your guests comfortable. From check-in and check-out times to pet
              policies, setting clear expectations ensures a smooth and
              enjoyable experience for all.
            </VMP>
            <VMP>
              <b>4. Connect with Guests:</b> Communicate with potential guests.
              Address any questions they may have and provide helpful
              information to assist them in planning their stay.
            </VMP>
          </VMcontent>
        </VMdivs>
        <H3>Join the Holidaze Hosting Community Today!</H3>
      </VMcontentContainer>
    </VMHomeContainer>
  );
}

export default HomeVM;
