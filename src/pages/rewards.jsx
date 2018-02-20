import React, { Component } from 'react';
import PaymentButton from '../components/PaymentButton'
import RewardIcons from '../components/RewardIcons'
import styled, { injectGlobal } from 'styled-components'
import Borg from '../components/resources/Borg.ttf'
import Elixia from '../components/resources/ELIXIA.ttf'
import EuroStyle from '../components/resources/EUROS3.ttf'
import Helmet from 'react-helmet'

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
min-height: calc(100vh - 200px);
position: relative;
padding-bottom: 100px;
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
const RewardsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 50px;
    justify-content: center;

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
        max-width: 200px;
        min-width: 100px;
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
const ButtonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 50px;
    & > div{
        padding-left: 10px;
        padding-right: 10px;
        flex: 1 0px;
    }
`;
const CallPaypal = (e,data) => {
    console.log(e,data)
}
const Rewards = ({ data, transition }) => (
    <Wrapper style={transition && transition.style}>
        <Helmet
          title="Rusty-Rewards"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <FlexWrapper>
            {data.rank.edges.sort((a,b)=>{
                return a.node.frontmatter.amount-b.node.frontmatter.amount
            }).map((edge)=>{
                let Rank = edge.node.frontmatter
                return(
                    <FlexItem key={Rank.title.toString()}>
                        <DonationWrapper>
                            <header>{Rank.title.toUpperCase()}</header>
                            <section>{Rank.description}</section>
                            <RewardsContainer  key={Rank.title.toString() + "_Rewards"}>
                                <header>REWARDS</header>
                                <br/>
                                {Rank.rankRewards.map((r) => {
                                    let Reward = data.rewards.edges.reduce((a,b)=>{
                                        return b.node.frontmatter.title.toLowerCase() === r.reward.toLowerCase() ? b.node.frontmatter : a
                                    },false)
                                    if ( Reward )
                                        return(
                                            <div key={Rank.title.toString() + "_" + Reward.title.toString()}>
                                                <RewardIcons name={Reward.icon}/>
                                                <span>{Reward.description.replace("^S",r.amount)}</span>
                                            </div>
                                        )
                                })}
                            </RewardsContainer>
                            <PaymentButton rank={Rank} subscribe={true} to={{pathname: "/Donate", state: {rank: Rank.title, subscribe: true}}}>Subcribe for {Rank.amount}$</PaymentButton>
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
                    <ButtonContainer>
                        {data.rank.edges.map((edge)=>{
                            let Rank = edge.node.frontmatter
                            return(

                                <PaymentButton rank={Rank} subscribe={false} to={{pathname: "/Donate", state: {rank: Rank.title, subscribe: true}}} key={"OneTimeDonation_"+Rank.title.toString()}>Donate Once for <br/>{Rank.amount}$</PaymentButton>
                            )
                        })}
                    </ButtonContainer>
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
export default Rewards