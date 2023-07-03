import React from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

const TweetItem = ({ name, username, time, text, imageSrc, profileImg }) => {
  return (
    <div className="flex space-x-3 p-3 border-gray-300 border-b">
      <img className="w-11 h-11 rounded-full object-cover" src={profileImg} />
      <div>
        <div className="text-gray-500 flex items-center space-x-2 mb-1">
          <h1 className="text-gray-700 font-bold">{name}</h1>
          <span>@{username}</span>
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <h2>{time}</h2>
        </div>
        <span>{text}</span>
        <img
          className="mt-3 rounded-2xl max-h-80 object-cover"
          src={imageSrc}
        />
      </div>
    </div>
  );
};

const ExploreSection = () => {
  return (
    <div
      className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
    border-gray-300 border-x
    ">
      <div
        className="px-3 py-2 text-lg sm:text-xl font-bold
        border-b border-gray-300 sticky top-0 z-50 bg-blur
        ">
        Explore
      </div>
      <section id="wimbledon">
        <TweetItem
          profileImg="/assets/tenis.jpeg"
          name="Wimbledon"
          username="Wimbledon"
          time="21h"
          text="Over the generations, we've witnessed iconic rivalries, triumphant feats and heroic defeats.

        But while the names may change, the drama remains.
        
        New storylines await us, and #Wimbledon will once again be Always Like Never Before ✨"
          imageSrc="/assets/wim.jpg"
        />
      </section>
      <section id="apple">
        <TweetItem
          profileImg="/assets/applelogo.jpeg"
          name="Apple"
          username="Apple"
          time="15h"
          text="Apple Glasses could redefine wearable computing. Here's everything we know so far"
          imageSrc="/assets/apple.jpg"
        />
      </section>

      <section id="spiderman">
        <TweetItem
          profileImg="/assets/spiderman.jpg"
          name="Spider-Man: Across The Spider-Verse"
          username="SpiderVerse"
          time="19h"
          text="Spider-Man: Across the Spider-Verse has crossed another box office milestone. In its fifth week in theaters, the Sony Pictures Animation..."
          imageSrc="/assets/spiderman.jpg"
        />
      </section>

      <section id="elon">
        <TweetItem
          profileImg="/assets/elon.png"
          name="Elon Musk"
          username="elonmusk"
          time="2h"
          text="Tesla delivers record number of cars after price cuts"
          imageSrc="/assets/tessy.jpg"
        />
      </section>

      <section id="tswift">
        <TweetItem
          id="tswift"
          profileImg="/assets/tswift.jpg"
          name="Taylor Swift"
          username="taylorswift13"
          time="8h"
          text="Talor Swift broke Australia’s record with 800k users waiting in presale 🇦🇺"
          imageSrc="/assets/tswift.jpg"
        />
      </section>
    </div>
  );
};

export default ExploreSection;
