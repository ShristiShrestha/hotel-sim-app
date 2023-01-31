import React from "react";
import MainMenu from "../components/MainNav";
import PageLayout from "../components/PageLayout";

export default function Home() {
    return (
        <PageLayout _header_menu={<MainMenu />} _content={<div>Hello</div>} />
    );
}
