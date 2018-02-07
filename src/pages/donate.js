import React, { Component } from 'react';
import TheButton from '../components/TheButton'
import RewardIcons from '../components/RewardIcons'
import styled, { injectGlobal } from 'styled-components'
import Borg from '../components/resources/Borg.ttf'
import Elixia from '../components/resources/ELIXIA.ttf'
import EuroStyle from '../components/resources/EUROS3.ttf'

injectGlobal`
  @font-face {
    font-family: 'Borg';
    src: url('${Borg}');
  }
  @font-face {
    font-family: 'EuroStyle';
    src: url('${EuroStyle}');
  }
  @font-face {
    font-family: 'ELIXIA';
    src: url('${Elixia}');
  }
`;
const Wrapper = styled.div`
    position: relative;
    min-height: calc(100vh - 100px);
`;
const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    @media (max-width: 767px) {
        padding: 5px;
    }
    justify-content: center;
    align-items: center;
    align-content: center;
`;
const FlexItem = styled.div`
    flex: 1;
    color: white;
    min-height: 50px;
    width: 85%;
    @media (max-width: 767px) {
        width: 100%;
    }
    text-align: center;
`;
const DonationWrapper = styled.div`
    min-height: 200px;
    justify-content: center;
    align-items: center;
    align-content: center;
    display: flex;
    flex-direction: column;
    padding-bottom: 200px;
    font-family: 'EuroStyle';
    font-size: 1.7em;
    & header{
        padding-bottom: 10px;
        font-family: 'ELIXIA';
        color: #9bafe6;
    }
    & > header{
        flex: 1;
        font-size: 2.5em;
        font-weight: bold;
    }
    & > section{
        flex: 1;
        width: 75%
    }
`;
const Rewards = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 50px;

    & header{
        width: 100%;
        flex: 1 100%;
        order: 1;
        font-size: 2em;
    }
    & > div{
        padding-left: 10px;
        padding-right: 10px;
        flex: 1 0px;
        order: 2;
        height: 175px;
        font-size: 0.7em;
        @media (max-width: 767px) {
            font-size: 0.6em;
            height: 150px;
        }
        color: white;
        fill: white;
        stroke: white;
        transition: all 0.5s;
        & div{
            height: 50px;
            @media (max-width: 767px) {
                height: 25px;
            }
        }
        & span{
            display: inline-block;
        }
        &:hover{
            color: #9bafe6;
            fill: #9bafe6;
            stroke: #9bafe6;
        }
    }
`;

const RewardData = {
    ExtraBuoyCores: {Description: "^S extra Buoy Cores/Points", Icon: "Radar"},
    RegnerativeSector: {Description: "Request ^S sector of your choice to be turned into a Regenerative Asteroid Field", Icon: "Mining"},
    WebInterface: {Description: "A Web Interface login giving more information and functionality", Icon: "Computer"},
    ExtraStart: {Description: "Extra startup resource/credits when you start", Icon: "Coins"},
    Colors: {Description: "Given ^S% of all the colors, randomly", Icon: "Aerosol"},
    DistCore: {Description: "Access to the Dist To Core UI", Icon: "BackForth"},
    Discord: {Description: "Get your own discord channel", Icon: "Discord"}
}

const RanksData = {
    Supporter: {Amount: 5, Description: "Our lowest rank, we appreciate every bit you can give.",
        Rewards: [{Name: "ExtraBuoyCores", Amount: 2}, {Name: "RegnerativeSector", Amount: 1}, {Name: "WebInterface", Amount: 1}, {Name: "ExtraStart", Amount: 1}, {Name: "Colors", Amount: 25}, {Name: "DistCore", Amount: 1}]},
    Contributer: {Amount: 10, Description: "With this rank you will truly be a contributor to the community, keeping the servers alive and running.",
        Rewards: [{Name: "ExtraBuoyCores", Amount: 4}, {Name: "RegnerativeSector", Amount: 2}, {Name: "WebInterface", Amount: 1}, {Name: "ExtraStart", Amount: 1}, {Name: "Colors", Amount: 50}, {Name: "DistCore", Amount: 1}]},
    VIP: {Amount: 25, Description: "Not that everybody else isn’t important, your support however is! With your contribution, you will allow the community to keep growing.",
        Rewards: [{Name: "ExtraBuoyCores", Amount: 6}, {Name: "RegnerativeSector", Amount: 3}, {Name: "WebInterface", Amount: 1}, {Name: "ExtraStart", Amount: 1}, {Name: "Colors", Amount: 75}, {Name: "DistCore", Amount: 1}, {Name: "Discord", Amount: 1}]},
    Investor: {Amount: 50, Description: "Contributing at this level allows us to maintain optimal performance and connection to the server(s). You will, of course, have access to all the other perks, heck, if you are supporting on this level you could even have your private TeamSpeak or small game server hosted by us!",
        Rewards: [{Name: "ExtraBuoyCores", Amount: 8}, {Name: "RegnerativeSector", Amount: 4}, {Name: "WebInterface", Amount: 1}, {Name: "ExtraStart", Amount: 1}, {Name: "Colors", Amount: 100}, {Name: "DistCore", Amount: 1}, {Name: "Discord", Amount: 1}]}
}

const Donate = ({ data, transition }) => (
    <Wrapper style={transition && transition.style}>
        {console.log(data)}
        <FlexWrapper>
            {Object.keys(RanksData).map((RankName)=>{
                let Rank = RanksData[RankName]
                return(
                    <FlexItem key={RankName.toString()}>
                        <DonationWrapper>
                            <header>{RankName}</header>
                            <section>{Rank.Description}</section>
                            <Rewards  key={RankName.toString() + "_Rewards"}>
                                <header>REWARDS</header>
                                <br/>
                                {Rank.Rewards.map((r) => {
                                    let Reward = RewardData[r.Name]
                                    return(
                                        <div key={RankName.toString() + "_" + r.Name.toString()}>
                                            <RewardIcons name={Reward.Icon}/>
                                            <span>{Reward.Description.replace("^S",r.Amount)}</span>
                                        </div>
                                    )
                                })}
                            </Rewards>
                            <TheButton>Subcribe for {Rank.Amount}$</TheButton>
                        </DonationWrapper>
                    </FlexItem>
                )
            })}
            <FlexItem>
                <DonationWrapper>
                    <header>One Time Donation</header>
                    <section>
                        Dont feel like subscribing? Dont worry we also offer one time donations of your choice.
                        You will receive all rewards for the rank at which you pay for. The rewards will be active for one month.
                    </section>
                    <Rewards>
                        {Object.keys(RanksData).map((RankName)=>{
                            let Rank = RanksData[RankName]
                            return(
                                <TheButton key={"OneTimeDonation_"+RankName.toString()}>Donate Once for <br/>{Rank.Amount}$</TheButton>
                            )
                        })}
                    </Rewards>
                </DonationWrapper>
            </FlexItem>
        </FlexWrapper>
    </Wrapper>
)

export const pageQuery = graphql`
  query DonateQuery {
      rewards: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/rewards/"}}) {
          edges {
            node {
              frontmatter{
               title
               description
               icon
             }
            }
          }
      },
      rank: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/rank/"}}) {
          edges {
            node {
              frontmatter{
               title
               description
               amount
               rankRewards{
                 amount
                 reward
               }
             }
            }
          }
      }
  }
`;
export default Donate