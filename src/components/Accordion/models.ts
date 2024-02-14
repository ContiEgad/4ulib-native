export interface IToggleButtonProps {
  value: boolean;
  onPress?: () => void;
}

export interface IAccordionPanelProps {
  children: React.ReactNode;
  open: boolean;
}

export interface IAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
