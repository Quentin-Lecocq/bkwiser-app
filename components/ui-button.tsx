import { Button } from './ui/button';

type UIButtonProps = {
  label: string;
  onClick?: () => void;
};

export default function UIButton({ label, onClick }: UIButtonProps) {
  return (
    <Button
      variant="default"
      className="cursor-pointer"
      size="sm"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
