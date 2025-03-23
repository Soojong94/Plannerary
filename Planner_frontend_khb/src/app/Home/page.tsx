import React from "react";

import TabBar from "@/components/util_component/tab_bar";
import Bucketlist from "@/components/bucketlist_component/bucket_home";

const Home = () => {
  return (
    <div className="h-screen flex flex-col w-[764px] m-auto">
      <div className="flex-1">
        <Bucketlist />
      </div>
      <div>
        <TabBar />
      </div>
    </div>
  );
};

export default Home;
