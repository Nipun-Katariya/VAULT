import React, { useState } from "react";
import "./Dashboard.css";
import VerticalBar from "./VerticalBar";
import ViewTransaction from "./ViewTransaction";
import SendCrypto from "./SendCrypto";
// import ReceiveCrypto from './ReceiveCrypto';
import { FIL } from "../../assets/Images";
import {vault} from "../../assets/Images"
// import { Navigate } from 'react-router-dom';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// import Navbar from '../Navbar/nav-index';

const Asset = () => {
  
  return (
    <div className="dashboard">
      <VerticalBar
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
      <div className="vault-logo-dash">
        <img src={vault} />
      </div>
      <div className="fil-logo-dash">
        <img src={FIL} />
      </div>

      <div className="imageView">
      <main className="ml-16 px-8">
          <div className="border-b-2 text-sm flex gap-4 justify-center border-gray-300">
            <div className=" border-blue-500 p-4 relative flex flex-col items-center gap-2">
              <a href="#">
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                alt="eth"
                className="h-8 w-8"
              />Ethereum
              </a>
              <div className="h-0.5 bg-blue-500 w-full absolute -bottom-[1px]"></div>
            </div>

            <div className=" border-blue-500 p-4 flex flex-col items-center gap-2">
              <a href="#">
              <img
                src="https://seeklogo.com/images/R/ripple-xrp-logo-E97D62205B-seeklogo.com.png"
                alt="ripple"
                className="h-8 w-8"
              />Ripple
              </a>
             
            </div>
            <div className=" border-blue-500 p-4 flex flex-col items-center gap-2">
              <a href="#">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-zKsVKrLYyTYtD4Sa6di4AQcticu-O5FnFVSiSm3_Q&s"
                alt="bitcoin"
                className="h-8 w-8"
              />Bitcoin
              </a>
            
            </div>

            <div className=" border-blue-500 p-4 flex flex-col items-center gap-2">
              <a href="#"><img
                src="https://seeklogo.com/images/N/nft-logo-6202DDD5FF-seeklogo.com.png"
                alt=""
                className="h-8 w-8"
              />NFT
              </a>
            </div>

            <div className=" border-blue-500 p-4 flex flex-col items-center gap-2 justify-center">
              <a href="#">
              <img
                src="https://www.citypng.com/public/uploads/preview/download-gold-token-medal-seal-illustration-png-11639415418bl6dsuicrt.png?v=2023051122"
                alt=""
                className="h-8 w-8"
              />Token
              </a>
            {/* <button onClick={""}>Token</button> */}
            </div>
           

          </div>
        </main>
      </div>

      <div className="center-view">
        {/* <div className='wallets'>
      <button type="button" className='crypto-button1' onClick={()=>{setSelectedOption('send')}}>Send Crypto1</button>
      <button type="button" className='crypto-button2' onClick={()=>{setSelectedOption('send')}}>Send Crypto2</button>
      <button type="button" className='crypto-button3' onClick={()=>{setSelectedOption('send')}}>Send Crypto3</button>
      </div> */}

        

        {/* <Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/about' activeStyle>
			About
		</NavLink>
		<NavLink to='/events' activeStyle>
			Events
		</NavLink>
		<NavLink to='/annual' activeStyle>
			Annual Report
		</NavLink>
		<NavLink to='/team' activeStyle>
			Teams
		</NavLink>
		<NavLink to='/blogs' activeStyle>
			Blogs
		</NavLink>
		<NavLink to='/sign-up' activeStyle>
			Sign Up
		</NavLink>
		{/* Second Nav */}
        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> 
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav> */}

        {/* <Tabs position="relative" variant="unstyled">
    <TabList>
      <Tab>One</Tab>
      <Tab>Two</Tab>
      <Tab>Three</Tab>
    </TabList>
    <TabIndicator
      mt="-1.5px"
      height="2px"
      bg="blue.500"
      borderRadius="1px"
    />
    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
 */}

        <h2>User Public ID: {publicId}</h2>
        <h3>Account Balance: {accountBalance}</h3>

        <button
          type="button"
          className="crypto-button"
          onClick={() => {
            setSelectedOption("send");
          }}
        >
          Send Crypto
        </button>
        <div className="trans">
        <ViewTransaction />
        </div>
        {renderView()}
      </div>
    </div>
  );
};

export default Asset;