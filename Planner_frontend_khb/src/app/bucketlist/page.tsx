import React from "react";
import Sidebar from "@/components/sidebar_component/sidebar";
import Bucketlist from "@/components/bucketlist_component/bucket_home";

export default function SurveyPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Bucketlist />
    </div>
  );
}
