import * as React from 'react';
type EventHandler = React.EventHandler<React.SyntheticEvent>;
export default function useAccordionButton(eventKey: string, onClick?: EventHandler): EventHandler;
export {};
