"use client";
import React from "react";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <p>&copy; {currentYear}</p>
);

export default Footer; 