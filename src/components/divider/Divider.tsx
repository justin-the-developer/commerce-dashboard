import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    sectionName: string;
}

export const Divider = ({ sectionName, ...rest }: Props) => (
    <div className="divider-container" {...rest}>
        <h1 className="title">{sectionName}</h1>
        <div className="divider" />
    </div>
);
