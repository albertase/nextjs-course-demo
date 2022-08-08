// import React, { useEffect, useState } from 'react'
import { MongoClient } from "mongodb";
import { Fragment, useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
// import LoadingSpinner from "../components/UI/LoadingSpinner";



function HomePage(props) {
  // const [loading, setLoading] = useState(false)
  // const [loadedMeetups, setLoadedMeetups] = useState([])
  // useEffect(()=> {
  //   if(loading){
  //   setLoading(true)
  //   }else{
  //     setLoading(false)
  //   }
  // }, [loading])
  return (
    <Fragment>
      <Head>
        <title>People's Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active People's Meetups"
        />
      </Head>
       <MeetupList meetups={props.meetup} />
    </Fragment>
  );
}

// export const getServerSideProps = async context => {
//   // fetch API
//   return {
//     props: {
//       meetup: DUMMY_DATA
//     },
//   };
// };

export const getStaticProps = async (context) => {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:albert12345@cluster0.f97vrjv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
    
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetup: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
