import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";
import Carousel from "react-multi-carousel";

function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  //generate fake data
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);

  return (
    //overflow-x-scroll
    <div className="flex space-x-4 p-6 bg-white mt-8 border-gray-200 border rounded-md overflow-x-scroll">
        {session && (
          <Story img={session.user.image} username={session.user.username} />
        )}

        {suggestions.map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
          />
        ))}
    </div>
  );
}

export default Stories;
