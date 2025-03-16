import React from "react";
import Bucketlist from "@/components/bucketlist_component/bucket_home";

export default function SurveyPage() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-row">
        <Bucketlist />
      </div>
    </div>
  );
}
