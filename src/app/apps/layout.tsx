import React from "react";
import AppLayoutClient from "./appLayout";

const APPlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppLayoutClient>{children}</AppLayoutClient>
    </>
  );
};

export default APPlayout;
